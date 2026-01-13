import { useTranslation } from '../context/LanguageContext'

function LanguageSwitcher() {
  const { language, toggleLanguage } = useTranslation()

  return (
    <button
      onClick={toggleLanguage}
      className="group flex items-center gap-1.5 px-2 py-1 text-sm font-mono rounded-lg hover:bg-surface-700/50 transition-all duration-200"
      aria-label="Toggle language"
    >
      <span className="relative">
        <span 
          className={`transition-all duration-300 ${
            language === 'es' 
              ? 'text-accent scale-105' 
              : 'text-text-muted group-hover:text-text-secondary'
          }`}
        >
          ES
        </span>
        <span 
          className={`absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
            language === 'es' ? 'w-full' : 'w-0'
          }`}
        />
      </span>
      
      <span className="text-surface-500">/</span>
      
      <span className="relative">
        <span 
          className={`transition-all duration-300 ${
            language === 'en' 
              ? 'text-accent scale-105' 
              : 'text-text-muted group-hover:text-text-secondary'
          }`}
        >
          EN
        </span>
        <span 
          className={`absolute -bottom-0.5 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
            language === 'en' ? 'w-full' : 'w-0'
          }`}
        />
      </span>
    </button>
  )
}

export default LanguageSwitcher
