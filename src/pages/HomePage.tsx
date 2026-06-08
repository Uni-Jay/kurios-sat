import Hero from '../components/Hero'
import AboutPage from './AboutPage'
import ContactPage from './ContactPage'
import ServicesPage from './ServicesPage'
import Testimonials from '../components/Testimonials'

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutPage />
      <ServicesPage />
      <Testimonials />
      <ContactPage />
    </>
  )
}
