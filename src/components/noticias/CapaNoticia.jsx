/* eslint-disable react/prop-types */
import React from 'react';
import noticias from './noticias.json';
import styles from './CapaNoticia.module.css';

const dataAtual = () => {
  const dataAgora = new Date();
  const dia = String(dataAgora.getDate()).padStart(2, '0');
  const mes = String(dataAgora.getMonth() + 1).padStart(2, '0');
  const ano = dataAgora.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const calculaDiferencaDatas = (dataInicio, dataAtual) => {
  const [dia1, mes1, ano1] = dataInicio.split('/').map(Number);
  const [dia2, mes2, ano2] = dataAtual.split('/').map(Number);
  const data1 = new Date(ano1, mes1 - 1, dia1);
  const data2 = new Date(ano2, mes2 - 1, dia2);
  const diferencaEmMLsegundos = Math.abs(data2 - data1);

  const milissegundosDia = 24 * 60 * 60 * 1000;
  const diferenca = Math.ceil(diferencaEmMLsegundos / milissegundosDia);

  if (diferenca <= 31) {
    return `${Math.floor(diferenca)} dias`;
  } else if (diferenca >= 31 && diferenca < 365) {
    return `${Math.floor(diferenca / 31)} meses`;
  } else {
    return `${Math.floor(diferenca / 365)} anos`;
  }
};

const CapaNoticia = ({
  img,
  data,
  titulo,
  id,
  onNoticiaClick,
  isDestaque = false,
}) => {
  const dataAtualBR = dataAtual();
  const diferencaDatas = calculaDiferencaDatas(data, dataAtualBR);

  function selecionarNoticia() {
    const noticiaSelecionada = noticias.find((noticia) => {
      return noticia.id === id;
    });
    onNoticiaClick(noticiaSelecionada);
  }

  return (
    <article
      className={`${styles.noticiaCard} ${
        isDestaque ? styles.destaqueCard : ''
      }`}
    >
      <div className={styles.imageContainer}>
        <div
          className={styles.noticiaImage}
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className={styles.imageOverlay}>
          <button className={styles.readMoreBtn} onClick={selecionarNoticia}>
            Ler Mais
          </button>
        </div>
      </div>

      <div className={styles.cardContent}>
        <div className={styles.metaInfo}>
          <span className={styles.dateBadge}>
            <svg
              className={styles.dateIcon}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
            {diferencaDatas}
          </span>
        </div>

        <h3 className={styles.noticiaTitle} onClick={selecionarNoticia}>
          {titulo}
        </h3>

        <button className={styles.viewDetailsBtn} onClick={selecionarNoticia}>
          Ver Detalhes
          <svg
            className={styles.arrowIcon}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
          </svg>
        </button>
      </div>
    </article>
  );
};

export default CapaNoticia;
