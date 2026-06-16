import { useEffect } from 'react'
import { gsap } from 'gsap'
import './styles/Landing.css'

const Landing = () => {
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 })
    tl.from('.landing-intro h2', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' })
      .from('.landing-name-line', { y: 60, opacity: 0, duration: 0.7, ease: 'power3.out', stagger: 0.1 }, '-=0.3')
      .from('.landing-info-block', { y: 30, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .from('.landing-badge', { y: 20, opacity: 0, duration: 0.5, ease: 'power3.out' }, '-=0.2')
  }, [])

  return (
    <>
      <div className="landing-section" id="landingDiv">
        <div className="landing-container">
          <div className="landing-intro">
            <h2>Hola! Soy</h2>
            <h1>
              <span className="landing-name-line">ESTEBAN</span>
              <br />
              <span className="landing-name-line landing-name-outline">GAMBOA</span>
            </h1>
          </div>
          <div className="landing-info">
            <div className="landing-badge">
              <span className="pulse-dot" />
              Disponible · Santiago, Chile
            </div>
            <div className="landing-info-block">
              <h3>Ingeniero en</h3>
              <h2 className="landing-info-h2">Informática</h2>
              <h2 className="landing-info-subtitle">con mención IA</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Landing
