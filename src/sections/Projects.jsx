import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import { featuredProjects, moreProjectGroups } from '../data/projects'

function ProjectGrid({ projects, startIndex = 0 }) {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="scroll-animate"
          style={{ transitionDelay: `${(startIndex + index) * 100}ms` }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  )
}

function Projects() {
  const { t } = useTranslation()
  const sectionRef = useRef(null)
  const [showMore, setShowMore] = useState(false)

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
  }, [showMore])

  let projectIndex = featuredProjects.length

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
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
        </div>

        <ProjectGrid projects={featuredProjects} />

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setShowMore(!showMore)}
            className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
          >
            <span>{showMore ? t('projects.showLess') : t('projects.viewMore')}</span>
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showMore ? 'group-hover:-translate-y-0.5 rotate-180' : 'group-hover:translate-y-0.5'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {showMore && (
          <div className="mt-16 space-y-16">
            {moreProjectGroups.map((group) => {
              const startIndex = projectIndex
              projectIndex += group.projects.length

              return (
                <div key={group.categoryKey} className="scroll-animate">
                  <h3 className="text-lg font-mono text-text-muted uppercase tracking-wider mb-8">
                    {t(group.titleKey)}
                  </h3>
                  <ProjectGrid projects={group.projects} startIndex={startIndex} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
