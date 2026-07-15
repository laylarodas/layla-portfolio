import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'
import SectionAtmosphere from '../components/SectionAtmosphere'

const roleKeys = ['ebal', 'upwork', 'rovedra']

const companyLogos = {
  ebal: '/logos/ebal.svg',
  rovedra: '/logos/rovedra.svg',
}

function Experience() {
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
    <section id="experience" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <SectionAtmosphere variant="experience" />
      <div className="section-container relative z-10">
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('experience.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('experience.title')}
          </h2>
        </div>

        <div className="space-y-8">
          {roleKeys.map((key, index) => {
            const bullets = t(`experience.roles.${key}.bullets`)
            const bulletList = Array.isArray(bullets) ? bullets : []
            const logo = companyLogos[key]

            return (
              <article
                key={key}
                className="scroll-animate card p-6 md:p-8"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      {t(`experience.roles.${key}.title`)}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {logo && (
                        <img
                          src={logo}
                          alt=""
                          className="w-6 h-6 rounded object-contain bg-surface-700/40 p-0.5"
                          loading="lazy"
                        />
                      )}
                      <p className="text-accent text-sm font-mono">
                        {t(`experience.roles.${key}.company`)}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-text-muted bg-surface-700/50 px-2 py-1 rounded self-start">
                    {t(`experience.roles.${key}.date`)}
                  </span>
                </div>
                <p className="text-text-muted text-sm mb-4">
                  {t(`experience.roles.${key}.type`)}
                </p>
                <ul className="space-y-2">
                  {bulletList.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Experience
