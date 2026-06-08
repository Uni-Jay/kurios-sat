import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Transform Your Business with <span>Intelligent Technology</span></h1>
          <p>We deliver cutting-edge technology solutions, AI-powered automation, and strategic digital transformation to elevate your enterprise and drive innovation forward</p>
          <Link to="/services" className="cta-button">
            Explore Our Services <ArrowRight size={20} />
          </Link>
        </div>
        <div className="hero-visual">
          <div className="accent-shape accent-1"></div>
          <div className="accent-shape accent-2"></div>
          <div className="accent-shape accent-3"></div>
        </div>
      </div>
    </section>
  )
}
