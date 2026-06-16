import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useLoading } from '../context/LoadingProvider'
import LetterGlitch from './LetterGlitch'
import './styles/Loading.css'

const Loading = () => {
  const loadingRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const { setIsLoading } = useLoading()

  useEffect(() => {
    const counter = { val: 0 }
    gsap.to(counter, {
      val: 100,
      duration: 2,
      ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.val).toString().padStart(3, '0')
        }
      },
      onComplete: () => {
        gsap.to(loadingRef.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'power3.inOut',
          delay: 0.3,
          onComplete: () => setIsLoading(false),
        })
      },
    })
  }, [setIsLoading])

  return (
    <div className="loading-screen" ref={loadingRef}>
      <div className="loading-glitch-bg" aria-hidden="true">
        <LetterGlitch
          glitchColors={['#0b201d', '#007f6e', '#00c896', '#f5f3ef']}
          glitchSpeed={50}
          centerVignette
          outerVignette={false}
          smooth
        />
      </div>
      <div className="loading-inner">
        <div className="loading-logo">E<span>.</span>G</div>
        <span className="loading-counter" ref={counterRef}>000</span>
      </div>
      <div className="loading-bar-track">
        <div className="loading-bar-fill"></div>
      </div>
    </div>
  )
}

export default Loading
