import { Phone, MapPin, Mail, Send, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    setStatus('sending')
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, { publicKey: PUBLIC_KEY })
      setStatus('success')
      formRef.current.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="contact">
      <div className="contact-container">
        <p className="section-label">Get In Touch</p>
        <h2>Let's Start Your Transformation</h2>
        <p className="section-subtitle">Discuss your project goals and let us craft the perfect solution for your business</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-block">
              <div className="info-icon">
                <Phone size={24} />
              </div>
              <div>
                <h4>Call Us</h4>
                <p><a href="tel:+2348170020431">+234 817 002 0431</a></p>
                <p><a href="tel:+2348060886447">+234 806 088 6447</a></p>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon">
                <MapPin size={24} />
              </div>
              <div>
                <h4>Our Location</h4>
                <p>51, Ayangburen Road</p>
                <p>Opposite Ayangburen Palace</p>
                <p>Top Floor, Ikorodu, Lagos</p>
                <p style={{ fontSize: '0.85rem', marginTop: '0.5rem' }}>Same building: KFC & Samsung</p>
              </div>
            </div>

            <div className="info-block">
              <div className="info-icon">
                <Mail size={24} />
              </div>
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:kurios.sat@gmail.com">info@kurios-sat.com</a></p>
              </div>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            {/* Hidden field — EmailJS template uses {{to_email}} to deliver to your inbox */}
            <input type="hidden" name="to_email" value="kurios.sat@gmail.com" />
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                name="from_name"
                placeholder="Your Full Name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="reply_to"
                placeholder="your@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us about your project or inquiry"
                rows={5}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={status === 'sending'}>
              {status === 'sending'
                ? <><Loader size={18} className="spin" /> Sending…</>
                : <> Send Message <Send size={18} /></>}
            </button>

            {status === 'success' && (
              <div className="form-feedback success">
                <CheckCircle size={18} />
                Message sent! We'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-feedback error">
                <AlertCircle size={18} />
                Something went wrong. Please call or email us directly.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
