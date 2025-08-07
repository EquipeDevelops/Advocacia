import styles from "./HeroSection.module.css";
import fotoPerfil from "../imgs/fotoPerfil.jpeg";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.conteudo}>
        <h1>Cristovão brito advocacia.</h1>
        <p>
          Atuação jurídica especializada em processos criminais, Tribunal do
          Júri e Tribunais Superiores.
        </p>
        <a href="#contato">Agende uma consulta</a>
      </div>
      <div className={styles.fotoPerfil}>
        <img src={fotoPerfil} alt="" />
      </div>
    </section>
  );
};

export default HeroSection;
