import { useEffect, useState } from 'react'
import { useKonamiCode } from '../hooks/useKonamiCode'
import { useTranslation } from '../context/LanguageContext'

function EasterEgg() {
  const { activated, resetActivation } = useKonamiCode()
  const { t } = useTranslation()
  const [phase, setPhase] = useState('idle') // idle, glitch, messageGlitch, messageStable, fadeOut

  useEffect(() => {
    if (activated) {
      // Phase 1: Screen glitch
      setPhase('glitch')

      // Phase 2: Message appears with glitch effect
      const messageGlitchTimer = setTimeout(() => {
        setPhase('messageGlitch')
      }, 800)

      // Phase 3: Message stabilizes
      const messageStableTimer = setTimeout(() => {
        setPhase('messageStable')
      }, 1500)

      // Phase 4: Fade out
      const fadeOutTimer = setTimeout(() => {
        setPhase('fadeOut')
      }, 4000)

      // Reset
      const resetTimer = setTimeout(() => {
        setPhase('idle')
        resetActivation()
      }, 4500)

      return () => {
        clearTimeout(messageGlitchTimer)
        clearTimeout(messageStableTimer)
        clearTimeout(fadeOutTimer)
        clearTimeout(resetTimer)
      }
    }
  }, [activated, resetActivation])

  if (phase === 'idle') return null

  return (
    <>
      {/* Glitch overlay effect */}
      {phase === 'glitch' && (
        <div className="fixed inset-0 z-[60] pointer-events-none">
          {/* Screen shake effect on body */}
          <div className="fixed inset-0 animate-glitch">
            {/* RGB split layers */}
            <div className="absolute inset-0 bg-red-500/10 mix-blend-multiply animate-glitch-overlay" />
            <div className="absolute inset-0 bg-cyan-500/10 mix-blend-multiply animate-glitch-overlay" style={{ animationDelay: '0.05s' }} />
            <div className="absolute inset-0 bg-green-500/10 mix-blend-multiply animate-glitch-overlay" style={{ animationDelay: '0.1s' }} />
          </div>

          {/* Scanlines */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="w-full h-1 bg-white/20 animate-scanline" />
            <div className="w-full h-1 bg-white/10 animate-scanline" style={{ animationDelay: '0.05s' }} />
          </div>

          {/* Noise overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Random glitch blocks */}
          <div className="absolute top-1/4 left-1/3 w-32 h-4 bg-accent/50 animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-24 h-2 bg-cyan-400/50 animate-pulse" style={{ animationDelay: '0.1s' }} />
          <div className="absolute bottom-1/3 left-1/2 w-16 h-3 bg-purple-500/50 animate-pulse" style={{ animationDelay: '0.2s' }} />
        </div>
      )}

      {/* Message modal */}
      {(phase === 'messageGlitch' || phase === 'messageStable' || phase === 'fadeOut') && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-surface-900/70 backdrop-blur-sm transition-opacity duration-500"
          style={{ opacity: phase === 'fadeOut' ? 0 : 1 }}
        >
          <div 
            className="relative bg-surface-800 border-2 border-accent rounded-xl p-8 mx-4 transition-transform duration-500 overflow-hidden"
            style={{
              animation: phase === 'messageGlitch' 
                ? 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards, glitch 0.15s ease-in-out infinite' 
                : 'none',
              transform: phase === 'fadeOut' ? 'scale(0.9)' : 'scale(1)',
              boxShadow: '0 0 30px rgba(157, 123, 176, 0.4), inset 0 0 60px rgba(157, 123, 176, 0.1)'
            }}
          >
            {/* Scanline effect on card */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="w-full h-full" style={{
                background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)'
              }} />
            </div>
            
            {/* Glitch corner accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-400" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-400" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            <div className="text-center relative z-10">
              <span className="text-5xl mb-4 block drop-shadow-lg">🎮</span>
              
              {/* Glitch text effect */}
              <h3 className="text-2xl font-bold mb-2 relative">
                <span className="relative inline-block text-text-primary">
                  {t('easterEgg.title')}
                  <span className="absolute top-0 left-[2px] text-cyan-400/60 -z-10" aria-hidden="true">
                    {t('easterEgg.title')}
                  </span>
                  <span className="absolute top-0 left-[-2px] text-red-400/60 -z-10" aria-hidden="true">
                    {t('easterEgg.title')}
                  </span>
                </span>
              </h3>
              
              <p className="text-text-muted text-sm mb-4">
                {t('easterEgg.message')}
              </p>
              
              <div className="inline-block text-xs font-mono text-green-400 bg-surface-900/80 px-3 py-1.5 rounded border border-green-400/30">
                {'>'} system.unlock() <span className="text-accent">✓</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default EasterEgg
