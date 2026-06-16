import { useRef } from 'react'
import { gsap } from 'gsap'

interface HoverLinksProps {
  text: string
}

const HoverLinks = ({ text }: HoverLinksProps) => {
  const ref = useRef<HTMLSpanElement>(null)

  const onEnter = () => {
    if (!ref.current) return
    const chars = ref.current.querySelectorAll('.hl-char')
    gsap.to(chars, {
      yPercent: -100,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const onLeave = () => {
    if (!ref.current) return
    const chars = ref.current.querySelectorAll('.hl-char')
    gsap.to(chars, {
      yPercent: 0,
      stagger: 0.03,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  return (
    <span
      ref={ref}
      className="hover-link"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{ display: 'inline-flex', overflow: 'hidden', position: 'relative' }}
    >
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="hl-char"
          style={{
            display: 'inline-block',
            willChange: 'transform',
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

export default HoverLinks
