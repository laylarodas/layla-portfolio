import { useEffect, useId, useMemo, useRef } from 'react'
import { useMotionCapability } from '../hooks/useMotionCapability'

/**
 * Trajectories avoid the central content safe zone (~20–80% x, ~18–78% y).
 * SVG mark always has head at +X (right). Rotation = travel angle so head leads.
 *
 * type: distant | standard | rare
 */
const STAR_DEFINITIONS = [
  // Distant — edge only, very faint
  {
    id: 'd1',
    type: 'distant',
    startX: -5,
    startY: 8,
    endX: 42,
    endY: 14,
    duration: 9.5,
    delay: 1.5,
    interval: 28,
  },
  {
    id: 'd2',
    type: 'distant',
    startX: 105,
    startY: 88,
    endX: 58,
    endY: 82,
    duration: 10.5,
    delay: 14,
    interval: 32,
  },
  {
    id: 'd3',
    type: 'distant',
    startX: 92,
    startY: 6,
    endX: 92,
    endY: 28,
    duration: 8,
    delay: 22,
    interval: 34,
  },
  // Standard — primary, edge / upper / lower bands
  {
    id: 's1',
    type: 'standard',
    startX: -8,
    startY: 10,
    endX: 108,
    endY: 16,
    duration: 7.2,
    delay: 0.5,
    interval: 22,
  },
  {
    id: 's2',
    type: 'standard',
    startX: 108,
    startY: 12,
    endX: -8,
    endY: 9,
    duration: 7.8,
    delay: 11,
    interval: 26,
  },
  {
    id: 's3',
    type: 'standard',
    startX: -6,
    startY: 4,
    endX: 55,
    endY: 22,
    duration: 6.5,
    delay: 6,
    interval: 24,
  },
  {
    id: 's4',
    type: 'standard',
    startX: 110,
    startY: 86,
    endX: -5,
    endY: 78,
    duration: 8.2,
    delay: 17,
    interval: 28,
  },
  {
    id: 's5',
    type: 'standard',
    startX: 8,
    startY: 92,
    endX: 48,
    endY: 72,
    duration: 6.8,
    delay: 20,
    interval: 30,
  },
  // Rare — long, infrequent, wide edge sweep
  {
    id: 'r1',
    type: 'rare',
    startX: -10,
    startY: 5,
    endX: 115,
    endY: 20,
    duration: 11.5,
    delay: 8,
    interval: 42,
  },
]

const PICK_BY_VIEWPORT = {
  desktop: ['d1', 'd2', 'd3', 's1', 's2', 's3', 's4', 'r1'],
  tablet: ['d1', 'd2', 's1', 's2', 's4'],
  mobile: ['d1', 's1', 's2'],
}

function angleDeg(startX, startY, endX, endY) {
  return (Math.atan2(endY - startY, endX - startX) * 180) / Math.PI
}

