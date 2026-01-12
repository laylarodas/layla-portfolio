import SectionTitle from '../components/SectionTitle'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

function Projects() {
  return (
    <section id="projects" className="py-20 md:py-24 bg-light-100 dark:bg-dark-800/50">
      <div className="section-container">
        <SectionTitle
          title="Proyectos"
          subtitle="Una selección de proyectos que muestran mi trabajo en backend, mobile y full-stack."
        />
        
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 75}ms` }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
