
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo-section">
          <img src="/kurios_sat.jpeg" alt="Kurios Sat Logo" className="logo-image" />
          <div className="logo-text">
            <span>Kurios Sat</span>
            <p className="tagline">ENDLESS POSSIBILITIES</p>
          </div>
        </NavLink>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</NavLink></li>
            <li><NavLink to="/services" onClick={() => setMobileMenuOpen(false)}>Services</NavLink></li>
            <li><NavLink to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
