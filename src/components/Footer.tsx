import { Heart, Mail, Zap, Share2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Kurios Sat</h4>
            <p>Enterprise technology partner delivering innovative solutions in web development, software engineering, AI automation, and professional training.</p>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><Link to="/services">Technology Solutions</Link></li>
              <li><Link to="/services">Software Development</Link></li>
              <li><Link to="/services">AI &amp; Automation</Link></li>
              <li><Link to="/services">Corporate Training</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Our Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Get In Touch</h4>
            <p><strong>Phone:</strong></p>
            <p><a href="tel:+2348170020431">+234 817 002 0431</a></p>
            <p><a href="tel:+2348060886447">+234 806 088 6447</a></p>
            <p><strong>Email:</strong></p>
            <p><a href="mailto:kurios.sat@gmail.com">info@kurios-sat.com</a></p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Kurios Sat Limited. All rights reserved.</p>
          <div className="social-links">
            <a href="#" aria-label="Follow us"><Heart size={18} /></a>
            <a href="#" aria-label="Email us"><Mail size={18} /></a>
            <a href="#" aria-label="Explore"><Zap size={18} /></a>
            <a href="#" aria-label="Share"><Share2 size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  )
}
