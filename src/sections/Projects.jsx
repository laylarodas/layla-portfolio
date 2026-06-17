import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LanguageContext'
import ProjectCard from '../components/ProjectCard'
import { featuredProjects, secondaryProjects } from '../data/projects'

const INITIAL_MOBILE_COUNT = 2

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
  const [showAllFeatured, setShowAllFeatured] = useState(false)
  const [showSecondary, setShowSecondary] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

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
  }, [showAllFeatured, showSecondary])

  const visibleFeatured = isMobile && !showAllFeatured
    ? featuredProjects.slice(0, INITIAL_MOBILE_COUNT)
    : featuredProjects

  const visibleSecondary = isMobile && !showSecondary
    ? []
    : secondaryProjects

  const hasMoreFeatured = featuredProjects.length > INITIAL_MOBILE_COUNT

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

        <ProjectGrid projects={visibleFeatured} />

        {isMobile && hasMoreFeatured && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => setShowAllFeatured(!showAllFeatured)}
              className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
            >
              {showAllFeatured ? (
                <>
                  <span>{t('projects.showLess')}</span>
                  <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  <span>{t('projects.showMore')} ({featuredProjects.length - INITIAL_MOBILE_COUNT})</span>
                  <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}

        <div className="mt-24 scroll-animate">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-accent font-mono text-sm">{t('projects.secondaryTag')}</span>
              <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
              {t('projects.secondaryTitle')}
            </h3>
          </div>

          {visibleSecondary.length > 0 ? (
            <ProjectGrid projects={visibleSecondary} startIndex={featuredProjects.length} />
          ) : (
            <div className="flex justify-center">
              <button
                onClick={() => setShowSecondary(true)}
                className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                <span>{t('projects.showSecondary')} ({secondaryProjects.length})</span>
                <svg className="w-4 h-4 transition-transform group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}

          {isMobile && showSecondary && (
            <div className="mt-10 flex justify-center">
              <button
                onClick={() => setShowSecondary(false)}
                className="group flex items-center gap-2 px-6 py-3 text-sm font-medium text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-300"
              >
                <span>{t('projects.hideSecondary')}</span>
                <svg className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects
