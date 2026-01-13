import { Link } from 'react-router-dom'
import { useTranslation } from '../context/LanguageContext'

function NotFound() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Glitch effect 404 */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent via-purple-500 to-accent leading-none select-none animate-pulse">
            {t('notFound.title')}
          </h1>
          <div className="absolute inset-0 text-[150px] md:text-[200px] font-bold text-accent/20 leading-none select-none blur-xl">
            404
          </div>
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-4">
          {t('notFound.subtitle')}
        </h2>
        <p className="text-text-muted mb-8 leading-relaxed">
          {t('notFound.message')}
        </p>

        {/* Decorative code block */}
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-4 mb-8 text-left font-mono text-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
          </div>
          <code className="text-text-muted">
            <span className="text-purple-400">const</span>{' '}
            <span className="text-cyan-400">page</span>{' '}
            <span className="text-text-muted">=</span>{' '}
            <span className="text-red-400">null</span>
            <span className="text-text-muted">;</span>
            <br />
            <span className="text-purple-400">if</span>{' '}
            <span className="text-text-muted">(</span>
            <span className="text-cyan-400">!page</span>
            <span className="text-text-muted">)</span>{' '}
            <span className="text-text-muted">{'{'}</span>
            <br />
            <span className="text-text-muted pl-4">{'  '}</span>
            <span className="text-yellow-400">console</span>
            <span className="text-text-muted">.</span>
            <span className="text-cyan-400">log</span>
            <span className="text-text-muted">(</span>
            <span className="text-green-400">"🤔 Hmm..."</span>
            <span className="text-text-muted">);</span>
            <br />
            <span className="text-text-muted">{'}'}</span>
          </code>
        </div>

        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          {t('notFound.backHome')}
        </Link>
      </div>
    </div>
  )
}

export default NotFound
