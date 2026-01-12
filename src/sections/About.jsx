import SectionTitle from '../components/SectionTitle'

function About() {
  return (
    <section id="about" className="py-20 md:py-24 bg-light-100 dark:bg-dark-800/50">
      <div className="section-container">
        <SectionTitle
          title="Sobre mí"
          subtitle="Un poco sobre mi trayectoria y lo que me motiva."
        />
        
        <div className="max-w-2xl mx-auto">
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              Soy <span className="text-gray-900 dark:text-white font-medium">Layla</span>, desarrolladora junior 
              de Palma de Mallorca, actualmente cursando el segundo año de DAM (Desarrollo de Aplicaciones Multiplataforma).
            </p>
            <p>
              Mi enfoque principal es el <span className="text-gray-900 dark:text-white font-medium">desarrollo backend</span> con 
              Java y Spring Boot, aunque también tengo experiencia en proyectos full-stack con Node.js y React, 
              así como en desarrollo mobile con Android.
            </p>
            <p>
              Me apasiona construir aplicaciones orientadas a datos, APIs bien estructuradas y código limpio. 
              Busco seguir creciendo en un entorno donde pueda aprender, aportar y consolidar buenas prácticas.
            </p>
          </div>
          
          {/* Quick facts */}
          <div className="mt-8 pt-8 border-t border-light-200 dark:border-dark-600">
            <ul className="grid sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-1 h-1 rounded-full bg-accent-500" />
                Palma de Mallorca, España
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-1 h-1 rounded-full bg-accent-500" />
                Estudiante de DAM (2º año)
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-1 h-1 rounded-full bg-accent-500" />
                Español (nativo), Inglés (B2)
              </li>
              <li className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <span className="w-1 h-1 rounded-full bg-accent-500" />
                Buscando prácticas / primer empleo
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
