import { useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import OtherProjectCard from '../components/OtherProjectCard'
import SectionAtmosphere from '../components/SectionAtmosphere'
import { featuredProjects } from '../data/projects'
import { otherProjects } from '../data/otherProjects'

function Projects() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      <SectionAtmosphere variant="projects" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('projects.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('projects.title')}
          </h2>
          <p className="mt-4 text-text-secondary max-w-3xl leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-animate"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-text-muted max-w-3xl scroll-animate">
          {t('projects.privateNote')}
        </p>

        <div className="mt-20 pt-12 border-t border-surface-700/30 scroll-animate">
          <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-6">
            {t('projects.otherTitle')}
          </h3>
          <div className="space-y-4">
            {otherProjects.map((project, index) => (
              <div key={project.id} style={{ transitionDelay: `${index * 80}ms` }}>
                <OtherProjectCard project={project} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
