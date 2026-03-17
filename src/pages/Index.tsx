import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { ParticleBackground } from '../components/ParticleBackground';
import { HeroSection } from '../sections/HeroSection';
import { AboutSection } from '../sections/AboutSection';
import { EventsSection } from '../sections/EventsSection';
import { FAQSection } from '../sections/FAQSection';
import { SponsorsSection } from '../sections/SponsorsSection';
// import { AchievementsSection } from '../sections/AchievementsSection';
import { UpdatesSection } from '../sections/UpdatesSection';
import { ContactSection } from '../sections/ContactSection';

const Index = () => {
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
