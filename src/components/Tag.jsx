function Tag({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-light-100 dark:bg-dark-700 text-gray-600 dark:text-gray-400 border-light-200 dark:border-dark-600',
    primary: 'bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 border-accent-200 dark:border-accent-800/30',
    success: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/30',
    warning: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800/30',
  }
  
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

export default Tag
