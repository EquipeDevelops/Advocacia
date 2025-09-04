/* eslint-disable react/prop-types */
import { useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ images, selectedImageIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(selectedImageIndex || 0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowLeft') {
      prevImage();
    } else if (e.key === 'ArrowRight') {
      nextImage();
    }
  };

  return (
    <div
      className={styles.modal}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <div className={styles.imageContainer}>
          <img
            src={images[currentIndex]}
            alt={`Foto do escritório ${currentIndex + 1}`}
            className={styles.modalImage}
          />
        </div>

        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={prevImage}
            aria-label="Imagem anterior"
          >
            ‹
          </button>

          <div className={styles.dots}>
            {images.map((_, index) => (
              <button
                key={index}
                className={`${styles.dot} ${
                  index === currentIndex ? styles.active : ''
                }`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>

          <button
            className={styles.navButton}
            onClick={nextImage}
            aria-label="Próxima imagem"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
