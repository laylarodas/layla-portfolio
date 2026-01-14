import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import EasterEgg from './components/EasterEgg'
import SEO from './components/SEO'
import Hero from './sections/Hero'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import About from './sections/About'
import Contact from './sections/Contact'
import NotFound from './pages/NotFound'

function HomePage() {
  return (
    <div className="min-h-screen bg-surface-900 overflow-x-hidden">
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <About />
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
