import { useState, useEffect, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  role: string
  category: 'training' | 'development' | 'automation'
  rating: number
  text: string
  initials: string
  color: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Adebayo Olamide',
    role: 'Frontend Developer (Kurios Sat Graduate)',
    category: 'training',
    rating: 5,
    text: 'I enrolled in the Full Stack Web Development programme with zero coding experience. Within 3 months I had built real projects, and Kurios Sat helped me land my first internship. The support doesn\'t stop after class — they genuinely care about your career.',
    initials: 'AO',
    color: '#6DB32F',
  },
  {
    id: 2,
    name: 'Chidinma Eze',
    role: 'UI/UX Designer',
    category: 'training',
    rating: 5,
    text: 'The UI/UX course was incredibly hands-on. We worked on real client projects from Month 2, and the Figma training was top-notch. I now have a portfolio that actually gets me interviews. The CV prep sessions were a game-changer.',
    initials: 'CE',
    color: '#2E6A0A',
  },
  {
    id: 3,
    name: 'Emmanuel Fashola',
    role: 'Business Owner, Lagos',
    category: 'development',
    rating: 5,
    text: 'Kurios Sat built our e-commerce platform from scratch. The team was professional, delivered on time, and the after-launch support has been excellent. Our online sales increased significantly within the first month.',
    initials: 'EF',
    color: '#0F1E38',
  },
  {
    id: 4,
    name: 'Ngozi Okonkwo',
    role: 'Cybersecurity Analyst (Graduate)',
    category: 'training',
    rating: 5,
    text: 'I came in as a complete beginner. The Cybersecurity & Ethical Hacking course was intense in the best way — virtual labs, CTF challenges, real penetration testing projects. I passed my certification exam on my first attempt.',
    initials: 'NO',
    color: '#1a2f52',
  },
  {
    id: 5,
    name: 'Tunde Adesanya',
    role: 'CEO, Retail Chain',
    category: 'automation',
    rating: 5,
    text: 'The WhatsApp automation Kurios Sat built for our business transformed how we handle customer enquiries. We went from missing leads to responding 24/7 automatically. The ROI was visible within the first week.',
    initials: 'TA',
    color: '#6DB32F',
  },
  {
    id: 6,
    name: 'Blessing Nwachukwu',
    role: 'Data Analyst (Graduate)',
    category: 'training',
    rating: 5,
    text: 'The Data Analysis course was structured perfectly — from Excel basics to Power BI dashboards to Python. The instructors explained everything clearly, and the real-world datasets made the learning stick. I got a job offer before I even finished!',
    initials: 'BN',
    color: '#2E6A0A',
  },
  {
    id: 7,
    name: 'Kelechi Ibeh',
    role: 'Operations Manager',
    category: 'automation',
    rating: 5,
    text: 'Kurios Sat deployed an AI chatbot on our website and integrated it with our WhatsApp line. Customer support inquiries dropped by 60% for our team — most queries are handled automatically now. Exceptional work.',
    initials: 'KI',
    color: '#0F1E38',
  },
  {
    id: 8,
    name: 'Fatima Abdullahi',
    role: 'Mobile Developer (Graduate)',
    category: 'training',
    rating: 5,
    text: 'The Mobile App Development course using React Native was brilliant. From building layouts in week one to publishing an app in Month 3 — the progression is well-planned. Kurios Sat also helped me with interview prep and I landed a remote job!',
    initials: 'FA',
    color: '#1a2f52',
  },
]

const CATEGORIES = [
  { key: 'all',        label: 'All Reviews' },
  { key: 'training',  label: 'Training' },
  { key: 'development', label: 'Development' },
  { key: 'automation', label: 'AI & Automation' },
] as const

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill={i < rating ? '#F59E0B' : 'none'} color={i < rating ? '#F59E0B' : '#d1d5db'} />
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [filter, setFilter] = useState<'all' | 'training' | 'development' | 'automation'>('all')
  const [current, setCurrent] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  const filtered = filter === 'all' ? testimonials : testimonials.filter(t => t.category === filter)

  // reset to first slide when filter changes
  useEffect(() => { setCurrent(0) }, [filter])

  function prev() { setCurrent(c => (c - 1 + filtered.length) % filtered.length) }
  function next() { setCurrent(c => (c + 1) % filtered.length) }

  // visible = current + neighbours (3-up on desktop, 1 on mobile via CSS)
  const visible = [
    filtered[(current - 1 + filtered.length) % filtered.length],
    filtered[current],
    filtered[(current + 1) % filtered.length],
  ]

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <p className="section-label">What People Say</p>
        <h2>Client & Student Reviews</h2>
        <p className="section-subtitle">Real feedback from businesses we've built for and students we've trained</p>

        {/* Filter tabs */}
        <div className="testimonial-filters">
          {CATEGORIES.map(c => (
            <button
              key={c.key}
              className={`filter-tab ${filter === c.key ? 'active' : ''}`}
              onClick={() => setFilter(c.key as typeof filter)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Carousel */}
        <div className="testimonial-carousel">
          <button className="carousel-arrow left" onClick={prev} aria-label="Previous">
            <ChevronLeft size={20} />
          </button>

          <div className="testimonial-track" ref={trackRef}>
            {visible.map((t, idx) => (
              <div
                key={`${t.id}-${idx}`}
                className={`testimonial-card ${idx === 1 ? 'center' : 'side'}`}
              >
                <Quote size={28} className="quote-icon" />
                <p className="testimonial-text">{t.text}</p>
                <StarRating rating={t.rating} />
                <div className="testimonial-author">
                  <div className="author-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="author-name">{t.name}</p>
                    <p className="author-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="carousel-arrow right" onClick={next} aria-label="Next">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="carousel-dots">
          {filtered.map((_, i) => (
            <button
              key={i}
              className={`dot ${i === current ? 'active' : ''}`}
              onClick={() => setCurrent(i)}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
