import gsap from 'gsap'

export function initialFX() {
  document.body.style.overflowY = 'auto'

  gsap.fromTo(
    ['.eg-header', '.social-icons', '.nav-fade'],
    { opacity: 0 },
    { opacity: 1, duration: 1.2, ease: 'power1.inOut', delay: 0.1 }
  )

  gsap.fromTo(
    '.landing-intro h2',
    { opacity: 0, y: 30, filter: 'blur(4px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9, ease: 'power3.out', delay: 0.3 }
  )

  gsap.fromTo(
    '.landing-name-line',
    { opacity: 0, y: 60, filter: 'blur(6px)' },
    { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, ease: 'power3.out', stagger: 0.12, delay: 0.5 }
  )

  gsap.fromTo(
    ['.landing-badge', '.landing-info-block'],
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.1, delay: 0.7 }
  )
}
