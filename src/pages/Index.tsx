import { useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { ParticleBackground } from '../components/ParticleBackground';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { EventsSection } from '../sections/EventsSection';
import { FAQSection } from '../sections/FAQSection';
import { SponsorsSection } from '../sections/SponsorsSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { UpdatesSection } from '../sections/UpdatesSection';
import { ContactSection } from '../sections/ContactSection';

const Index = () => {
  useEffect(() => {
    // Handle hash-based scrolling to sections
    const handleHashScroll = () => {
      const hash = window.location.hash;
      // Extract section ID from hash (remove # and any /)
      const id = hash.replace(/^#\/?/, '');
      
      if (id) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 50);
      }
    };

    // Scroll on load if hash exists
    handleHashScroll();

    // Listen for hash changes (when clicking nav links)
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
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
        <SponsorsSection />
        <AchievementsSection />
        <UpdatesSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
