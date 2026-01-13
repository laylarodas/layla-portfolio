import { useTranslation } from '../context/LanguageContext'

function LanguageSwitcher() {
  const { language, toggleLanguage } = useTranslation()

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1 px-2 py-1 text-sm font-mono rounded-lg hover:bg-surface-700/50 transition-colors duration-200"
      aria-label="Toggle language"
    >
      <span className={language === 'es' ? 'text-accent' : 'text-text-muted'}>
        ES
      </span>
      <span className="text-surface-500">/</span>
      <span className={language === 'en' ? 'text-accent' : 'text-text-muted'}>
        EN
      </span>
    </button>
  )
}

export default LanguageSwitcher
