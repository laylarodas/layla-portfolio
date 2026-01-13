import { useState, useEffect } from 'react'
import { useTranslation } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  const navLinks = [
    { name: t('nav.projects'), href: '#projects' },
    { name: t('nav.skills'), href: '#skills' },
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.contact'), href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-surface-900/95 backdrop-blur-md border-b border-surface-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#hero"
            className="group flex items-center gap-2"
          >
            <span className="text-accent font-mono text-lg font-bold group-hover:text-accent-light transition-colors">
              LR
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-4 py-2 text-sm text-text-muted hover:text-text-primary rounded-lg hover:bg-surface-700/50 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-200"
            >
              {t('nav.cv')}
            </a>
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 bg-surface-900/95 backdrop-blur-md ${
            isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-surface-700/50 bg-surface-900">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 text-sm text-text-muted hover:text-text-primary hover:bg-surface-700/50 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-accent"
            >
              {t('nav.cv')}
            </a>
            <div className="px-4 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
