import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles/WhatIDo.css'

const WhatIDo = () => {
  const containerRef = useRef<(HTMLDivElement | null)[]>([])

  const setRef = (el: HTMLDivElement | null, index: number) => {
    containerRef.current[index] = el
  }

  useEffect(() => {
    if (ScrollTrigger.isTouch) {
      containerRef.current.forEach(container => {
        if (container) {
          container.classList.remove('what-noTouch')
          container.addEventListener('click', () => handleClick(container))
        }
      })
    }
    return () => {
      containerRef.current.forEach(container => {
        if (container) {
          container.removeEventListener('click', () => handleClick(container))
        }
      })
    }
  }, [])

  return (
    <div className="whatIDO">
      <div className="what-box">
        <h2 className="title">
          LO QUE
          <div>
            <span className="what-accent"> HAGO</span>
          </div>
        </h2>
      </div>
      <div className="what-box">
        <div className="what-box-in">
          <div className="what-border2">
            <svg width="100%">
              <line x1="0" y1="0" x2="0" y2="100%" stroke="rgba(0,200,150,0.3)" strokeWidth="2" strokeDasharray="7,7" />
              <line x1="100%" y1="0" x2="100%" y2="100%" stroke="rgba(0,200,150,0.3)" strokeWidth="2" strokeDasharray="7,7" />
            </svg>
          </div>

          {/* DESARROLLO */}
          <div className="what-content what-noTouch" ref={el => setRef(el, 0)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(0,200,150,0.3)" strokeWidth="2" strokeDasharray="6,6" />
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(0,200,150,0.3)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>DESARROLLO</h3>
              <h4>Web & Móvil</h4>
              <p>
                Construyo aplicaciones web y móviles funcionales, desde APIs REST con Node.js hasta apps Android nativas en Kotlin.
              </p>
              <h5>Stack & herramientas</h5>
              <div className="what-content-flex">
                <div className="what-tags">Python</div>
                <div className="what-tags">JavaScript</div>
                <div className="what-tags">Kotlin</div>
                <div className="what-tags">Node.js</div>
                <div className="what-tags">HTML/CSS</div>
                <div className="what-tags">Spring Boot</div>
                <div className="what-tags">MySQL</div>
                <div className="what-tags">Git</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>

          {/* REDES & TI */}
          <div className="what-content what-noTouch" ref={el => setRef(el, 1)}>
            <div className="what-border1">
              <svg height="100%">
                <line x1="0" y1="100%" x2="100%" y2="100%" stroke="rgba(0,200,150,0.3)" strokeWidth="2" strokeDasharray="6,6" />
              </svg>
            </div>
            <div className="what-corner" />
            <div className="what-content-in">
              <h3>REDES & TI</h3>
              <h4>Soporte & Infraestructura</h4>
              <p>
                Configuración de redes, soporte técnico presencial, diagnóstico de hardware y gestión de infraestructura con base en Cisco CCNA.
              </p>
              <h5>Stack & herramientas</h5>
              <div className="what-content-flex">
                <div className="what-tags">Cisco CCNA</div>
                <div className="what-tags">Redes TCP/IP</div>
                <div className="what-tags">Soporte TI</div>
                <div className="what-tags">Hardware</div>
                <div className="what-tags">Jupyter</div>
                <div className="what-tags">Data Analysis</div>
                <div className="what-tags">Prevencion de riesgos</div>
              </div>
              <div className="what-arrow" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function handleClick(container: HTMLDivElement) {
  container.classList.toggle('what-content-active')
  container.classList.remove('what-sibling')
  if (container.parentElement) {
    Array.from(container.parentElement.children).forEach(sibling => {
      if (sibling !== container) {
        sibling.classList.remove('what-content-active')
        sibling.classList.toggle('what-sibling')
      }
    })
  }
}

export default WhatIDo
