import { useTranslation } from '../context/LanguageContext'

function ProjectCard({ project }) {
  const { t } = useTranslation()
  const { translationKey, categoryKey, stack, image, caseStudyUrl, isPrivate } = project

  const title = t(`projectsData.${translationKey}.title`)
  const category = t(`projectsData.${categoryKey}.category`)
  const description = t(`projectsData.${translationKey}.description`)

  return (
    <article className="group card overflow-hidden flex flex-col h-full">
      {image && (
        <div className="relative aspect-video overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-800 via-transparent to-transparent opacity-60" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs font-mono text-accent uppercase tracking-wider mb-2">
          {category}
        </p>

        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed mb-5 line-clamp-3">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono text-text-muted bg-surface-700/60 rounded border border-surface-600/30"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-surface-600/30">
          {caseStudyUrl && (
            <a
              href={caseStudyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-accent hover:text-accent-light transition-colors duration-200"
            >
              {t('projects.viewCaseStudy')}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
          {isPrivate && (
            <span className="text-xs text-text-muted ml-auto">
              {t('projects.clientProject')}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
