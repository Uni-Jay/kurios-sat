
import { Menu, X } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface HeaderProps {
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Header({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) {
  const close = () => setMobileMenuOpen(false)

  return (
    <header className="header">
      <div className="header-container">
        <NavLink to="/" className="logo-section" onClick={close}>
          <img src="/kurios_sat.jpeg" alt="Kurios Sat Logo" className="logo-image" />
          <div className="logo-text">
            <span>Kurios Sat</span>
            <p className="tagline">ENDLESS POSSIBILITIES</p>
          </div>
        </NavLink>

        <button
          className={`mobile-menu-btn ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={`nav ${mobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
            <li><NavLink to="/about" onClick={close}>About Us</NavLink></li>
            <li><NavLink to="/services" onClick={close}>Services</NavLink></li>
            <li><NavLink to="/team" onClick={close}>Our Team</NavLink></li>
            <li>
              <NavLink to="/contact" onClick={close} className="nav-cta">
                Contact Us
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
