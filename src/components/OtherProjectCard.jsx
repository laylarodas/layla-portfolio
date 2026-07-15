import { useTranslation } from '../context/LanguageContext'

function OtherProjectCard({ project }) {
  const { t } = useTranslation()
  const { translationKey, categoryKey, stack, githubUrl, projectUrl, detailUrl, ctaKey } = project

  const title = t(`projectsData.${translationKey}.title`)
  const category = t(`projectsData.${categoryKey}.category`)
  const description = t(`projectsData.${translationKey}.description`)
  const ctaUrl = githubUrl || projectUrl || detailUrl

  return (
    <article className="card p-4 md:p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-mono text-accent uppercase tracking-wider mb-1.5">
          {category}
        </p>
        <h3 className="text-base font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-muted text-sm leading-relaxed mb-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {stack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono text-text-muted bg-surface-700/60 rounded border border-surface-600/30"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {ctaUrl && (
        <a
          href={ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 shrink-0 self-start text-xs font-mono text-accent border border-accent/30 rounded-lg px-3 py-1.5 hover:bg-accent/10 transition-colors duration-200"
        >
          {t(`projects.${ctaKey}`)}
        </a>
      )}
    </article>
  )
}

export default OtherProjectCard
