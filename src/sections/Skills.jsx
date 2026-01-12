import SectionTitle from '../components/SectionTitle'

const skillCategories = [
  {
    name: 'Backend',
    skills: ['Java', 'Spring Boot', 'Node.js', 'Express', 'REST APIs', 'JPA/Hibernate'],
  },
  {
    name: 'Frontend',
    skills: ['React', 'JavaScript', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS'],
  },
  {
    name: 'Mobile',
    skills: ['Android', 'Java', 'Kotlin', 'MVVM', 'Retrofit', 'Room'],
  },
  {
    name: 'Bases de datos',
    skills: ['MySQL', 'MongoDB', 'H2', 'Mongoose', 'SQL'],
  },
  {
    name: 'Herramientas',
    skills: ['Git', 'GitHub', 'Maven', 'Gradle', 'Postman', 'Vite'],
  },
]

function Skills() {
  return (
    <section id="skills" className="py-20 md:py-24">
      <div className="section-container">
        <SectionTitle
          title="Tecnologías"
          subtitle="Stack técnico con el que trabajo habitualmente."
        />
        
        <div className="max-w-4xl mx-auto space-y-8">
          {skillCategories.map((category, index) => (
            <div
              key={category.name}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-light-100 dark:bg-dark-700 text-gray-700 dark:text-gray-300 rounded-lg border border-light-200 dark:border-dark-600 hover:border-accent-400/50 hover:text-accent-700 dark:hover:text-accent-400 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Learning note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Actualmente aprendiendo: <span className="text-gray-700 dark:text-gray-300">AWS</span>, <span className="text-gray-700 dark:text-gray-300">Machine Learning</span>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Skills
