import { useEffect } from 'react'
import { useMotionCapability } from '../hooks/useMotionCapability'

/**
 * Single delegated pointer listener for subtle card spotlight.
 * Does not change card content or structure.
 */
function CardGlow() {
  const { interactive } = useMotionCapability()

  useEffect(() => {
    if (!interactive) return undefined

    let frame = 0
    let pending = null

    const apply = () => {
      frame = 0
      if (!pending) return
      const { card, x, y } = pending
      pending = null
      card.style.setProperty('--card-x', `${x}%`)
      card.style.setProperty('--card-y', `${y}%`)
    }

    const onPointerMove = (event) => {
      const card = event.target.closest?.('.card')
      if (!card) return
      const rect = card.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      pending = {
        card,
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      }
      if (!frame) {
        frame = requestAnimationFrame(apply)
      }
    }

    document.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
    }
  }, [interactive])

  return null
}

export default CardGlow
