import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'
import { certifications, certificationLinks } from '../data/certifications'

function Certifications() {
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
    <section id="certifications" className="py-24 md:py-32 relative border-t border-surface-700/30" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-12 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('certifications.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('certifications.title')}
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 scroll-animate" style={{ transitionDelay: '100ms' }}>
          {certifications.map(({ key, status }) => {
            const credentialUrl = certificationLinks[key]

            return (
              <article key={key} className="card p-5 flex flex-col h-full">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="text-text-primary font-semibold text-sm md:text-base leading-snug">
                    {t(`certifications.items.${key}.title`)}
                  </h3>
                  <span
                    className={`text-xs font-mono px-2 py-1 rounded shrink-0 ${
                      status === 'inProgress'
                        ? 'text-accent bg-accent/10 border border-accent/30'
                        : 'text-text-muted bg-surface-700/50'
                    }`}
                  >
                    {t(`certifications.status.${status}`)}
                  </span>
                </div>

                {t(`certifications.items.${key}.provider`).trim() && (
                  <p className="text-accent text-xs font-mono mb-4">
                    {t(`certifications.items.${key}.provider`)}
                  </p>
                )}

                {credentialUrl && (
                  <a
                    href={credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-1.5 self-start text-xs font-mono text-accent hover:underline"
                  >
                    {t('certifications.viewCredential')}
                  </a>
                )}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Certifications
