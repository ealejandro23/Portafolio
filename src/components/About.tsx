import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/About.css'

gsap.registerPlugin(ScrollTrigger)

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.from(sectionRef.current.querySelectorAll('.about-reveal'), {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  const stats = [
    { num: '3', sup: '°', label: 'Año en curso' },
    { num: '4', sup: '+', label: 'Proyectos' },
    { num: '3', sup: '', label: 'Certificaciones' },
    { num: '12', sup: '+', label: 'Tecnologías' },
  ]

  return (
    <div className="about-section" id="sobre-mi" ref={sectionRef}>
      <div className="section-container">
        <div className="about-eyebrow about-reveal">
          <span className="eyebrow-line" />
          Sobre mí
        </div>
        <h2 className="about-title about-reveal">
          ¿Quién <span>soy</span>?
        </h2>
        <div className="about-grid">
          <div className="about-body">
            <p className="about-reveal">
              Soy <strong>Esteban Gamboa</strong>, estudiante de 3er año de{' '}
              <strong>Ingeniería en Informática con mención en Inteligencia Artificial</strong>{' '}
              en Duoc UC, con formación técnica previa en Telecomunicaciones.
            </p>
            <p className="about-reveal">
              Me especializo en soporte TI, configuración de redes, hardware y desarrollo de software web y móvil.
              Realicé mi práctica profesional como <strong>Asistente TI en AIEP</strong>, donde resolví incidencias
              reales y colaboré con el área tecnológica institucional.
            </p>
            <p className="about-reveal">
              Aprendo rápido, soy proactivo y me enfoco en resolver problemas con soluciones concretas.
              Inglés nivel intermedio. Siempre buscando el próximo desafío.
            </p>
          </div>
          <div className="about-stats about-reveal">
            {stats.map(({ num, sup, label }) => (
              <div className="stat-card" key={label}>
                <div className="stat-num">
                  {num}<span>{sup}</span>
                </div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
