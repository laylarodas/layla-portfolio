import { useEffect, useRef } from 'react'

function About() {
  const sectionRef = useRef(null)

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

  return (
    <section id="about" className="py-24 md:py-32 relative" ref={sectionRef}>
      {/* Background accent */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/3 rounded-full blur-3xl pointer-events-none" />
      
      <div className="section-container relative z-10">
        {/* Section header */}
        <div className="mb-16 scroll-animate">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-accent font-mono text-sm">{'<sobre-mi>'}</span>
            <div className="h-px flex-1 bg-gradient-to-r from-accent/30 to-transparent max-w-32" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
            Sobre Mí
          </h2>
        </div>
        
        {/* Content */}
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Text */}
          <div className="lg:col-span-3 space-y-6 scroll-animate" style={{ transitionDelay: '100ms' }}>
            <p className="text-text-secondary text-lg leading-relaxed">
              Soy desarrolladora junior de <span className="text-text-primary">Palma de Mallorca, España</span>, 
              actualmente cursando el segundo año de DAM (Desarrollo de Aplicaciones Multiplataforma).
            </p>
            <p className="text-text-secondary leading-relaxed">
              Mi enfoque principal es el <span className="text-text-primary">desarrollo backend</span>: 
              construir APIs, trabajar con bases de datos y crear aplicaciones orientadas a datos. 
              Abordo los problemas de forma metódica: primero entender, luego planificar la arquitectura, 
              y después escribir código limpio.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Además del backend, tengo experiencia en desarrollo Android y proyectos full-stack. 
              Busco un entorno donde pueda crecer técnicamente mientras contribuyo a proyectos con impacto.
            </p>
          </div>
          
          {/* Details card */}
          <div className="lg:col-span-2 scroll-animate" style={{ transitionDelay: '200ms' }}>
            <div className="card p-6 space-y-6">
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Ubicación</p>
                <p className="text-text-primary">Palma de Mallorca, España</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Formación</p>
                <p className="text-text-primary">DAM · 2º Año</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Idiomas</p>
                <p className="text-text-primary">Español (nativo), Inglés (B2)</p>
              </div>
              <div>
                <p className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Estado</p>
                <p className="text-accent">Abierta a oportunidades</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
