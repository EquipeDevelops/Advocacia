/* eslint-disable react/no-unescaped-entities */
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer>
      <div className={styles.footerContainer}>
        <div className={styles.footerSobre}>
          <h3>Cristóvão Brito</h3>
          <p>
            Sou advogado especialista em Direito Penal e Processual Penal,
            oferecendo serviços jurídicos de alta qualidade com foco na defesa e
            orientação de meus clientes.
          </p>
          <p>
            Com vasta experiência em diversas instituições jurídicas, mantenho
            um compromisso com a ética e a eficiência, buscando sempre a melhor
            solução para cada caso.
          </p>
          <div className={styles.icones}>
            <a
              href="https://instagram.com/cristovaos.brito"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://wa.me/5582996111737"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className={styles.footerContato}>
          <h3>Entre em contato!</h3>
          <p>
            <i className="fas fa-envelope"></i>
            cristovaoadv21@gmail.com
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i>
            Endereço: Olho d'Agua das Flores, Próximo ao Fórum. Estado -
          </p>
        </div>

        <div className={styles.footerServicos}>
          <h3>Serviços</h3>
          <ul>
            <li>Consultoria jurídica penal</li>
            <li>Defesa em processos penais</li>
            <li>Assessoria em Direito Constitucional e Processual</li>
            <li>Orientação e aconselhamento jurídico</li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; 2025 Advocacia Cristóvão Brito. Todos os direitos reservados.
        </p>
        <p>Política de Privacidade | Termos de Uso</p>
      </div>
    </footer>
  );
};

export default Footer;
