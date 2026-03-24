import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { ParticleBackground } from '../components/ParticleBackground';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { EventsSection } from '../sections/EventsSection';
import { FAQSection } from '../sections/FAQSection';
// import { SponsorsSection } from '../sections/SponsorsSection';
// import { AchievementsSection } from '../sections/AchievementsSection';
import { UpdatesSection } from '../sections/UpdatesSection';
import { ContactSection } from '../sections/ContactSection';

const Index = () => {
  useEffect(() => {
    // Scroll to section on page load from query params if needed
    const params = new URLSearchParams(window.location.search);
    const section = params.get('scroll');
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <EventsSection />
        <FAQSection />
        {/* <SponsorsSection /> */}
        {/* <AchievementsSection /> */}
        <UpdatesSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
