import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import heroVideo from '../assets/video/kuriosvideo.mp4'


export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const unmute = () => {
      const video = videoRef.current
      if (video) {
        video.muted = false
        video.play().catch(() => {})
      }
      window.removeEventListener('pointerdown', unmute)
      window.removeEventListener('keydown', unmute)
      window.removeEventListener('scroll', unmute)
    }
    window.addEventListener('pointerdown', unmute)
    window.addEventListener('keydown', unmute)
    window.addEventListener('scroll', unmute)
    return () => {
      window.removeEventListener('pointerdown', unmute)
      window.removeEventListener('keydown', unmute)
      window.removeEventListener('scroll', unmute)
    }
  }, [])

  return (
    <section className="hero">
      <video
        ref={videoRef}
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
