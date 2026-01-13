import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../context/LanguageContext'

function Contact() {
  const { t, language } = useTranslation()
  const sectionRef = useRef(null)
  const cvUrl = `/cv-${language}.pdf`
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle, sending, success, error

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.scroll-animate')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.nameRequired')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid')
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.form.errors.messageRequired')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setStatus('sending')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '67523973-cca3-4b3a-b846-59cc5e606a91',
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Portfolio Contact: ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        setStatus('error')
        setTimeout(() => setStatus('idle'), 5000)
      }
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative" ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{t('contact.tag')}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            {t('contact.title')}
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div className="scroll-animate" style={{ transitionDelay: '100ms' }}>
            <p className="text-text-secondary leading-relaxed mb-8">
              {t('contact.description')}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-text-muted mb-2">
                  {t('contact.form.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.form.namePlaceholder')}
                  className={`w-full px-4 py-3 bg-surface-800 border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none transition-colors ${
                    errors.name 
                      ? 'border-red-400/50 focus:border-red-400' 
                      : 'border-surface-600/50 focus:border-accent/50'
                  }`}
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-400">{errors.name}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-text-muted mb-2">
                  {t('contact.form.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.form.emailPlaceholder')}
                  className={`w-full px-4 py-3 bg-surface-800 border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none transition-colors ${
                    errors.email 
                      ? 'border-red-400/50 focus:border-red-400' 
                      : 'border-surface-600/50 focus:border-accent/50'
                  }`}
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-text-muted mb-2">
                  {t('contact.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t('contact.form.messagePlaceholder')}
                  className={`w-full px-4 py-3 bg-surface-800 border rounded-lg text-text-primary placeholder:text-text-muted/50 focus:outline-none transition-colors resize-none ${
                    errors.message 
                      ? 'border-red-400/50 focus:border-red-400' 
                      : 'border-surface-600/50 focus:border-accent/50'
                  }`}
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-400">{errors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full px-6 py-3 bg-accent/10 hover:bg-accent/20 text-accent font-medium rounded-lg border border-accent/30 hover:border-accent/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
              </button>
              
              {/* Status messages */}
              {status === 'success' && (
                <p className="text-sm text-green-400 text-center">
                  {t('contact.form.success')}
                </p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400 text-center">
                  {t('contact.form.error')}
                </p>
              )}
            </form>
          </div>
          
          {/* Contact info */}
          <div className="scroll-animate" style={{ transitionDelay: '200ms' }}>
            <p className="text-text-muted mb-4">
              {t('contact.or')}
            </p>
            
            {/* Email CTA */}
            <a
              href="mailto:rodas.layla@gmail.com"
              className="group inline-flex items-center gap-3 text-xl md:text-2xl font-semibold text-text-primary hover:text-accent transition-colors duration-300 mb-10"
            >
              <span>rodas.layla@gmail.com</span>
              <svg className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            
            {/* Links */}
            <div className="flex flex-col gap-4">
              <a
                href="https://www.linkedin.com/in/laylarodas/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="font-mono text-sm">LinkedIn</span>
              </a>
              <a
                href="https://github.com/laylarodas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="font-mono text-sm">GitHub</span>
              </a>
              <a
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-text-muted hover:text-accent transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span className="font-mono text-sm">{t('nav.cv')}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
