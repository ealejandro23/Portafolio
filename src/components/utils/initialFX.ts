import gsap from 'gsap'

export function initialFX() {
  document.body.style.overflowY = 'auto'

  gsap.set(['.landing-intro h2', '.landing-name-line', '.landing-badge', '.landing-info-block'], {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  })

  gsap.fromTo(
    ['.eg-header', '.social-icons', '.nav-fade'],
    { opacity: 0 },
    { opacity: 1, duration: 0.35, ease: 'power1.out' }
  )

  gsap.fromTo(
    '.landing-intro h2',
    { y: 8 },
    { y: 0, duration: 0.25, ease: 'power2.out' }
  )

  gsap.fromTo(
    '.landing-name-line',
    { y: 10 },
    { y: 0, duration: 0.3, ease: 'power2.out', stagger: 0.04 }
  )

  gsap.fromTo(
    ['.landing-badge', '.landing-info-block'],
    { y: 8 },
    { y: 0, duration: 0.25, ease: 'power2.out', stagger: 0.04 }
  )
}
