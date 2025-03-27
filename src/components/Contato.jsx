import { useState } from "react";
import emailjs from "emailjs-com";
import styles from "./Contato.module.css";

emailjs.init("plq6NWc52FMx7mYUF");

const Contato = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    to_name: "Advogado Cristóvão Brito",
    from_name: "",
    email: "",
    numero: "",
    assunto: "",
    comentario: "",
    mensagemAdicional: "",
    contato: "whatsapp",
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.contato === "whatsapp") {
      const whatsappUrl = `https://wa.me/5582996111737?text=Nome:%20${encodeURIComponent(
        formData.from_name
      )}%0AAssunto:%20${encodeURIComponent(
        formData.assunto
      )}%0AComentário:%20${encodeURIComponent(formData.comentario)}`;
      window.open(whatsappUrl, "_blank");
    } else if (formData.contato === "email") {
      if (!formData.email) {
        alert("Por favor, forneça seu email para contatar via Email.");
        return;
      }

      const templateParams = {
        to_name: formData.to_name,
        from_name: formData.from_name,
        email_id: formData.email,
        message: `Assunto: ${formData.assunto}\nComentário: ${formData.comentario}\nMensagem Adicional: ${formData.mensagemAdicional}`,
      };

      emailjs.send("service_41swtdz", "template_6bttjka", templateParams).then(
        (response) => {
          console.log(
            "Email enviado com sucesso!",
            response.status,
            response.text
          );
          alert("Email enviado com sucesso!");
        },
        (error) => {
          console.error("Erro ao enviar email:", error);
          alert("Erro ao enviar email. Tente novamente.");
        }
      );
    }

    setIsModalOpen(false);
  };

  const handleSelectContact = (canal) => {
    setFormData({ ...formData, contato: canal });
  };

  const fecharModal = (target, currentTarget) => {
    if (target == currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={styles.contatoContainer}>
      <section id="contato">
        <h2>Contato</h2>
        <p>Entre em contato para mais informações sobre nossos serviços.</p>
        <br />
        <div>
          <button className={styles.botaoContato} onClick={handleOpenModal}>
            Entre em contato
          </button>
        </div>

        {isModalOpen && (
          <div
            className={`${styles.modalOverlay} fadeIn`}
            onClick={({ target, currentTarget }) =>
              fecharModal(target, currentTarget)
            }
          >
            <div className={styles.modalContent}>
              <span className={styles.modalClose} onClick={handleCloseModal}>
                Fechar
              </span>
              <h3>Escolha o meio de contato</h3>
              <div className={styles.contactSelection}>
                <button
                  onClick={() => handleSelectContact("whatsapp")}
                  className={`${styles.contactOption} ${
                    formData.contato === "whatsapp" ? styles.selectedWhats : ""
                  }`}
                >
                  WhatsApp
                </button>
                <button
                  onClick={() => handleSelectContact("email")}
                  className={`${styles.contactOption} ${
                    formData.contato === "email" ? styles.selectedEmail : ""
                  }`}
                >
                  Email
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className={`${styles.formTransition} ${formData.contato}`}
              >
                <div className={styles.modalFormGroup}>
                  <label htmlFor="from_name">Nome:</label>
                  <input
                    type="text"
                    id="from_name"
                    name="from_name"
                    value={formData.from_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {formData.contato === "whatsapp" && (
                  <>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="numero">Número:</label>
                      <input
                        type="tel"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="assunto">Assunto:</label>
                      <input
                        type="text"
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}

                {formData.contato === "email" && (
                  <>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="assunto">Assunto:</label>
                      <input
                        type="text"
                        id="assunto"
                        name="assunto"
                        value={formData.assunto}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className={styles.modalFormGroup}>
                      <label htmlFor="mensagemAdicional">
                        Mensagem Adicional:
                      </label>
                      <textarea
                        id="mensagemAdicional"
                        name="mensagemAdicional"
                        value={formData.mensagemAdicional}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </>
                )}

                <div className={styles.modalFormGroup}>
                  <label htmlFor="comentario">Comentário:</label>
                  <textarea
                    id="comentario"
                    name="comentario"
                    value={formData.comentario}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Enviar
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contato;
