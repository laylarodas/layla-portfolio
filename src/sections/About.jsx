import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'

function About() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)

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
    <section id="about" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('about.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('about.title')}
          </h2>
        </div>
        
        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Text */}
          <div className="lg:col-span-3 space-y-6 scroll-animate" style={{ transitionDelay: '100ms' }}>
            <p className="text-text-secondary text-lg leading-relaxed">
              {t('about.p1').split('<location>')[0]}
              <span className="text-text-primary">{t('about.locationValue')}</span>
              {t('about.p1').split('</location>')[1]}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('about.p2').split('<highlight>')[0]}
              <span className="text-text-primary">{t('about.p2').match(/<highlight>(.*?)<\/highlight>/)?.[1]}</span>
              {t('about.p2').split('</highlight>')[1]}
            </p>
            <p className="text-text-secondary leading-relaxed">
              {t('about.p3')}
            </p>
          </div>
          
          {/* Details card */}
          <div className="lg:col-span-2 scroll-animate" style={{ transitionDelay: '200ms' }}>
            <div className="card p-6 space-y-6">
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{t('about.location')}</p>
                <p className="text-text-primary">{t('about.locationValue')}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{t('about.education')}</p>
                <p className="text-text-primary">{t('about.educationValue')}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{t('about.languages')}</p>
                <p className="text-text-primary">{t('about.languagesValue')}</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">{t('about.status')}</p>
                <p className="text-accent">{t('about.statusValue')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