function StarMark({ uid, type }) {
  const isDistant = type === 'distant'
  const isRare = type === 'rare'
  const w = isDistant ? 140 : isRare ? 280 : 210
  const h = isDistant ? 14 : isRare ? 22 : 18

  return (
    <svg
      className={`shooting-star__mark shooting-star__mark--${type}`}
      viewBox={`0 0 ${w} ${h}`}
      width={w}
      height={h}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        {/* Tail (left) → head (right): continuous luminous body */}
        <linearGradient id={`${uid}-body`} x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="rgba(157, 123, 176, 0)" />
          <stop offset="22%" stopColor="rgba(157, 123, 176, 0.08)" />
          <stop offset="55%" stopColor="rgba(167, 135, 186, 0.28)" />
          <stop offset="82%" stopColor="rgba(183, 148, 198, 0.5)" />
          <stop offset="100%" stopColor="rgba(210, 190, 220, 0.62)" />
        </linearGradient>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(183, 148, 198, 0.35)" />
          <stop offset="55%" stopColor="rgba(157, 123, 176, 0.1)" />
          <stop offset="100%" stopColor="rgba(157, 123, 176, 0)" />
        </radialGradient>
        <filter id={`${uid}-blur`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={isDistant ? 1.2 : 1.8} />
        </filter>
      </defs>

      {/* Soft outer glow — only blurred element */}
      <ellipse
        className="shooting-star__glow"
        cx={w - h * 0.55}
        cy={h / 2}
        rx={h * 1.1}
        ry={h * 0.85}
        fill={`url(#${uid}-glow)`}
        filter={`url(#${uid}-blur)`}
      />

      {/* Single continuous comet body: tapering trail → elongated head */}
      <path
        className="shooting-star__body"
        d={
          isDistant
            ? `M 0 ${h / 2}
               L ${w * 0.72} ${h * 0.38}
               Q ${w * 0.9} ${h * 0.28} ${w - 1} ${h / 2}
               Q ${w * 0.9} ${h * 0.72} ${w * 0.72} ${h * 0.62}
               Z`
            : `M 0 ${h / 2}
               L ${w * 0.62} ${h * 0.32}
               Q ${w * 0.82} ${h * 0.18} ${w - 2} ${h / 2}
               Q ${w * 0.82} ${h * 0.82} ${w * 0.62} ${h * 0.68}
               Z`
        }
        fill={`url(#${uid}-body)`}
      />

      {/* Elongated luminous core fused with the tip — not a separate round dot */}
      <ellipse
        className="shooting-star__core"
        cx={w - h * 0.7}
        cy={h / 2}
        rx={isDistant ? 3.2 : isRare ? 6.5 : 5}
        ry={isDistant ? 1.1 : isRare ? 2.2 : 1.7}
        fill="rgba(210, 190, 220, 0.55)"
      />
    </svg>
  )
}

function Star({ star, uid }) {
  const angle = angleDeg(star.startX, star.startY, star.endX, star.endY)

  return (
    <div
      className={`shooting-star shooting-star--${star.type}`}
      style={{
        '--sx': `${star.startX}vw`,
        '--sy': `${star.startY}vh`,
        '--ex': `${star.endX}vw`,
        '--ey': `${star.endY}vh`,
        '--angle': `${angle}deg`,
        '--star-duration': `${star.duration}s`,
        '--star-delay': `${star.delay}s`,
        '--star-interval': `${star.interval}s`,
      }}
    >
      <div className="shooting-star__orient">
        <StarMark uid={`${uid}-${star.id}`} type={star.type} />
      </div>
      {star.type === 'rare' && <span className="shooting-star__afterglow" />}
    </div>
  )
}

/**
 * Global ambient atmosphere + shooting stars.
 * Fixed layer behind content. Head always leads via travel-angle rotation.
 */
function ShootingStarField({ intensity = 1 }) {
  const { reducedMotion, interactive, viewport } = useMotionCapability()
  const rootRef = useRef(null)
  const uid = useId().replace(/:/g, '')

  const stars = useMemo(() => {
    const ids = new Set(PICK_BY_VIEWPORT[viewport] ?? PICK_BY_VIEWPORT.desktop)
    return STAR_DEFINITIONS.filter((s) => ids.has(s.id))
  }, [viewport])

  useEffect(() => {
    if (reducedMotion || !interactive) return undefined

    const root = rootRef.current
    if (!root) return undefined

    let frame = 0
    let running = true
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const tick = () => {
      if (!running) return
      currentX += (targetX - currentX) * 0.04
      currentY += (targetY - currentY) * 0.04
      root.style.setProperty('--star-nudge-x', `${currentX.toFixed(2)}px`)
      root.style.setProperty('--star-nudge-y', `${currentY.toFixed(2)}px`)
      frame = requestAnimationFrame(tick)
    }

    const onMove = (event) => {
      const nx = (event.clientX / window.innerWidth - 0.5) * 2
      const ny = (event.clientY / window.innerHeight - 0.5) * 2
      targetX = nx * 6
      targetY = ny * 5
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    frame = requestAnimationFrame(tick)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [reducedMotion, interactive])

  return (
    <div
      ref={rootRef}
      className={`shooting-star-field shooting-star-field--global shooting-star-field--${viewport}${
        reducedMotion ? ' shooting-star-field--static' : ''
      }`}
      style={{ '--star-intensity': intensity }}
      aria-hidden="true"
    >
      {/* Restored soft lilac depth — behind stars */}
      <div className="shooting-star-field__ambient">
        <div className="shooting-star-field__halo shooting-star-field__halo--a" />
        <div className="shooting-star-field__halo shooting-star-field__halo--b" />
        <div className="shooting-star-field__halo shooting-star-field__halo--c" />
        <div className="shooting-star-field__breath" />
        {!reducedMotion && <div className="shooting-star-field__orbit" />}
        {!reducedMotion && <div className="shooting-star-field__drift-glow" />}
      </div>

      {!reducedMotion && (
        <div className="shooting-star-field__stars">
          {stars.map((star) => (
            <Star key={star.id} star={star} uid={uid} />
          ))}
        </div>
      )}

      {/* Soft readability veil — above stars, below content */}
      <div className="shooting-star-field__readability" />
    </div>
  )
}

export default ShootingStarField
