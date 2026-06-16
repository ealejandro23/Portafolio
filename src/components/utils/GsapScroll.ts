import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function setAllTimeline() {
  const isMobile = window.matchMedia('(max-width: 768px)').matches

  // Reveal WhatIDo panel
  gsap.to('.what-box-in', {
    display: 'flex',
    duration: 0.1,
    scrollTrigger: {
      trigger: '.whatIDO',
      start: isMobile ? 'top 88%' : 'top 60%',
    },
  })

  // Nav fade on scroll
  gsap.to('.nav-fade', {
    opacity: 1,
    scrollTrigger: {
      trigger: 'body',
      start: '50px top',
      end: '150px top',
      scrub: true,
    },
  })
}
