import Tag from './Tag'
import Button from './Button'

function ProjectCard({ project }) {
  const { title, description, stack, features, image, githubUrl, demoUrl, status } = project
  
  const statusVariant = status === 'completed' ? 'success' : 'warning'
  const statusText = status === 'completed' ? 'Completed' : 'In Progress'
  
  return (
    <article className="group glass-card overflow-hidden hover-lift flex flex-col h-full">
      {/* Image */}
      {image && (
        <div className="relative aspect-[3/2] overflow-hidden border-b border-light-200 dark:border-dark-600">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}
      
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
            {title}
          </h3>
          <Tag variant={statusVariant} className="flex-shrink-0">{statusText}</Tag>
        </div>
        
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Features */}
        <ul className="space-y-1.5 mb-4">
          {features.slice(0, 2).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-500">
              <span className="w-1 h-1 rounded-full bg-accent-500 mt-2 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        {/* Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {stack.slice(0, 4).map((tech) => (
            <Tag key={tech} variant="default" className="text-xs">{tech}</Tag>
          ))}
          {stack.length > 4 && (
            <Tag variant="default" className="text-xs">+{stack.length - 4}</Tag>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-light-200 dark:border-dark-600">
          <Button
            href={githubUrl}
            external
            variant="ghost"
            size="sm"
            className="flex-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Code
          </Button>
          {demoUrl && (
            <Button
              href={demoUrl}
              external
              variant="secondary"
              size="sm"
              className="flex-1"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}

export default ProjectCard
