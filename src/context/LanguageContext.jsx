import { createContext, useContext, useState, useEffect } from 'react'
import es from '../i18n/es.json'
import en from '../i18n/en.json'

const translations = { es, en }

const LanguageContext = createContext()

function getInitialLanguage() {
  // Check localStorage first
  const saved = localStorage.getItem('language')
  if (saved && translations[saved]) {
    return saved
  }
  
  // Detect browser language
  const browserLang = navigator.language.split('-')[0]
  if (translations[browserLang]) {
    return browserLang
  }
  
  // Default to English
  return 'en'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem('language', language)
    document.documentElement.lang = language
  }, [language])

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'es' ? 'en' : 'es'))
  }

  // Translation function with dot notation support
  const t = (key) => {
    const keys = key.split('.')
    let value = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    // Return key if translation not found (for debugging)
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider')
  }
  return context
}
