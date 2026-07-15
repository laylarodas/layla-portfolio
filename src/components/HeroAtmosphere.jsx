import { useEffect, useRef } from 'react'
import { useMotionCapability } from '../hooks/useMotionCapability'

/**
 * Decorative hero background: parallax layers + cursor spotlight.
 * Does not affect hero content layout or interaction.
 */
function HeroAtmosphere() {
  const { reducedMotion, interactive } = useMotionCapability()
  const rootRef = useRef(null)
  const parallaxRafRef = useRef(0)
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const currentRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const root = rootRef.current
    if (!root) return undefined

    const setVars = (x, y) => {
      const px = (x - 0.5) * 2
      const py = (y - 0.5) * 2
      root.style.setProperty('--mouse-x', `${x * 100}%`)
      root.style.setProperty('--mouse-y', `${y * 100}%`)
      root.style.setProperty('--parallax-x', `${px}`)
      root.style.setProperty('--parallax-y', `${py}`)
    }

    setVars(0.5, 0.5)

    if (!interactive) {
      return undefined
    }

    const section = root.closest('section') || root.parentElement
    let frameQueued = false

    const tick = () => {
      frameQueued = false
      const cur = currentRef.current
      const tgt = targetRef.current
      cur.x += (tgt.x - cur.x) * 0.08
      cur.y += (tgt.y - cur.y) * 0.08
      setVars(cur.x, cur.y)
    }

    const onPointerMove = (event) => {
      const rect = section.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) return
      targetRef.current = {
        x: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
        y: Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
      }
      if (!frameQueued) {
        frameQueued = true
        parallaxRafRef.current = requestAnimationFrame(tick)
      }
    }

    const onPointerLeave = () => {
      targetRef.current = { x: 0.5, y: 0.5 }
      if (!frameQueued) {
        frameQueued = true
        parallaxRafRef.current = requestAnimationFrame(tick)
      }
    }

    section.addEventListener('pointermove', onPointerMove, { passive: true })
    section.addEventListener('pointerleave', onPointerLeave)

    return () => {
      section.removeEventListener('pointermove', onPointerMove)
      section.removeEventListener('pointerleave', onPointerLeave)
      cancelAnimationFrame(parallaxRafRef.current)
    }
  }, [interactive])

  return (
    <div
      ref={rootRef}
      className={`hero-atmosphere ${interactive ? 'hero-atmosphere--interactive' : ''} ${reducedMotion ? 'hero-atmosphere--static' : ''}`}
      aria-hidden="true"
    >
      <div className="hero-atmosphere__layer hero-atmosphere__layer--far" />
      <div className="hero-atmosphere__layer hero-atmosphere__layer--mid" />
      <div className="hero-atmosphere__layer hero-atmosphere__layer--near" />
      <div className="hero-atmosphere__layer hero-atmosphere__layer--lines" />
      <div className="hero-atmosphere__layer hero-atmosphere__layer--grid" />
      {interactive && !reducedMotion && (
        <div className="hero-atmosphere__spotlight" />
      )}
    </div>
  )
}

export default HeroAtmosphere
