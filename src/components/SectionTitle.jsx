function SectionTitle({ title, subtitle, className = '' }) {
  return (
    <div className={`text-center mb-12 md:mb-16 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-white mb-3 tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

export default SectionTitle
