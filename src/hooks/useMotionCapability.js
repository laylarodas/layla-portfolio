import { useEffect, useState } from 'react'

function getCapability() {
  if (typeof window === 'undefined') {
    return {
      reducedMotion: true,
      interactive: false,
      viewport: 'mobile',
    }
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches
  const mobile = window.matchMedia('(max-width: 768px)').matches
  const tablet = window.matchMedia('(max-width: 1024px)').matches

  const viewport = mobile ? 'mobile' : tablet ? 'tablet' : 'desktop'

  return {
    reducedMotion,
    interactive: !reducedMotion && !coarsePointer && !mobile,
    viewport,
  }
}

/**
 * Detects motion preferences and viewport tier for ambient effects.
 */
export function useMotionCapability() {
  const [capability, setCapability] = useState(getCapability)

  useEffect(() => {
    const reducedMq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarseMq = window.matchMedia('(pointer: coarse)')
    const mobileMq = window.matchMedia('(max-width: 768px)')
    const tabletMq = window.matchMedia('(max-width: 1024px)')

    const update = () => setCapability(getCapability())

    reducedMq.addEventListener('change', update)
    coarseMq.addEventListener('change', update)
    mobileMq.addEventListener('change', update)
    tabletMq.addEventListener('change', update)
    window.addEventListener('resize', update)

    return () => {
      reducedMq.removeEventListener('change', update)
      coarseMq.removeEventListener('change', update)
      mobileMq.removeEventListener('change', update)
      tabletMq.removeEventListener('change', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return capability
}
