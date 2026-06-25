import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Bot } from 'lucide-react'

interface Message {
  id: number
  from: 'bot' | 'user'
  text: string
}

const QUICK_REPLIES = [
  'What are your hours?',
  'Show course prices',
  'Our courses',
  'Build me a website',
  'How do I contact you?',
  'Where are you located?',
]

function getBotReply(input: string): string {
  const msg = input.toLowerCase().trim()

  // Greetings
  if (/^(hi|hello|hey|good morning|good afternoon|good evening|howdy|yo)\b/.test(msg)) {
    return "Hello! 👋 Welcome to Kurios Sat. I'm here to help you with information about our services, courses, prices, and more. What can I assist you with today?"
  }

  // Hours / opening times
  if (/hour|open|clos|time|when|schedule|available/.test(msg)) {
    return '🕗 We are open:\n\nMonday \u2013 Friday: 8:00 AM \u2013 5:00 PM\n\nWe are closed on weekends and public holidays. Feel free to send us an email at info@kurios-sat.tech and we\'ll respond promptly!'
  }

  // Development / project pricing — varies, contact us
  if (/website|web site|web app|android|ios|software app|saas|platform|build me|develop.*for|create.*app|make.*app|ai system|ai solution|automat|crm|erp/.test(msg)) {
    return `💻 Great choice! For custom development projects — websites, mobile apps, AI systems, software platforms and more — pricing varies depending on your requirements, scope, and timeline.\n\nPlease reach out to us directly for a quote:\n\n📞 +234 817 002 0431\n📞 +234 806 088 6447\n📧 info@kurios-sat.tech\n\nOr visit our Contact page and send us a message — we\'ll get back to you promptly!`
  }

  // ── INDIVIDUAL COURSE CURRICULA ──────────────────────────────

  // UI/UX Design
  if (/ui.?ux|user interface|user experience|figma|product design/.test(msg)) {
    return `🎨 UI/UX Design — ₦300,000 · 3 Months\n\n📅 Month 1 — Foundations\nDesign principles, colour theory, typography, user research, wireframing & Figma basics.\n\n📅 Month 2 — Product Design & Prototyping\nUser personas, user journeys, low & high-fidelity UI, mobile + web dashboard design, interactive prototyping, design systems.\n\n📅 Month 3 — Advanced UX & Portfolio\nUsability testing, responsive design, accessibility, real-world client project, portfolio creation & final presentation.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Cybersecurity & Ethical Hacking
  if (/ethical hack|penetrat|pentest|cyber.*hack|hack.*cyber/.test(msg)) {
    return `🔐 Cybersecurity & Ethical Hacking — ₦450,000 · 3 Months\n\n📅 Month 1 — Foundations\nNetworking, Linux basics, cyber threats, security principles, virtual labs & reconnaissance.\n\n📅 Month 2 — Ethical Hacking\nScanning, enumeration, vulnerability assessment, web app attacks, wireless security, social engineering & penetration testing.\n\n📅 Month 3 — Defensive Security\nSystem hardening, firewalls/IDS, incident response, security policies, cloud security, CTF challenges & final pentest project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Cybersecurity Mastery
  if (/cyber.*master|master.*cyber|siem|soc |security operat|threat intel|digital forensic/.test(msg)) {
    return `🛡️ Cybersecurity Mastery — ₦300,000 · 3 Months\n\n📅 Month 1 — Intermediate Security\nAdvanced networking, Linux admin, threat intelligence, SIEM basics, SOC operations & malware fundamentals.\n\n📅 Month 2 — Offensive & Defensive\nEthical hacking tools, web security testing, network & endpoint defence, digital forensics & log analysis.\n\n📅 Month 3 — Enterprise Security\nCloud & enterprise security, risk management, security auditing, compliance, security architecture & final enterprise project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Data Analysis
  if (/data analy|power bi|tableau|sql.*data|business intel.*data|kpi/.test(msg)) {
    return `📊 Data Analysis — ₦200,000 · 3 Months\n\n📅 Month 1 — Fundamentals\nIntro to data analysis, Excel, data cleaning, data types, statistics basics & visualisation fundamentals.\n\n📅 Month 2 — Analysis Tools\nSQL, Power BI/Tableau, dashboard creation, data storytelling, Python intro & business reporting.\n\n📅 Month 3 — Advanced Analysis\nPredictive analytics, KPI tracking, business intelligence, real-world datasets & capstone dashboard project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // MIS / Microsoft Office
  if (/\bmis\b|microsoft office|excel|powerpoint|word|publisher|spreadsheet|pivot/.test(msg)) {
    return `💼 MIS (Excel, PowerPoint, Word, Publisher) — ₦150,000 · 3 Months\n\n📅 Month 1 — Word & Publisher\nProfessional document design, tables & references, CV & report creation, Publisher, flyers & brochure design.\n\n📅 Month 2 — Excel\nFormulas & functions, charts, data sorting/filtering, pivot tables & financial reporting.\n\n📅 Month 3 — PowerPoint & Productivity\nPresentation design, animations, professional pitch decks, office workflow efficiency, collaboration tools & final project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Frontend Web Dev
  if (/frontend|front.end|front end|html|css|react|javascript.*web/.test(msg)) {
    return `🌐 Web Development – Frontend — ₦250,000 · 3 Months\n\n📅 Month 1 — Basics\nHTML5, CSS3, responsive design, Flexbox & Grid, JavaScript fundamentals.\n\n📅 Month 2 — Modern Frontend\nDOM manipulation, ES6, APIs & fetch, React fundamentals, components, props & state management.\n\n📅 Month 3 — Advanced\nReact Router, authentication UI, dashboard design, API integration, deployment & portfolio project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Backend Web Dev
  if (/backend|back.end|back end|node\.?js|express|rest api|jwt|mongodb|mysql/.test(msg)) {
    return `⚙️ Web Development – Backend — ₦250,000 · 3 Months\n\n📅 Month 1 — Fundamentals\nServer-side development, Node.js, Express.js, REST APIs, routing & middleware, environment variables.\n\n📅 Month 2 — Database & Auth\nMySQL/MongoDB, CRUD operations, Sequelize/Mongoose, JWT authentication, role-based access & file uploads.\n\n📅 Month 3 — Advanced\nEmail & OTP systems, API security, error handling, deployment, testing APIs & final backend project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Full Stack Web Dev
  if (/full.?stack|fullstack/.test(msg)) {
    return `🚀 Web Development – Full Stack — ₦500,000 · 3 Months\n\n📅 Month 1 — Frontend\nHTML, CSS, JavaScript, responsive design, React fundamentals, component architecture & API integration.\n\n📅 Month 2 — Backend\nNode.js & Express, databases, authentication, RESTful APIs & file handling.\n\n📅 Month 3 — Full Stack Projects\nFull authentication system, admin dashboard, payment integration basics, deployment, team collaboration & capstone project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Mobile App Development
  if (/mobile app|react native|flutter|android app|ios app|play store|app develop/.test(msg)) {
    return `📱 Mobile App Development — ₦350,000 · 3 Months\n\n📅 Month 1 — Basics\nIntro to mobile apps, UI design principles, React Native/Flutter setup, components, layouts & navigation.\n\n📅 Month 2 — App Features\nState management, API integration, authentication, forms & validation, device features.\n\n📅 Month 3 — Publishing\nFirebase/backend integration, push notifications, performance optimisation, app testing, Play Store deployment & final app project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // Robotics
  if (/robotic|arduino|iot|embedded|sensor|actuator|circuit/.test(msg)) {
    return `🤖 Robotics — ₦500,000 · 3 Months\n\n📅 Month 1 — Foundations\nIntro to robotics, electronics basics, sensors & actuators, Arduino fundamentals, circuit design & safety procedures.\n\n📅 Month 2 — Programming & Automation\nRobot programming, motor control, embedded systems, IoT basics, automation concepts & mini robotic projects.\n\n📅 Month 3 — Advanced Robotics\nAI in robotics, autonomous systems, troubleshooting, smart robotics projects, team robotics challenge & final project.\n\nType "show course prices" to see all fees, or ask about another course!`
  }

  // ── GENERAL COURSE LIST ──────────────────────────────────────

  // Prices / costs / fees (courses only)
  if (/price|cost|fee|how much|pric|afford|rate|charge/.test(msg)) {
    return `📚 Our course prices (all 3 months):\n
• UI/UX Design — ₦300,000
• Cybersecurity & Ethical Hacking — ₦450,000
• Cybersecurity Mastery — ₦300,000
• Data Analysis — ₦200,000
• MIS (Excel, PowerPoint, Word, Publisher) — ₦150,000
• Web Dev – Frontend — ₦250,000
• Web Dev – Backend — ₦250,000
• Web Dev – Full Stack — ₦500,000
• Mobile App Development — ₦350,000
• Robotics — ₦500,000\n
Ask me about any course for the full 3-month curriculum!`
  }

  // Course list / training / career
  if (/course|train|class|learn|study|program|certif|internship|cv|resume|job|career/.test(msg)) {
    return `🎓 All training programmes run for 3 months — hands-on and job-focused.\n
Available courses:\n
• UI/UX Design
• Cybersecurity & Ethical Hacking
• Cybersecurity Mastery
• Data Analysis
• MIS (Excel, PowerPoint, Word, Publisher)
• Web Development – Frontend
• Web Development – Backend
• Web Development – Full Stack
• Mobile App Development
• Robotics\n
💬 Ask me about any course for the full month-by-month curriculum!\n
🚀 After graduation:\n
• Internship placement support
• CV writing & interview preparation
• Top students earn remote job opportunities`
  }

  // Services (tech, AI, software)
  if (/service|offer|what do you do|software|web dev|app|ai|automat|develop|partner|spectranet|startimes|morplex|whatsapp/.test(msg)) {
    return `💼 Kurios Sat offers four core service areas:\n
1. Technology Solutions — Web & mobile development, cloud infrastructure, IT consulting
2. Software Product Development — Enterprise software, CRM/ERP, SaaS platforms
3. AI & Automation — AI chatbots, WhatsApp automation & bots, business process automation, analytics
4. Corporate Training — Professional courses in tech, cybersecurity, AI, and more\n
🤝 We also partner with Spectranet (ISP), StarTimes & Morplex TV (cable television).\n
Visit our Services page for full details!`
  }

  // Contact
  if (/contact|reach|call|phone|email|whatsapp|message|facebook|instagram|social/.test(msg)) {
    return `📞 You can reach us through:\n
• Phone: +234 817 002 0431
• Phone / WhatsApp: +234 806 088 6447
• Email: info@kurios-sat.tech
• Facebook: facebook.com/profile.php?id=61583783820677
• Instagram: @kurios_sat\n
Or visit the Contact page to send us a message directly!`
  }

  // Location / address
  if (/locat|where|address|office|find you|direction|lagos|ikorodu/.test(msg)) {
    return `📍 Our office is located at:\n
51, Ayangburen Road\nOpposite Ayangburen Palace\nTop Floor, Ikorodu, Lagos\n
(Same building as KFC & Samsung)`
  }

  // About the company
  if (/who are you|about|company|kurios|what is/.test(msg)) {
    return `🏢 Kurios Sat is a leading technology company based in Ikorodu, Lagos. We specialise in:\n
• Database Management & ISP Services
• Cable Television
• ICT Training
• Card Technologies
• Consulting & Innovation\n
🤝 Our trusted partners include Spectranet, StarTimes & Morplex TV.\n
Our motto: "Endless Possibilities" — empowering businesses and individuals through technology.`
  }

  // Thank you
  if (/thank|thanks|appreciate|great|awesome|perfect|helpful/.test(msg)) {
    return "You're welcome! 😊 If you have any more questions, feel free to ask. We're always happy to help!"
  }

  // Goodbye
  if (/bye|goodbye|see you|later|ciao/.test(msg)) {
    return "Goodbye! 👋 Have a great day. Don't hesitate to reach out whenever you need us!"
  }

  // Fallback
  return "I'm not sure I understand that. 🤔 You can ask me about:\n\n• Our opening hours\n• Course prices & curricula\n• Services we offer\n• How to contact us\n• Our location\n\nOr call us at +234 817 002 0431!"
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      from: 'bot',
      text: "Hi there! 👋 I'm Kurios, your virtual assistant. How can I help you today?\n\nYou can ask me about our services, courses, prices, hours, or location!"
    }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function sendMessage(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = { id: Date.now(), from: 'user', text: trimmed }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setTyping(true)

    setTimeout(() => {
      const reply = getBotReply(trimmed)
      setMessages(prev => [...prev, { id: Date.now() + 1, from: 'bot', text: reply }])
      setTyping(false)
    }, 700)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <>
      {/* Chat Window */}
      {open && (
        <div className="chatbot-window" role="dialog" aria-label="Chat with Kurios">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">
                <Bot size={20} />
              </div>
              <div>
                <p className="chatbot-name">Kurios Assistant</p>
                <p className="chatbot-status">Online · Typically replies instantly</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`chat-bubble-wrap ${msg.from}`}>
                {msg.from === 'bot' && (
                  <div className="chat-bot-icon"><Bot size={14} /></div>
                )}
                <div className={`chat-bubble ${msg.from}`}>
                  {msg.text.split('\n').map((line, i) => (
                    <span key={i}>{line}{i < msg.text.split('\n').length - 1 && <br />}</span>
                  ))}
                </div>
              </div>
            ))}
            {typing && (
              <div className="chat-bubble-wrap bot">
                <div className="chat-bot-icon"><Bot size={14} /></div>
                <div className="chat-bubble bot typing">
                  <span /><span /><span />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-quick-replies">
            {QUICK_REPLIES.map(q => (
              <button key={q} className="quick-reply-btn" onClick={() => sendMessage(q)}>
                {q}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type a message…"
              className="chatbot-input"
              autoComplete="off"
            />
            <button type="submit" className="chatbot-send" aria-label="Send message" disabled={!input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* FAB Toggle Button */}
      <button
        className={`chatbot-fab ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Chat with us'}
        title={open ? 'Close chat' : 'Chat with us'}
      >
        {open ? <X size={26} /> : <MessageCircle size={26} />}
      </button>
    </>
  )
}
