import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'

const skillCategories = [
  {
    nameKey: 'skills.categories.backend',
    icon: '{ }',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs', 'JPA'],
  },
  {
    nameKey: 'skills.categories.mobile',
    icon: '📱',
    skills: ['Android', 'Kotlin', 'MVVM', 'Retrofit', 'Room'],
  },
  {
    nameKey: 'skills.categories.databases',
    icon: '◈',
    skills: ['MySQL', 'MongoDB', 'PostgreSQL', 'H2', 'SQL'],
  },
  {
    nameKey: 'skills.categories.frontend',
    icon: '</>',
    skills: ['React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    nameKey: 'skills.categories.tools',
    icon: '⚙',
    skills: ['Git', 'GitHub', 'Docker', 'Maven', 'Postman'],
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
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('skills.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('skills.title')}
          </h2>
        </div>
        
        {/* Skills grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                  <span key={skill} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Currently learning */}
        <div className="mt-20 pt-8 border-t border-surface-700/30 scroll-animate" style={{ transitionDelay: '500ms' }}>
          <p className="text-sm text-text-muted">
            <span className="text-accent font-mono mr-2">{'//'}</span>
            {t('skills.learning')}{' '}
            <span className="text-text-secondary">AWS</span>,{' '}
            <span className="text-text-secondary">Machine Learning</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
