import Button from '../components/Button'

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-accent-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-400/5 rounded-full blur-3xl" />
      </div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/30 mb-8 animate-fade-in">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-emerald-700 dark:text-emerald-400">Buscando prácticas / primer empleo</span>
          </div>
          
          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight animate-fade-in animate-delay-100">
            Layla Rodas
          </h1>
          
          {/* Headline */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-4 animate-fade-in animate-delay-200">
            Junior Backend Developer | Java · Spring Boot · Node.js · Android
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 animate-fade-in animate-delay-300">
            {['Java', 'Spring Boot', 'Node.js', 'SQL', 'Android'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-sm font-mono text-gray-600 dark:text-gray-400 bg-light-100 dark:bg-dark-700 rounded-md border border-light-200 dark:border-dark-600"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {/* Summary */}
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in animate-delay-400">
            Desarrolladora Junior (DAM) con enfoque en backend. Desarrollo aplicaciones orientadas a datos y APIs, 
            con experiencia en proyectos full-stack y mobile. Busco un entorno donde pueda aprender, 
            aportar y consolidar buenas prácticas de desarrollo.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-3 animate-fade-in animate-delay-500">
            <Button
              href="https://github.com/laylarodas"
              external
              variant="secondary"
              size="lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </Button>
            <Button
              href="https://www.linkedin.com/in/laylarodas/"
              external
              variant="secondary"
              size="lg"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Button>
            <Button
              href="/cv.pdf"
              external
              variant="ghost"
              size="lg"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Descargar CV
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="#projects"
            className="flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
            aria-label="Scroll to projects"
          >
            <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
