import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MdArrowOutward } from 'react-icons/md'
import './styles/Work.css'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'App Móvil E-commerce',
    category: 'Android · Kotlin',
    tools: 'Kotlin · Android · E-commerce · UI Nativa',
    icon: '📱',
    color: 'linear-gradient(135deg,#00c896,#007f6e)',
    url: 'https://github.com/ealejandro23',
  },
  {
    num: '02',
    title: 'Plataforma Web E-commerce',
    category: 'Web · Node.js',
    tools: 'HTML · CSS · JavaScript · Node.js · API REST',
    icon: '🛒',
    color: 'linear-gradient(135deg,#007f6e,#00c896)',
    url: 'https://github.com/ealejandro23',
  },
  {
    num: '03',
    title: 'Sistema de Base de Datos',
    category: 'Backend · MySQL',
    tools: 'MySQL · SQL · Modelado Relacional · Stored Procedures',
    icon: '🗄️',
    color: 'linear-gradient(135deg,#ff6b35,#00c896)',
    url: 'https://github.com/ealejandro23',
  },
  {
    num: '04',
    title: 'Soluciones Computacionales',
    category: 'Data · Python',
    tools: 'Python · Jupyter · Data Analysis · Algoritmos',
    icon: '🧮',
    color: 'linear-gradient(135deg,#00c896,#ff6b35)',
    url: 'https://github.com/ealejandro23',
  },
]

const Work = () => {
  useGSAP(() => {
    let translateX = 0

    function setTranslateX() {
      const box = document.getElementsByClassName('work-box')
      if (!box.length) return
      const rectLeft = document.querySelector('.work-container')!.getBoundingClientRect().left
      const rect = box[0].getBoundingClientRect()
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width
      const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2
      translateX = rect.width * box.length - (rectLeft + parentWidth) + padding
    }

    setTranslateX()

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '.work-section',
        start: 'top top',
        end: `+=${translateX}`,
        scrub: true,
        pin: true,
        id: 'work',
      },
    })

    timeline.to('.work-flex', { x: -translateX, ease: 'none' })

    return () => {
      timeline.kill()
      ScrollTrigger.getById('work')?.kill()
    }
  }, [])

  return (
    <div className="work-section" id="proyectos">
      <div className="work-container section-container">
        <h2>
          Mis <span>Proyectos</span>
        </h2>
        <div className="work-flex">
          {projects.map(project => (
            <div className="work-box" key={project.num}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.num}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Stack & herramientas</h4>
                <p>{project.tools}</p>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="work-link"
                  data-cursor="disable"
                >
                  Ver en GitHub <MdArrowOutward />
                </a>
              </div>
              <div className="work-image-wrap">
                <div className="work-icon" style={{ background: project.color }}>
                  <span>{project.icon}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Work
