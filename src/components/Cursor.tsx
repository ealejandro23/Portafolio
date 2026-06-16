import { useEffect, useRef } from 'react'
import './styles/Cursor.css'

const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0
    let raf: number

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(animate)
    }

    const onEnterLink = (e: MouseEvent) => {
      const t = e.currentTarget as HTMLElement
      if (t.dataset.cursor === 'disable') return
      ringRef.current?.classList.add('cursor-expand')
    }

    const onLeaveLink = () => {
      ringRef.current?.classList.remove('cursor-expand')
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(animate)

    const addListeners = () => {
      document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink as EventListener)
        el.addEventListener('mouseleave', onLeaveLink)
      })
    }

    addListeners()
    const obs = new MutationObserver(addListeners)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      obs.disconnect()
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </>
  )
}

export default Cursor
