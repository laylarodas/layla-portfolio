import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'

function Contact() {
  const { t, language } = useTranslation()
  const sectionRef = useRef(null)
  const cvUrl = `/cv-${language}.pdf`

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
  }, [])

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('contact.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('contact.title')}
          </h2>
        </div>
        
        {/* Content */}
        <div className="max-w-2xl scroll-animate" style={{ transitionDelay: '100ms' }}>
          <p className="text-text-secondary text-lg leading-relaxed mb-8">
            {t('contact.description')}
          </p>
          
          {/* Email CTA */}
          <a
            href="mailto:rodas.layla@gmail.com"
            className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-semibold text-text-primary hover:text-accent transition-colors duration-300 mb-10"
          >
            <span>rodas.layla@gmail.com</span>
            <svg className="w-6 h-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          
          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/laylarodas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/laylarodas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              GitHub ↗
            </a>
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent transition-colors duration-200 font-mono text-sm"
            >
              {t('nav.cv')} ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
