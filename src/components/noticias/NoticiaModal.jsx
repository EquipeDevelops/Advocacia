/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import style from './NoticiaModal.module.css';

const NoticiaModal = ({ setActiveModal, noticia }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Adicionar suporte para teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveModal(false);
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'ArrowRight') {
        nextImage();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setActiveModal]);

  // Verificar se noticia existe e tem dados
  if (!noticia || !noticia.noticias) {
    return null;
  }

  // Preparar todas as imagens para o carrossel
  const todasImagens = [
    noticia.img, // Imagem principal
    ...noticia.noticias
      .map((subNoticia) => subNoticia.img)
      .filter((img) => img && img.trim() !== ''), // Imagens das subnotícias
  ].filter(Boolean); // Remove valores undefined/null

  const handleCloseModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveModal(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal(e);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % todasImagens.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + todasImagens.length) % todasImagens.length,
    );
  };

  const handleDotClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div
      className={style.modalOverlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className={style.modalContainer}>
        {/* Botão de fechar */}
        <button
          className={style.closeButton}
          onClick={handleCloseModal}
          type="button"
          aria-label="Fechar modal"
        >
          X
        </button>

        {/* Conteúdo da notícia */}
        <div className={style.modalContent}>
          {/* Título da notícia */}
          <div className={style.modalHeader}>
            <h1 id="modal-title" className={style.noticiaTitle}>
              {noticia.titulo}
            </h1>
            <div className={style.noticiaMeta}>
              <span className={style.publishDate}>
                <svg
                  className={style.calendarIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z" />
                </svg>
                {noticia.data}
              </span>
            </div>
          </div>

          {/* Carrossel de imagens */}
          {todasImagens.length > 0 && (
            <div className={style.carouselSection}>
              <div className={style.carouselContainer}>
                <button
                  className={style.carouselArrow}
                  onClick={prevImage}
                  type="button"
                  aria-label="Imagem anterior"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                </button>

                <div className={style.carouselImageContainer}>
                  <div
                    className={style.carouselImage}
                    style={{
                      backgroundImage: `url(${todasImagens[currentImageIndex]})`,
                    }}
                  />
                </div>

                <button
                  className={style.carouselArrow}
                  onClick={nextImage}
                  type="button"
                  aria-label="Próxima imagem"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
                  </svg>
                </button>
              </div>

              <div className={style.carouselDots}>
                {todasImagens.map((_, index) => (
                  <button
                    key={index}
                    className={`${style.carouselDot} ${
                      index === currentImageIndex ? style.active : ''
                    }`}
                    onClick={() => handleDotClick(index)}
                    type="button"
                    aria-label={`Ir para imagem ${index + 1}`}
                    aria-current={
                      index === currentImageIndex ? 'true' : 'false'
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Conteúdo das subnotícias com imagens */}
          {noticia.noticias.map(({ id, texto, img }) => {
            return (
              <div key={id} className={style.noticiaItem}>
                {img && img.trim() !== '' && (
                  <div
                    className={style.noticiaImage}
                    style={{ backgroundImage: `url(${img})` }}
                  />
                )}
                {texto && texto.trim() !== '' && (
                  <div className={style.textContent}>
                    <p>{texto}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NoticiaModal;
