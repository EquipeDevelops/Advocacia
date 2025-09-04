import { useEffect, useRef, useState } from 'react';
import imgEscrit01 from '../imgs/escritorio01.jpg';
import imgEscrit02 from '../imgs/escritorio02.jpg';
import imgEscrit03 from '../imgs/escritorio03.jpg';
import imgEscrit04 from '../imgs/escritorio04.jpg';
import imgEscrit05 from '../imgs/escritorio05.jpg';
import imgEscrit06 from '../imgs/escritorio06.jpeg';
import styles from './Galeria.module.css';
import Modal from './util/Modal';

const GaleriaSection = () => {
  const [inView, setInView] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const galeriaRef = useRef(null);

  const images = [
    imgEscrit01,
    imgEscrit02,
    imgEscrit03,
    imgEscrit04,
    imgEscrit05,
    imgEscrit06,
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    if (galeriaRef.current) {
      observer.observe(galeriaRef.current);
    }

    return () => {
      if (galeriaRef.current) {
        observer.unobserve(galeriaRef.current);
      }
    };
  }, []);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <section id="galeria" ref={galeriaRef} className={styles.galeria}>
      <h2>Fotos do Escritório</h2>
      <ul
        className={`${styles.galeriaConteiner} ${
          inView ? styles.aparecer : styles.sair
        }`}
      >
        {images.map((image, index) => (
          <li
            key={index}
            className={styles.galeriaCard}
            onClick={() => openModal(index)}
          >
            <img src={image} alt={`Foto do escritório ${index + 1}`} />
          </li>
        ))}
      </ul>

      {isOpen && (
        <Modal
          images={images}
          selectedImageIndex={selectedImageIndex}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default GaleriaSection;
