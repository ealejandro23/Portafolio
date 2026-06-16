import { useEffect, useRef, type CSSProperties } from 'react'

type LetterState = {
  char: string
  color: string
  targetColor: string
  colorProgress: number
}

type Rgb = {
  r: number
  g: number
  b: number
}

type LetterGlitchProps = {
  glitchColors?: string[]
  className?: string
  glitchSpeed?: number
  centerVignette?: boolean
  outerVignette?: boolean
  smooth?: boolean
  characters?: string
}

const fontSize = 16
const charWidth = 10
const charHeight = 20

const LetterGlitch = ({
  glitchColors = ['#0a2f2a', '#00c896', '#f5f3ef'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789',
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const letters = useRef<LetterState[]>([])
  const grid = useRef({ columns: 0, rows: 0 })
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const lastGlitchTime = useRef(Date.now())
  const lettersAndSymbols = Array.from(characters)

  useEffect(() => {
    const getRandomChar = () => lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)]
    const getRandomColor = () => glitchColors[Math.floor(Math.random() * glitchColors.length)]

    const hexToRgb = (hexValue: string): Rgb | null => {
      const expandedHex = hexValue.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_match, r, g, b) => r + r + g + g + b + b)
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expandedHex)

      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null
    }

    const interpolateColor = (start: Rgb, end: Rgb, factor: number) => {
      const result = {
        r: Math.round(start.r + (end.r - start.r) * factor),
        g: Math.round(start.g + (end.g - start.g) * factor),
        b: Math.round(start.b + (end.b - start.b) * factor),
      }
      return `rgb(${result.r}, ${result.g}, ${result.b})`
    }

    const calculateGrid = (width: number, height: number) => ({
      columns: Math.ceil(width / charWidth),
      rows: Math.ceil(height / charHeight),
    })

    const initializeLetters = (columns: number, rows: number) => {
      grid.current = { columns, rows }
      const totalLetters = columns * rows
      letters.current = Array.from({ length: totalLetters }, () => ({
        char: getRandomChar(),
        color: getRandomColor(),
        targetColor: getRandomColor(),
        colorProgress: 1,
      }))
    }

    const drawLetters = () => {
      if (!context.current || letters.current.length === 0 || !canvasRef.current) return

      const ctx = context.current
      const { width, height } = canvasRef.current.getBoundingClientRect()
      ctx.clearRect(0, 0, width, height)
      ctx.font = `${fontSize}px monospace`
      ctx.textBaseline = 'top'

      letters.current.forEach((letter, index) => {
        const x = (index % grid.current.columns) * charWidth
        const y = Math.floor(index / grid.current.columns) * charHeight
        ctx.fillStyle = letter.color
        ctx.fillText(letter.char, x, y)
      })
    }

    const resizeCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return

      const parent = canvas.parentElement
      if (!parent) return

      const dpr = window.devicePixelRatio || 1
      const rect = parent.getBoundingClientRect()

      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`

      if (context.current) {
        context.current.setTransform(dpr, 0, 0, dpr, 0, 0)
      }

      const { columns, rows } = calculateGrid(rect.width, rect.height)
      initializeLetters(columns, rows)
      drawLetters()
    }

    const updateLetters = () => {
      if (letters.current.length === 0) return

      const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05))

      for (let i = 0; i < updateCount; i += 1) {
        const index = Math.floor(Math.random() * letters.current.length)
        const letter = letters.current[index]
        if (!letter) continue

        letter.char = getRandomChar()
        letter.targetColor = getRandomColor()

        if (!smooth) {
          letter.color = letter.targetColor
          letter.colorProgress = 1
        } else {
          letter.colorProgress = 0
        }
      }
    }

    const handleSmoothTransitions = () => {
      let needsRedraw = false

      letters.current.forEach(letter => {
        if (letter.colorProgress >= 1) return

        letter.colorProgress = Math.min(letter.colorProgress + 0.05, 1)
        const startRgb = hexToRgb(letter.color)
        const endRgb = hexToRgb(letter.targetColor)

        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress)
          needsRedraw = true
        }
      })

      if (needsRedraw) drawLetters()
    }

    const animate = () => {
      const now = Date.now()

      if (now - lastGlitchTime.current >= glitchSpeed) {
        updateLetters()
        drawLetters()
        lastGlitchTime.current = now
      }

      if (smooth) handleSmoothTransitions()

      animationRef.current = requestAnimationFrame(animate)
    }

    const canvas = canvasRef.current
    if (!canvas) return undefined

    context.current = canvas.getContext('2d')
    resizeCanvas()
    animate()

    let resizeTimeout: number | undefined
    const handleResize = () => {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(() => {
        if (animationRef.current) cancelAnimationFrame(animationRef.current)
        resizeCanvas()
        animate()
      }, 100)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [characters, glitchColors, glitchSpeed, lettersAndSymbols, smooth])

  const containerStyle: CSSProperties = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#0b0c10',
    overflow: 'hidden',
  }

  const canvasStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
  }

  const outerVignetteStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(11,12,16,0) 56%, rgba(11,12,16,0.94) 100%)',
  }

  const centerVignetteStyle: CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(11,12,16,0.78) 0%, rgba(11,12,16,0) 58%)',
  }

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle} />}
      {centerVignette && <div style={centerVignetteStyle} />}
    </div>
  )
}

export default LetterGlitch
