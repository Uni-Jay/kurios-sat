
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import Careers from './components/Careers'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <BrowserRouter>
      <div className="app">
        <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/careers" element={<main className="careers-page" style={{ ['--brand-accent' as string]: '#4c8f22', padding: '110px 20px 40px' }}><Careers brand="KS" title="Careers at Kurios SAT" intro="Build software, support clients and train the next generation of tech talent with us. See our open roles below." /></main>} />
        </Routes>
        <Footer />
        <Chatbot />
      </div>
    </BrowserRouter>
  )
}

export default App
