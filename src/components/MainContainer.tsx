import { lazy, Suspense, useEffect, useState } from 'react'
import About from './About'
import Career from './Career'
import Contact from './Contact'
import Landing from './Landing'
import Navbar from './Navbar'
import SocialIcons from './SocialIcons'
import WhatIDo from './WhatIDo'
import Work from './Work'
import { initialFX } from './utils/initialFX'
import { setAllTimeline } from './utils/GsapScroll'
import { useLoading } from '../context/LoadingProvider'

const TechStack = lazy(() => import('./TechStack'))

const MainContainer = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 1024)
  const { isLoading } = useLoading()

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        initialFX()
        setAllTimeline()
      }, 100)
    }
  }, [isLoading])

  return (
    <div className="container-main">
      <Navbar />
      <SocialIcons />
      <Landing />
      <About />
      <WhatIDo />
      <Career />
      <Work />
      {isDesktop && (
        <Suspense fallback={
          <div style={{ height: '500px', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--f-mono)', color: 'var(--green)', fontSize: '0.8rem' }}>// cargando tech stack...</span>
          </div>
        }>
          <TechStack />
        </Suspense>
      )}
      <Contact />
    </div>
  )
}

export default MainContainer
