import { CheckCircle2, Briefcase, FileText, Star, Target } from 'lucide-react'

export default function About() {
  const focuses = [
    'Database Management',
    'ISP Provision & Management',
    'Cable Television',
    'ICT Training',
    'Card Technologies',
    'Consulting & Innovation',
  ]

  const highlights = [
    'Industry-leading expertise with 15+ years of proven success',
    'Cutting-edge technology stack and innovative methodologies',
    'Client-centric approach with dedicated support',
    'Proven track record delivering enterprise-scale solutions',
    'Round-the-clock support and strategic consulting',
    'Tailored solutions with transparent, competitive pricing'
  ]

  const careerPerks = [
    { icon: Briefcase, text: 'Internship placement support after graduation' },
    { icon: FileText,  text: 'CV writing & interview preparation included' },
    { icon: Star,      text: 'Top students earn remote job opportunities' },
  ]

  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-content">
          <div className="about-header">
            <p className="section-label">About Us</p>
            <h2>Who We Are</h2>
          </div>

          <p>
            Kurios Sat is a leading technology company focused on delivering scalable and impactful solutions across six core disciplines. Our team comprises industry experts, talented engineers, and creative minds who collaborate to push the boundaries of what technology can achieve.
          </p>

          <div className="about-focuses">
            {focuses.map((f, idx) => (
              <span key={idx} className="about-focus-tag">{f}</span>
            ))}
          </div>

          <p style={{ marginTop: '1.8rem' }}>
            A pioneering technology company dedicated to pushing the boundaries of innovation, transforming businesses and empowering individuals. With a passion for cutting-edge technology and a commitment to excellence, we specialise in delivering tailored digital solutions that address the unique needs of every client.
          </p>

          <div className="about-mission">
            <div className="about-mission-icon"><Target size={22} /></div>
            <div>
              <p className="about-mission-title">Our Mission</p>
              <p className="about-mission-text">
                To empower businesses and individuals with transformative technology solutions that drive growth, enhance productivity and foster innovation — while building long-lasting partnerships grounded in exceptional results.
              </p>
            </div>
          </div>

          <div className="about-training-banner">
            <p className="about-training-title">🎓 All Training Programmes — 3 Months</p>
            <p className="about-training-sub">Intensive, hands-on learning designed to take you from beginner to job-ready in 3 months.</p>
            <div className="about-career-perks">
              {careerPerks.map(({ icon: Icon, text }, idx) => (
                <div key={idx} className="about-career-perk">
                  <Icon size={18} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="highlights">
            {highlights.map((item, idx) => (
              <div key={idx} className="highlight-item">
                <CheckCircle2 size={20} strokeWidth={1.5} />
                <span className="highlight-text">{item}</span>
              </div>
            ))}
          </div>

          <div className="about-partners">
            <p className="about-partners-label">Our Partners</p>
            <div className="about-partners-row">
              <a className="partner-badge" href="https://spectranet.com.ng/" target="_blank" rel="noreferrer">🌐 Spectranet</a>
              <a className="partner-badge" href="https://www.startimestv.com/" target="_blank" rel="noreferrer">📺 StarTimes</a>
              <a className="partner-badge" href="https://us.moreplextv.com/" target="_blank" rel="noreferrer">📡 Morplex TV</a>
            </div>
          </div>
        </div>

        <div className="about-stats">
          <div className="stat">
            <div className="stat-number">500+</div>
            <div className="stat-label">Projects Delivered</div>
          </div>
          <div className="stat">
            <div className="stat-number">100+</div>
            <div className="stat-label">Trusted Clients</div>
          </div>
          <div className="stat">
            <div className="stat-number">50+</div>
            <div className="stat-label">Expert Professionals</div>
          </div>
        </div>
      </div>
    </section>
  )
}
