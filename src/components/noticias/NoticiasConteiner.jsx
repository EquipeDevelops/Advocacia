import React from 'react';
import style from './NoticiasConteiner.module.css';
import CapaNoticia from './CapaNoticia';
import NoticiaModal from './NoticiaModal';
import NoticiaDestaque from './NoticiaDestaque';
import noticias from './noticias.json';

const Noticias = () => {
  const [activeModal, setActiveModal] = React.useState(false);
  const [noticia, setNoticia] = React.useState(null);

  // Encontra a notícia do livro (id 7) para destaque
  const noticiaDestaque = noticias.find((n) => n.id === 7);

  const handleNoticiaClick = (noticiaData) => {
    setNoticia(noticiaData);
    setActiveModal(true);
  };

  return (
    <>
      {/* Destaque da notícia do livro */}
      <NoticiaDestaque noticia={noticiaDestaque} />

      <section className={style.noticiasSection}>
        <div className={style.sectionHeader}>
          <h2 className={style.sectionTitle}>Notícias Atuais</h2>
          <p className={style.sectionSubtitle}>
            Acompanhe as últimas novidades e acontecimentos do escritório
          </p>
        </div>

        <div className={style.noticiasGrid}>
          {noticias.map(({ titulo, img, data, id }) => {
            return (
              <CapaNoticia
                key={id}
                titulo={titulo}
                img={img}
                data={data}
                id={id}
                setActiveModal={setActiveModal}
                setNoticia={setNoticia}
                onNoticiaClick={handleNoticiaClick}
                isDestaque={id === 7} // Marca a notícia 7 como destaque
              />
            );
          })}
        </div>
      </section>

      {activeModal && noticia && (
        <NoticiaModal setActiveModal={setActiveModal} noticia={noticia} />
      )}
    </>
  );
};

export default Noticias;
