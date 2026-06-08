import { Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Kurios Sat</h4>
            <p>Enterprise technology partner delivering innovative solutions in web development, software engineering, AI automation, and professional training.</p>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61583783820677" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="https://www.instagram.com/kurios_sat/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="mailto:kurios.sat@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
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
          <div className="footer-bottom-social">
            <a href="https://www.facebook.com/profile.php?id=61583783820677" target="_blank" rel="noopener noreferrer" aria-label="Facebook">Facebook</a>
            <span>·</span>
            <a href="https://www.instagram.com/kurios_sat/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">@kurios_sat</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
