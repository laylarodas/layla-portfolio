import { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from '../context/LanguageContext'
import { resumeVersions } from '../data/resume'

function ResumeMenuPanel({
  id,
  isOpen,
  onClose,
  onItemActivate,
  buttonRef,
  className = '',
  variant = 'dropdown',
}) {
  const { t } = useTranslation()
  const menuRef = useRef(null)
  const itemRefs = useRef([])

  const getFocusableItems = useCallback(
    () => itemRefs.current.filter(Boolean),
    []
  )

  useEffect(() => {
    itemRefs.current = []
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const frame = requestAnimationFrame(() => {
      getFocusableItems()[0]?.focus()
    })

    return () => cancelAnimationFrame(frame)
  }, [isOpen, getFocusableItems])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        buttonRef?.current?.focus()
        return
      }

      if (!menuRef.current?.contains(event.target)) return

      const items = getFocusableItems()
      const currentIndex = items.indexOf(document.activeElement)

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const next = currentIndex < items.length - 1 ? currentIndex + 1 : 0
        items[next]?.focus()
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        const prev = currentIndex > 0 ? currentIndex - 1 : items.length - 1
        items[prev]?.focus()
      } else if (event.key === 'Home') {
        event.preventDefault()
        items[0]?.focus()
      } else if (event.key === 'End') {
        event.preventDefault()
        items[items.length - 1]?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, buttonRef, getFocusableItems])

  const actionClass =
    variant === 'mobile'
      ? 'inline-flex items-center px-3 py-2 text-xs font-mono text-text-secondary border border-surface-600/50 rounded-lg hover:text-accent hover:border-accent/30 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors duration-150'
      : 'inline-flex items-center px-2.5 py-1 text-xs font-mono text-text-secondary border border-surface-600/50 rounded hover:text-accent hover:border-accent/30 hover:bg-accent/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 transition-colors duration-150'

  let refIndex = 0

  return (
    <div
      ref={menuRef}
      id={id}
      role="menu"
      aria-label={t('nav.resume')}
      className={className}
    >
      {resumeVersions.map((version, versionIndex) => (
        <div
          key={version.id}
          role="none"
          className={`px-3 py-2.5 ${
            versionIndex < resumeVersions.length - 1 ? 'border-b border-surface-600/30' : ''
          }`}
        >
          <p className="text-xs font-medium text-text-primary mb-2 leading-snug">
            {t(version.labelKey)}
          </p>
          <div className="flex flex-wrap gap-2" role="none">
            <a
              ref={(el) => {
                const index = refIndex
                refIndex += 1
                itemRefs.current[index] = el
              }}
              role="menuitem"
              href={version.htmlHref}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isOpen ? 0 : -1}
              className={actionClass}
              onClick={() => onItemActivate?.()}
            >
              {t('resume.viewHtml')}
            </a>
            <a
              ref={(el) => {
                const index = refIndex
                refIndex += 1
                itemRefs.current[index] = el
              }}
              role="menuitem"
              href={version.pdfHref}
              download={version.pdfDownload}
              tabIndex={isOpen ? 0 : -1}
              className={actionClass}
              onClick={() => onItemActivate?.()}
            >
              {t('resume.downloadPdf')}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ResumeMenuPanel
