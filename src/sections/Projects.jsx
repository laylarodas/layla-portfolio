import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

const INITIAL_MOBILE_COUNT = 3

function Projects() {
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [showAll])

  // Show all on desktop, limited on mobile unless expanded
  const visibleProjects = isMobile && !showAll 
    ? projects.slice(0, INITIAL_MOBILE_COUNT) 
    : projects

  const hasMoreProjects = projects.length > INITIAL_MOBILE_COUNT

  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('projects.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('projects.title')}
          </h2>
        </div>
        
        {/* Projects grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {visibleProjects.map((project, index) => (
            <div
              key={project.id}
              className="scroll-animate"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Show more button - only on mobile */}
        {isMobile && hasMoreProjects && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAll(!showAll)}
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
            >
              {showAll ? (
                <>
                  <span>{t('projects.showLess')}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>{t('projects.showMore')} ({projects.length - INITIAL_MOBILE_COUNT})</span>
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

export default Projects
