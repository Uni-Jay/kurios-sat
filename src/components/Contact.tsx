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
                <a
                  href="https://wa.me/2348060886447?text=Hello%20Kurios%20Sat%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whatsapp-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.882a.5.5 0 0 0 .604.625l6.284-1.652A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.79 9.79 0 0 1-4.988-1.362l-.356-.212-3.732.981.996-3.635-.232-.374A9.783 9.783 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/></svg>
                  Chat on WhatsApp
                </a>
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
                <p><a href="mailto:info@kurios-sat.tech">info@kurios-sat.tech</a></p>
              </div>
            </div>
          </div>

          <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
            {/* Hidden field — EmailJS template uses {{to_email}} to deliver to your inbox */}
            <input type="hidden" name="to_email" value="info@kurios-sat.tech" />
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
