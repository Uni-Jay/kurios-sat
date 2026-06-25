import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroVideo from '../assets/video/kuriosvideo.mp4'


export default function Hero() {
  return (
    <section className="hero">
      <video
        className="hero-video"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="hero-text">
          <h1>Transform Your Business with <span>Intelligent Technology</span></h1>
          <p>We deliver cutting-edge technology solutions, AI-powered automation, and strategic digital transformation to elevate your enterprise and drive innovation forward</p>
          <Link to="/services" className="cta-button">
            Explore Our Services <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
