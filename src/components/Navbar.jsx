import { useState, useEffect, useRef } from 'react'
import { useTranslation } from '../context/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'
import ResumeDropdown from './ResumeDropdown'
import ResumeMenuPanel from './ResumeMenuPanel'

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileResumeOpen, setIsMobileResumeOpen] = useState(false)
  const mobileResumeButtonRef = useRef(null)
  const [activeSection, setActiveSection] = useState('')
  const { t } = useTranslation()
  const navRef = useRef(null)

  const navLinks = [
    { name: t('nav.home'), href: '#hero', id: 'hero' },
    { name: t('nav.about'), href: '#about', id: 'about' },
    { name: t('nav.projects'), href: '#projects', id: 'projects' },
    { name: t('nav.experience'), href: '#experience', id: 'experience' },
    { name: t('nav.skills'), href: '#skills', id: 'skills' },
    { name: t('nav.events'), href: '#events', id: 'events' },
    { name: t('nav.contact'), href: '#contact', id: 'contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        setIsMobileResumeOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'skills', 'events', 'contact']

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150

      for (const id of sections) {
        const element = document.getElementById(id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id)
            return
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection('hero')
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled || isMobileMenuOpen
          ? 'bg-surface-900/95 backdrop-blur-md border-b border-surface-700/50'
          : 'bg-transparent'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="group flex items-center gap-2">
            <span className="text-accent font-mono text-lg font-bold group-hover:text-accent-light transition-colors">
              LR
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-accent bg-accent/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-700/50'
                }`}
              >
                {link.name}
              </a>
            ))}
            <ResumeDropdown />
            <div className="ml-2">
              <LanguageSwitcher />
            </div>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-text-muted hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 bg-surface-900/95 backdrop-blur-md ${
            isMobileMenuOpen ? 'max-h-[52rem] pb-4 overflow-y-auto' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col gap-1 pt-2 border-t border-surface-700/50">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeSection === link.id
                    ? 'text-accent bg-accent/10'
                    : 'text-text-muted hover:text-text-primary hover:bg-surface-700/50'
                }`}
              >
                {link.name}
              </a>
            ))}

            <button
              ref={mobileResumeButtonRef}
              type="button"
              onClick={() => setIsMobileResumeOpen(!isMobileResumeOpen)}
              className="px-4 py-2 text-sm text-accent text-left flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 rounded-lg"
              aria-haspopup="menu"
              aria-expanded={isMobileResumeOpen}
              aria-controls="mobile-resume-menu"
            >
              {t('nav.resume')}
              <svg
                className={`w-3.5 h-3.5 transition-transform ${isMobileResumeOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isMobileResumeOpen && (
              <ResumeMenuPanel
                id="mobile-resume-menu"
                isOpen={isMobileResumeOpen}
                onClose={() => setIsMobileResumeOpen(false)}
                onItemActivate={() => {
                  setIsMobileMenuOpen(false)
                  setIsMobileResumeOpen(false)
                }}
                buttonRef={mobileResumeButtonRef}
                variant="mobile"
                className="mx-4 mb-2 py-1 bg-surface-800 border border-surface-600/50 rounded-lg"
              />
            )}

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
