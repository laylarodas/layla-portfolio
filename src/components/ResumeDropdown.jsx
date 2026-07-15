import { useEffect, useRef, useState, useId } from 'react'
import { useTranslation } from '../context/LanguageContext'
import ResumeMenuPanel from './ResumeMenuPanel'

function ResumeDropdown() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  const buttonRef = useRef(null)
  const menuId = useId()

  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen((open) => !open)
  }

  return (
    <div ref={containerRef} className="relative ml-2">
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        className="flex items-center gap-1.5 px-3 py-2 text-sm text-accent border border-accent/30 rounded-lg hover:bg-accent/10 hover:border-accent/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
      >
        {t('nav.resume')}
        <svg
          className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        className={`absolute top-full right-0 z-50 w-56 origin-top transition-all duration-200 ${
          isOpen
            ? 'opacity-100 scale-100 pointer-events-auto'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        <ResumeMenuPanel
          id={menuId}
          isOpen={isOpen}
          onClose={closeMenu}
          onItemActivate={closeMenu}
          buttonRef={buttonRef}
          variant="dropdown"
          className="py-1 bg-surface-800 border border-surface-600/50 rounded-lg shadow-xl"
        />
      </div>
    </div>
  )
}

export default ResumeDropdown
