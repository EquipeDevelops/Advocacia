import { useState, useEffect } from 'react';
import styles from './NoticiaDestaque.module.css';
import { IoCloseCircle } from 'react-icons/io5';
import { FaBook, FaVideo } from 'react-icons/fa';
import video01 from '../../videos/video01.mp4';
import video02 from '../../videos/video02.mp4';

const NoticiaDestaque = ({ noticia }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Mapeamento de vídeos locais
  const videoMap = {
    'video01.mp4': video01,
    'video02.mp4': video02,
  };

  useEffect(() => {
    // Verifica se o usuário já viu o destaque
    const jaVisto = localStorage.getItem('noticia-destaque-livro-visto');
    if (!jaVisto) {
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Marca como visto no localStorage
    localStorage.setItem('noticia-destaque-livro-visto', 'true');
  };

  if (!isVisible || !noticia) return null;

  const videos = noticia.noticias.filter((item) => item.video);

  const imagens = noticia.noticias.filter((item) => item.img && !item.video);

  return (
    <div className={styles.destaqueOverlay}>
      <div className={styles.destaqueContainer}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          aria-label="Fechar destaque"
        >
          <IoCloseCircle />
        </button>

        <div className={styles.destaqueHeader}>
          <div className={styles.badge}>
            <FaBook /> Lançamento
          </div>
          <h2 className={styles.destaqueTitle}>{noticia.titulo}</h2>
          <p className={styles.destaqueData}>{noticia.data}</p>
        </div>

        <div className={styles.destaqueContent}>
          {/* Texto principal */}
          {noticia.noticias[0]?.texto && (
            <p className={styles.destaqueTexto}>{noticia.noticias[0].texto}</p>
          )}

          {/* Grid de vídeos locais */}
          {videos.length > 0 && (
            <div className={styles.videosSection}>
              <h3 className={styles.sectionTitle}>
                <FaVideo /> Conheça a obra
              </h3>
              <div className={styles.videosGrid}>
                {videos.map((videoItem) => {
                  const videoSrc = videoMap[videoItem.video];
                  return videoSrc ? (
                    <div key={videoItem.id} className={styles.videoWrapper}>
                      <video
                        src={videoSrc}
                        controls
                        className={styles.videoEmbed}
                        preload="metadata"
                      >
                        Seu navegador não suporta a tag de vídeo.
                      </video>
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          )}

          {/* Galeria de imagens */}
          {imagens.length > 0 && (
            <div className={styles.imagensSection}>
              <div className={styles.imagensGrid}>
                {imagens.map((imagem) => (
                  <div key={imagem.id} className={styles.imagemWrapper}>
                    <img
                      src={imagem.img}
                      alt={imagem.texto || 'Imagem do livro'}
                      className={styles.imagemDestaque}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className={styles.ctaButton} onClick={handleClose}>
            Entendi, obrigado!
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoticiaDestaque;
