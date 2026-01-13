import { useTranslation } from '../context/LanguageContext'

function ProjectCard({ project }) {
  const { t } = useTranslation()
  const { translationKey, stack, image, githubUrl, demoUrl } = project
  
  // Get translated content
  const title = t(`projectsData.${translationKey}.title`)
  const description = t(`projectsData.${translationKey}.description`)
  const features = t(`projectsData.${translationKey}.features`)
  
  return (
    <article className="group card overflow-hidden flex flex-col h-full">
      {/* Image */}
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
        {/* Title */}
        <h3 className="text-lg font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Features */}
        <ul className="space-y-2 mb-5">
          {features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-5 mt-auto">
          {stack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-mono text-text-muted bg-surface-700/60 rounded border border-surface-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-4 pt-4 border-t border-surface-600/30">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            {t('projects.code')}
          </a>
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-text-muted hover:text-accent transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              {t('projects.demo')}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
