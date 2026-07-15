import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'
import { eventKeys, eventLinks } from '../data/events'

function Events() {
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
    <section id="events" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('events.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('events.title')}
          </h2>
          <p className="mt-6 text-text-secondary leading-relaxed max-w-3xl">
            {t('events.intro')}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 scroll-animate" style={{ transitionDelay: '100ms' }}>
          {eventKeys.map((key) => {
            const linkedinUrl = eventLinks[key]

            return (
              <article key={key} className="card p-6 flex flex-col h-full">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-text-primary font-semibold mb-1">
                      {t(`events.items.${key}.name`)}
                    </h3>
                    <p className="text-accent text-xs font-mono">
                      {t(`events.items.${key}.location`)}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-text-muted bg-surface-700/50 px-2 py-1 rounded shrink-0">
                    {t(`events.items.${key}.date`)}
                  </span>
                </div>

                <p className="text-text-muted text-sm leading-relaxed mb-6 flex-1">
                  {t(`events.items.${key}.description`)}
                </p>

                {linkedinUrl ? (
                  <a
                    href={linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 self-start text-xs font-mono text-accent border border-accent/30 rounded-lg px-3 py-1.5 hover:bg-accent/10 transition-colors duration-200"
                  >
                    {t('events.viewLinkedIn')}
                  </a>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Events
