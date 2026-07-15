import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import EasterEgg from './components/EasterEgg'
import SEO from './components/SEO'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Certifications from './sections/Certifications'
import Events from './sections/Events'
import Contact from './sections/Contact'
import NotFound from './pages/NotFound'

function HomePage() {
  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Certifications />
        <Events />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <EasterEgg />
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
