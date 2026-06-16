import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { gsap } from 'gsap'
import HoverLinks from './HoverLinks'
import './styles/Navbar.css'

gsap.registerPlugin(ScrollTrigger)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const links = document.querySelectorAll('.eg-header ul a')
    const handleClick = (e: Event) => {
      e.preventDefault()
      const el = e.currentTarget as HTMLAnchorElement
      const href = el.getAttribute('href') || el.getAttribute('data-href')
      if (href) {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
      setIsMenuOpen(false)
    }

    links.forEach(elem => {
      const element = elem as HTMLAnchorElement
      element.addEventListener('click', handleClick)
    })

    return () => {
      links.forEach(elem => {
        const element = elem as HTMLAnchorElement
        element.removeEventListener('click', handleClick)
      })
    }
  }, [])

  return (
    <>
      <div className={`eg-header${isMenuOpen ? ' eg-header-open' : ''}`}>
        <a href="/#" className="eg-logo" data-cursor="disable">
          E<span>.</span>G
        </a>
        <a
          href="mailto:estebangambd@gmail.com"
          className="eg-email"
          data-cursor="disable"
        >
          estebangambd@gmail.com
        </a>
        <button
          className="eg-menu-button"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="eg-mobile-nav"
          data-cursor="disable"
          onClick={() => setIsMenuOpen(current => !current)}
        >
          {isMenuOpen ? 'CERRAR' : 'MENÚ'}
        </button>
        <ul id="eg-mobile-nav">
          <li>
            <a data-href="#sobre-mi" href="#sobre-mi">
              <HoverLinks text="SOBRE MÍ" />
            </a>
          </li>
          <li>
            <a data-href="#proyectos" href="#proyectos">
              <HoverLinks text="PROYECTOS" />
            </a>
          </li>
          <li>
            <a data-href="#contacto" href="#contacto">
              <HoverLinks text="CONTACTO" />
            </a>
          </li>
        </ul>
      </div>

      <div className="nav-circle1" />
      <div className="nav-circle2" />
      <div className="nav-fade" />
    </>
  )
}

export default Navbar
