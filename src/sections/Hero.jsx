import { useState, useEffect } from 'react'
import { useTranslation } from '../context/LanguageContext'
import HeroAtmosphere from '../components/HeroAtmosphere'

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
    }, 50)
    return () => clearInterval(timer)
  }, [fullText])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
    >
      <HeroAtmosphere />
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface-900/45 to-surface-900 pointer-events-none z-[3]" />

      <div className="section-container relative z-10 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="text-gradient">{t('hero.name')}</span>
          </h1>

          <div className="mb-6 animate-fade-in animate-delay-100">
            <h2 className="text-accent text-lg md:text-xl font-medium tracking-tight leading-snug">
              <span>{displayText}</span>
              <span className="animate-blink text-accent">|</span>
            </h2>
          </div>

          <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4 max-w-2xl animate-fade-in animate-delay-200">
            {t('hero.lead')}
          </p>

          <p className="text-text-muted text-sm md:text-base leading-relaxed mb-10 max-w-2xl animate-fade-in animate-delay-300">
            {t('hero.description')}
          </p>

          <div className="flex flex-wrap gap-2 mb-10 animate-fade-in animate-delay-400">
            {['Python', 'Java', 'SQL', 'REST APIs', 'ERP', 'Automation', 'Power BI'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-mono text-text-muted bg-surface-800 rounded border border-surface-600/50"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3 animate-fade-in animate-delay-500">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent text-sm font-medium rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300"
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
              className="inline-flex items-center gap-2 px-4 py-3 text-text-muted hover:text-accent text-sm font-medium transition-colors duration-200"
            >
              {t('hero.github')}
            </a>
            <a
              href="https://www.linkedin.com/in/laylarodas/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 text-text-muted hover:text-accent text-sm font-medium transition-colors duration-200"
            >
              {t('hero.linkedin')}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in animate-delay-700 z-10">
        <div className="w-5 h-8 rounded-full border-2 border-surface-500 flex justify-center pt-2">
          <div className="w-1 h-2 bg-accent rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default Hero
