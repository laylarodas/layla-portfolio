import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'

const skillCategories = [
  {
    nameKey: 'skills.categories.backend',
    icon: '{ }',
    skills: [
      { name: 'Python' },
      { name: 'Java' },
      { name: 'PHP' },
      { name: 'Spring Boot' },
      { name: 'REST APIs' },
      { name: 'Playwright' },
    ],
  },
  {
    nameKey: 'skills.categories.dataIntegration',
    icon: '◈',
    skills: [
      { name: 'Power BI', highlight: true },
      { name: 'SQL' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'JSON' },
      { name: 'ERP Integrations' },
      { name: 'Dolibarr' },
      { name: 'IMAP' },
      { name: 'OCR' },
    ],
  },
  {
    nameKey: 'skills.categories.architecture',
    icon: '⬡',
    skills: [
      { name: 'Layered Architecture' },
      { name: 'DTOs' },
      { name: 'Validation' },
      { name: 'Exception Handling' },
      { name: 'JWT' },
      { name: 'HMAC' },
      { name: 'Idempotency' },
    ],
  },
  {
    nameKey: 'skills.categories.tools',
    icon: '⚙',
    skills: [
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Docker' },
      { name: 'Postman' },
      { name: 'Maven' },
    ],
  },
]

function Skills() {
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
    <section id="skills" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="section-container">
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('skills.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('skills.title')}
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <div
              key={category.nameKey}
              className="scroll-animate"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-accent font-mono text-lg">{category.icon}</span>
                <h3 className="text-sm font-mono text-text-muted uppercase tracking-wider">
                  {t(category.nameKey)}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={
                      skill.highlight
                        ? 'px-2.5 py-1 text-xs font-mono text-accent bg-accent/10 rounded border border-accent/40'
                        : 'tech-badge'
                    }
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-8 border-t border-surface-700/30 scroll-animate" style={{ transitionDelay: '500ms' }}>
          <p className="text-sm text-text-muted">
            <span className="text-accent font-mono mr-2">{'//'}</span>
            {t('skills.learning')}{' '}
            <span className="text-text-secondary">{t('skills.learningList')}</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
