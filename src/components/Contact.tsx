import { MdArrowOutward, MdCopyright } from 'react-icons/md'
import './styles/Contact.css'

const Contact = () => {
  return (
    <div className="contact-section" id="contacto">
      <div className="section-container">
        <div className="contact-eyebrow">
          <span className="eyebrow-line-contact" />
          Contacto
        </div>

        <div className="contact-big-wrap">
          <h2 className="contact-big">
            ¿Hablamos<span>?</span>
          </h2>
          <p className="contact-sub">
            Estoy abierto a prácticas, proyectos freelance o cualquier
            oportunidad interesante. No dudes en escribirme.
          </p>
        </div>

        <div className="contact-flex">
          <div className="contact-box">
            <h4>Contacto directo</h4>
            <p>
              <a href="mailto:estebangambd@gmail.com" data-cursor="disable">
                estebangambd@gmail.com
              </a>
            </p>
            <p style={{ marginTop: '0.5rem' }}>
              <a href="tel:+56990972646" data-cursor="disable">
                +56 9 9097 2646
              </a>
            </p>
            <p style={{ marginTop: '0.5rem', color: 'rgba(245, 243, 239, 0.58)', fontSize: '0.82rem' }}>
              📍 Maipú, Santiago · Chile
            </p>
          </div>

          <div className="contact-box">
            <h4>Redes</h4>
            <a
              href="https://github.com/ealejandro23"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="mailto:estebangambd@gmail.com"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
            <a
              href="tel:+56990972646"
              data-cursor="disable"
              className="contact-social"
            >
              Teléfono <MdArrowOutward />
            </a>
          </div>

          <div className="contact-box">
            <h2 className="contact-credits">
              Diseñado & Desarrollado <br /> por{' '}
              <span>Esteban Gamboa</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
