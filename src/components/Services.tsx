import { Code, Cpu, Zap, BookOpen, Briefcase, FileText, Star } from 'lucide-react'

export default function Services() {
  const services = [
    {
      id: 1,
      icon: Code,
      title: 'Technology Solutions',
      items: [
        'Custom Web Development',
        'E-commerce Solutions',
        'Mobile Application Development',
        'API Development & Integration',
        'UI/UX Design & Branding',
        'Cloud Infrastructure Setup',
        'IT Strategy & Consulting'
      ]
    },
    {
      id: 2,
      icon: Cpu,
      title: 'Software Product Development',
      items: [
        'Enterprise Software Solutions',
        'Business Intelligence Systems',
        'CRM & ERP Solutions',
        'SaaS Platform Development',
        'Scalable Custom Software'
      ]
    },
    {
      id: 3,
      icon: Zap,
      title: 'AI & Automation Services',
      items: [
        'Intelligent AI Chatbots',
        'Customer Support Automation',
        'Business Process Automation',
        'AI-Powered Analytics & Insights',
        'Smart Workflow Systems'
      ]
    },
    {
      id: 4,
      icon: BookOpen,
      title: 'Corporate Training',
      badge: '3 Months',
      items: [
        'Cybersecurity & Ethical Hacking',
        'Full-Stack Web Development',
        'Advanced Software Engineering',
        'AI & Machine Learning',
        'Data Science & Analytics',
        'Cloud & DevOps',
        'Professional Certifications',
        'Language (English, Spanish, French)'
      ],
      perks: [
        { icon: Briefcase, text: 'Internship placement support after graduation' },
        { icon: FileText,  text: 'CV writing & interview preparation' },
        { icon: Star,      text: 'Top students get remote job opportunities' },
      ]
    }
  ]

  return (
    <section id="services" className="services">
      <div className="services-container">
        <p className="section-label">Core Capabilities</p>
        <h2>Our Services</h2>
        <p className="section-subtitle">Enterprise-grade technology solutions designed to accelerate innovation, streamline operations, and drive measurable business results</p>
        
        <div className="services-grid">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div key={service.id} className="service-card">
                <div className="service-header">
                  <div className="service-icon">
                    <Icon size={32} />
                  </div>
                  <div className="service-title-row">
                    <h3>{service.title}</h3>
                    {'badge' in service && service.badge && (
                      <span className="service-badge">{service.badge}</span>
                    )}
                  </div>
                </div>
                <ul className="service-list">
                  {service.items.map((item, idx) => (
                    <li key={idx}>
                      <span className="list-dot"></span>
                      {item}
                    </li>
                  ))}
                </ul>
                {'perks' in service && service.perks && (
                  <div className="service-perks">
                    {service.perks.map((perk, idx) => {
                      const PerkIcon = perk.icon
                      return (
                        <div key={idx} className="service-perk">
                          <PerkIcon size={15} />
                          <span>{perk.text}</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
