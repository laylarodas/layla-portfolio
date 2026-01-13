import { useState, useEffect } from 'react'
import { useTranslation } from '../context/LanguageContext'

function Hero() {
  const { t } = useTranslation()
  const [displayText, setDisplayText] = useState('')
  const fullText = t('hero.role')
  
  useEffect(() => {
    setDisplayText('')
    let index = 0
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 80)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-900/50 to-surface-900" />
      
      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10 py-20">
        <div className="max-w-3xl">
          {/* Terminal-style label */}
          <div className="flex items-center gap-2 mb-8 animate-fade-in">
            <span className="text-accent font-mono text-sm">//</span>
            <span className="text-text-muted font-mono text-sm">
              {t('hero.status')}
            </span>
          </div>
          
          {/* Role with typing effect */}
          <div className="mb-4 animate-fade-in animate-delay-100">
            <h2 className="text-accent text-xl md:text-2xl font-medium tracking-tight">
              <span>{displayText}</span>
              <span className="animate-blink text-accent">|</span>
            </h2>
          </div>
          
          {/* Name with gradient */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in animate-delay-200">
            <span className="text-gradient">Layla Rodas</span>
          </h1>
          
          {/* Description */}
          <p className="text-text-secondary text-lg md:text-xl leading-relaxed mb-10 max-w-2xl animate-fade-in animate-delay-300">
            {t('hero.description')}{' '}
            <span className="text-text-primary font-medium">Java</span>,{' '}
            <span className="text-text-primary font-medium">Spring Boot</span> {t('hero.and')}{' '}
            <span className="text-text-primary font-medium">Node.js</span>.
          </p>
          
          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 mb-10 animate-fade-in animate-delay-400">
            {['Java', 'Spring Boot', 'Node.js', 'Android', 'SQL'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-mono text-text-muted bg-surface-800 rounded border border-surface-600/50 hover:border-accent/40 hover:text-accent transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* CTAs */}
          <div className="flex items-center gap-4 animate-fade-in animate-delay-500">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 hover:glow-sm"
            >
              {t('hero.viewProjects')}
              <svg className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
            <a
              href="https://github.com/laylarodas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-text-secondary hover:text-text-primary text-sm font-medium transition-colors duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              {t('hero.github')}
            </a>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animate-delay-700">
        <div className="w-5 h-8 rounded-full border-2 border-surface-500 flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default Hero
