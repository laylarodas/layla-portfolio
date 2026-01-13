import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LanguageContext'

const certifications = [
  { key: 'java', icon: '☕' },
  { key: 'ml', icon: '🤖' },
  { key: 'datascience', icon: '📊' },
  { key: 'reactts', icon: '⚛️' },
  { key: 'mern', icon: '🔗' },
  { key: 'responsive', icon: '📱' },
]

const INITIAL_MOBILE_COUNT = 3

function Experience() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [showAll])

  // Show all on desktop, limited on mobile unless expanded
  const visibleCerts = isMobile && !showAll 
    ? certifications.slice(0, INITIAL_MOBILE_COUNT) 
    : certifications

  const hasMoreCerts = certifications.length > INITIAL_MOBILE_COUNT

  return (
    <section id="experience" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('experience.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('experience.title')}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-surface-600 to-transparent md:-translate-x-px" />

          <div className="space-y-8 md:space-y-12">
            {visibleCerts.map((cert, index) => (
              <div
                key={cert.key}
                className={`scroll-animate relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-accent rounded-full ring-4 ring-surface-900 md:-translate-x-1.5 z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="card p-5 hover:border-accent/40">
                    <div className={`flex items-start gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      <span className="text-2xl">{cert.icon}</span>
                      <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                        <h3 className="text-text-primary font-semibold text-sm md:text-base">
                          {t(`experience.certs.${cert.key}.title`)}
                        </h3>
                        <p className="text-accent text-xs font-mono mt-1">
                          {t(`experience.certs.${cert.key}.institution`)}
                        </p>
                      </div>
                    </div>
                    <p className="text-text-muted text-sm leading-relaxed mb-3">
                      {t(`experience.certs.${cert.key}.description`)}
                    </p>
                    <span className="inline-block text-xs font-mono text-text-muted bg-surface-700/50 px-2 py-1 rounded">
                      {t(`experience.certs.${cert.key}.date`)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show more button - only on mobile */}
        {isMobile && hasMoreCerts && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
            >
              {showAll ? (
                <>
                  <span>{t('experience.showLess')}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>{t('experience.showMore')} ({certifications.length - INITIAL_MOBILE_COUNT})</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Experience
