import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/Career.css'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    role: 'Asistente TI',
    badge: 'Práctica Profesional',
    company: 'AIEP · Institución Educacional',
    date: '2024 · 2 meses',
    items: [
      'Soporte técnico presencial a usuarios internos de la institución.',
      'Diagnóstico y resolución de problemas de hardware y software.',
      'Configuración de equipos informáticos y apoyo en infraestructura de red.',
      'Colaboración directa con el área tecnológica institucional.',
    ],
  },
  {
    role: 'Técnico en Telecomunicaciones',
    badge: 'Educación',
    company: 'Colegio Polivalente Patricio Mekis',
    date: 'Egresado 2023',
    items: [
      'Formación técnica en telecomunicaciones, redes y sistemas.',
      'Base sólida en infraestructura y protocolos de red.',
    ],
  },
  {
    role: 'Ingeniería en Informática · Mención IA',
    badge: 'En curso',
    badgeActive: true,
    company: 'Duoc UC',
    date: '2024 — Actualidad · 3er año',
    items: [
      'Enfoque en Inteligencia Artificial y desarrollo de software avanzado.',
      'Proyectos prácticos en web, móvil, bases de datos y algoritmos.',
    ],
  },
]

const Career = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    gsap.from(sectionRef.current.querySelectorAll('.career-item'), {
      x: -40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    })
  }, [])

  return (
    <div className="career-section" ref={sectionRef}>
      <div className="section-container">
        <div className="career-eyebrow">
          <span className="eyebrow-line-dark" />
          Experiencia
        </div>
        <h2 className="career-title">
          Mi carrera <span>&</span>
          <br /> trayectoria
        </h2>
        <div className="career-timeline">
          {experiences.map((exp, i) => (
            <div className="career-item" key={i}>
              <div className="career-dot" style={exp.badgeActive ? { borderColor: 'var(--green)', background: 'var(--green)' } : {}} />
              <div className="career-card">
                <div className="career-top">
                  <div className="career-role-wrap">
                    <h4 className="career-role">{exp.role}</h4>
                    <span className="career-company">{exp.company}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <span className={`career-badge${exp.badgeActive ? ' career-badge-active' : ''}`}>
                      {exp.badge}
                    </span>
                    <span className="career-date">{exp.date}</span>
                  </div>
                </div>
                <ul className="career-list">
                  {exp.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Career
