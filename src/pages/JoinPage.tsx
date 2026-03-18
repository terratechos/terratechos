import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import confetti from 'canvas-confetti';

const joinBenefits = [
  { icon: '📚', label: 'Learn & Grow', description: 'Access to workshops and mentorship' },
  { icon: '🤝', label: 'Network', description: 'Connect with like-minded builders' },
  { icon: '🏆', label: 'Showcase Work', description: 'Display your portfolio and achievements' },
  { icon: '💡', label: 'Innovation', description: 'Collaborate on cutting-edge ideas' },
  { icon: '🌐', label: 'Community', description: 'Join a supportive tech community' },
];

const triggerConfetti = () => {
  confetti({
    particleCount: 120,
    spread: 80,
    colors: ['#00ffaa', '#5865F2', '#ffd166', '#ff6b35'],
  });
};

const JoinPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToApplication = () => {
    const element = document.getElementById('application');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleApplyClick = () => {
    // Trigger confetti as a fun interaction when clicking apply
    triggerConfetti();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-24 pb-16 px-4 text-center"
        style={{
          background: isDark ? 'linear-gradient(180deg, rgba(0,255,170,0.05), transparent)' : '#f0faf4',
          borderRadius: '0 0 28px 28px',
        }}
      >
        <h1 className="font-display text-5xl sm:text-7xl mb-4" style={{ color: 'var(--tt-text)' }}>JOIN US</h1>
        <p className="font-body text-lg mb-6 max-w-xl mx-auto" style={{ color: 'var(--tt-text-secondary)' }}>
          Become part of TerraTech and unlock your potential as a tech innovator
        </p>
        <button
          onClick={scrollToApplication}
          className="inline-block px-8 py-3 rounded-lg font-mono-label text-sm"
          style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
        >
          APPLY NOW ↓
        </button>
      </section>

      <main className="relative z-10 px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Why Join */}
          <section className="py-16 text-center">
            <div className="text-5xl mb-4">✨</div>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>WHY JOIN TERRATECH?</h2>
            <p className="font-body max-w-2xl mx-auto mb-12" style={{ color: 'var(--tt-text-secondary)' }}>
              Dive into a world of innovation, collaboration, and growth with TerraTech community.
            </p>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinBenefits.map(benefit => (
                <div
                  key={benefit.label}
                  className={`rounded-xl p-6 transition-all ${
                    isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                  }`}
                >
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="font-display text-lg mb-2" style={{ color: 'var(--tt-text)' }}>{benefit.label}</h3>
                  <p className="font-body text-sm" style={{ color: 'var(--tt-text-secondary)' }}>{benefit.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Application Info */}
          <section className="py-16">
            <div id='application'
              className={`rounded-xl p-8 ${isDark ? 'glass-card' : 'bg-[#ffffff] border border-[#d0e8da]'}`}
              style={!isDark ? { borderTop: '3px solid #00a86b' } : {}}
            >
              <h2 className={`font-display text-3xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
                APPLICATION PROCESS
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="font-display text-xl mb-4" style={{ color: 'var(--tt-accent)' }}>WHAT WE'RE LOOKING FOR</h3>
                  <ul className="space-y-3">
                    {[
                      'Passion for technology and innovation',
                      'Willingness to collaborate and contribute',
                      'Enthusiasm to learn and grow',
                      'Commitment to the community',
                      'Any skill level (beginners welcome!)',
                    ].map(item => (
                      <li key={item} className="font-body text-sm flex items-start gap-3" style={{ color: 'var(--tt-text-secondary)' }}>
                        <span style={{ color: 'var(--tt-accent)' }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-xl mb-4" style={{ color: 'var(--tt-accent)' }}>ROLES AVAILABLE</h3>
                  <ul className="space-y-3">
                    {[
                      'Web Development',
                      'UI/UX Design',
                      'Technical Writing',
                      'Creative Head',
                      'Content & Marketing',
                      'Copywriting',
                      'Alumni Relation',
                      'Support Coordinator'
                    ].map(role => (
                      <li key={role} className="font-body text-sm flex items-start gap-3" style={{ color: 'var(--tt-text-secondary)' }}>
                        <span style={{ color: 'var(--tt-accent)' }}>→</span>
                        {role}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t" style={{ borderColor: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }} />

              <div className="mt-8 text-center">
                <p className="font-body mb-6" style={{ color: 'var(--tt-text-secondary)' }}>
                  Ready to be part of something amazing? Fill out our application form and join the TerraTech community!
                </p>
                <a
                  href="https://forms.gle/form"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleApplyClick}
                  className="inline-block px-8 py-3 rounded-lg font-mono-label text-sm"
                  style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
                >
                  SUBMIT YOUR APPLICATION 🎉
                </a>
                <p className="font-mono-label text-xs mt-4" style={{ color: 'var(--tt-text-muted)' }}>
                  APPLICATIONS ARE OPEN DURING THE FIRST 2 WEEKS OF MARCH & SEPTEMBER
                </p>
              </div>
            </div>
          </section>

          {/* FAQ teaser */}
          <section className="py-16 text-center">
            <h2 className="font-display text-2xl mb-4" style={{ color: 'var(--tt-text)' }}>QUESTIONS?</h2>
            <p className="font-body max-w-2xl mx-auto" style={{ color: 'var(--tt-text-secondary)' }}>
              Check out our FAQ section or reach out to us on Discord. Our team is always happy to help!
            </p>
          </section>
        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default JoinPage;