import { Phone } from 'lucide-react'

interface TeamMember {
  name: string
  role: string
  phone?: string
  bio: string
  initials: string
  color: string
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
  },
  {
    name: 'Miss Victoria Omodogbe',
    role: 'Assistant Human Resources',
    phone: '+234 809 667 3814',
    bio: 'Supports HR operations, onboarding, and staff welfare to ensure a productive and positive work environment across all teams.',
    initials: 'VO',
    color: '#2E6A0A',
  },
  {
    name: 'Miss Favour Ikhioya',
    role: 'Head of Department',
    phone: '+234 703 681 2183',
    bio: 'Oversees departmental operations, drives excellence across service delivery, and ensures every client and student receives outstanding results.',
    initials: 'FI',
    color: '#1a2f52',
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
              <div className="team-avatar" style={{ background: member.color }}>
                {member.initials}
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
