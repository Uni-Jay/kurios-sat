import { Phone } from 'lucide-react'
import favourImg from '../assets/images/favour.jpeg'
import victoriaImg from '../assets/images/victoria.jpeg'
import joshuaImg from '../assets/images/joshua.jpeg'
import adeyemiImg from '../assets/images/adeyemi.jpeg'

interface TeamMember {
  name: string
  role: string
  phone?: string
  bio: string
  initials: string
  color: string
  image?: string
}

const team: TeamMember[] = [
  {
    name: 'Mr. Ademola Adenusi',
    role: 'Chief Executive Officer',
    phone: '+234 817 002 0431',
    bio: 'Visionary leader driving Kurios Sat\'s mission to empower businesses and individuals through innovative technology solutions and strategic digital transformation.',
    initials: 'AA',
    color: '#0F1E38',
  },
  {
    name: 'Mrs. Adeyemi Adenusi',
    role: 'Head of Human Resources',
    phone: '+234 811 592 4866',
    bio: 'Leads talent acquisition, employee development, and organisational culture — ensuring Kurios Sat attracts and retains the best minds in technology.',
    initials: 'AA',
    color: '#6DB32F',
    image: adeyemiImg,
  },
  {
    name: 'Miss Victoria Omodogbe',
    role: 'Assistant Human Resources',
    phone: '+234 809 667 3814',
    bio: 'Supports HR operations, onboarding, and staff welfare to ensure a productive and positive work environment across all teams.',
    initials: 'VO',
    color: '#2E6A0A',
    image: victoriaImg,
  },
  {
    name: 'Miss Favour Ikhioya',
    role: 'Head of Department',
    phone: '+234 703 681 2183',
    bio: 'Oversees departmental operations, drives excellence across service delivery, and ensures every client and student receives outstanding results.',
    initials: 'FI',
    color: '#1a2f52',
    image: favourImg,
  },
  {
    name: 'Mr. Joshua Ogiriosa',
    role: 'Full Stack Developer',
    phone: '+234 907 605 2317',
    bio: 'Skilled full-stack developer creating robust and scalable web applications, bridging frontend and backend technologies to deliver comprehensive solutions.',
    initials: 'JO',
    color: '#6FB02F',
    image: joshuaImg,
  },
]

export default function Team() {
  return (
    <section className="team">
      <div className="team-container">
        <p className="section-label">The People Behind Kurios Sat</p>
        <h2>Meet Our Team</h2>
        <p className="section-subtitle">A dedicated group of professionals committed to delivering excellence in technology, training, and innovation.</p>

        <div className="team-grid">
          {team.map((member) => (
            <div key={member.name} className="team-card">
              <div
                className="team-avatar"
                style={member.image ? {} : { background: member.color }}
              >
                {member.image ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="team-avatar-img"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.style.background = member.color
                        parent.textContent = member.initials
                      }
                    }}
                  />
                ) : (
                  member.initials
                )}
              </div>
              <div className="team-info">
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
                {member.phone && (
                  <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="team-phone">
                    <Phone size={13} />
                    {member.phone}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
