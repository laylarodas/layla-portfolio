import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { useTranslation } from '../context/LanguageContext'

function EasterEgg() {
  const { activated, resetActivation } = useKonamiCode()
  const { t } = useTranslation()

  useEffect(() => {
    if (activated) {
      // Launch confetti from both sides
      const duration = 3000
      const end = Date.now() + duration

      const colors = ['#6366f1', '#8b5cf6', '#a855f7', '#22d3ee']

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.7 },
          colors,
        })
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.7 },
          colors,
        })

        if (Date.now() < end) {
          requestAnimationFrame(frame)
        }
      }

      frame()

      // Reset after animation
      const timer = setTimeout(() => {
        resetActivation()
      }, duration + 500)

      return () => clearTimeout(timer)
    }
  }, [activated, resetActivation])

  if (!activated) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-surface-800/95 backdrop-blur-sm border border-accent/50 rounded-2xl p-8 shadow-2xl animate-bounce-in pointer-events-auto">
        <div className="text-center">
          <span className="text-5xl mb-4 block">🎮</span>
          <h3 className="text-2xl font-bold text-text-primary mb-2">
            {t('easterEgg.title')}
          </h3>
          <p className="text-text-muted text-sm">
            {t('easterEgg.message')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default EasterEgg
