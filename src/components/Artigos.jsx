import styles from "./Artigos.module.css";

const artigos = [
  {
    titulo: "Ciências criminais e constituição",
    descricao:
      "O livro explora a relação entre ciências criminais e a Constituição, discutindo temas como direito penal, criminologia e direitos fundamentais no Estado Democrático de Direito. Ele aborda questões como estelionato relacionado ao FGTS, discriminação online, expansão penal, e acordos de não persecução penal, com foco nas garantias constitucionais.",
    data: "Outubro de 2023",
    link: "https://esmal.tjal.jus.br/_pdf/1-Livro-ciencias-criminais-e-constituicao_.pdf",
  },
  {
    titulo: "REGIME PRÓPRIO DE PREVIDÊNCIA SOCIAL",
    descricao:
      "O artigo trata da relevância das parcerias no Regime Próprio de Previdência Social para assegurar os direitos dos segurados, respeitando o equilíbrio financeiro e atuarial. Explora as mudanças trazidas pela Emenda Constitucional nº 103/2019 e destaca o uso de convênios e contratos administrativos como ferramentas para aprimorar a gestão previdenciária e promover os direitos fundamentais.",
    data: "Fevereiro de 2024",
    link: "https://rbds.ieprev.com.br/rbds/article/view/288/242",
  },
  {
    titulo: "Direito Penal e Sociedade",
    descricao:
      "O livro Direito Penal e Sociedade reúne artigos acadêmicos que discutem a relação entre o direito penal e questões sociais, como encarceramento massivo, violência de gênero, racismo, feminicídio e justiça restaurativa, oferecendo análises críticas sobre o sistema de justiça Criminal no Brasil e alternativas ao modelo punitivista atual.",
    data: "Dezembro de 2021",
    link: "https://www.caedjus.com/wp-content/uploads/2021/08/06-CAEDJUS2021-Direito-penal-e-sociedade.pdf",
  },
];

const ArtigosSection = () => {
  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <section id="artigos" className={styles.artigosSection}>
      <h2>Artigos e Participações</h2>
      <div className={styles.artigosContainer}>
        {artigos.map((artigo, index) => (
          <div
            key={index}
            className={styles.artigoCard}
            onClick={() => openPdf(artigo.link)}
          >
            <h3>{artigo.titulo}</h3>
            <p className={styles.artigoDescricao}>{artigo.descricao}</p>
            <span className={styles.artigoData}>{artigo.data}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArtigosSection;
