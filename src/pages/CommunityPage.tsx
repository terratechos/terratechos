import { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';

interface DiscordEvent {
  title: string;
  date: string;
  time: string;
  location: string;
  type: string;
  duration: string;
  host: string;
  description: string;
  learnings: string[];
}

const discordEvents: DiscordEvent[] = [
  { title: 'DevTalks Vol.3', date: 'Apr 5, 2025', time: '6–8 PM IST', location: 'Discord Stage', type: 'Talk', duration: '2 hours', host: 'Core Committee', description: 'Industry speakers on cloud-native, web3, and OSS', learnings: ['Cloud-native architecture', 'Web3 fundamentals', 'Open source contributions', 'Q&A with speakers', 'Networking opportunities'] },
  { title: 'CTF Championship', date: 'Apr 20, 2025', time: '10 AM–6 PM IST', location: 'Discord + CTF Platform', type: 'Competition', duration: '8 hours', host: 'Event Management', description: 'Capture the flag security competition', learnings: ['Web exploitation', 'Reverse engineering', 'Cryptography', 'OSINT techniques', 'Team problem solving'] },
  { title: 'Open Source Sprint', date: 'May 1, 2025', time: '9 AM–5 PM IST', location: 'Discord #oss-collab + GitHub', type: 'Collab', duration: '8 hours', host: 'Content & Web', description: 'Contribute to real open source projects', learnings: ['OSS codebases', 'Pull requests & code review', 'GitHub Projects', 'Contribution portfolio', 'Collaboration workflows'] },
];

const communityFeatures = [
  { icon: '💡', label: 'Idea Sharing' },
  { icon: '🤝', label: 'Collaboration' },
  { icon: '💬', label: 'Discussion Channels' },
  { icon: '📅', label: 'Events & Workshops' },
  { icon: '🛠️', label: 'Project Showcase' },
  { icon: '🌐', label: 'Open Source' },
];

const EventModal = ({ event, onClose, isDark }: { event: DiscordEvent; onClose: () => void; isDark: boolean }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'Tab') {
      const focusable = modalRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    modalRef.current?.querySelector('button')?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const details = [
    { label: 'Time', value: event.time },
    { label: 'Location', value: event.location },
    { label: 'Type', value: event.type },
    { label: 'Duration', value: event.duration },
    { label: 'Host', value: event.host },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60" />
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg rounded-2xl p-6 max-h-[90vh] overflow-y-auto ${isDark ? 'glass-card' : 'bg-[#ffffff] border border-[#d0e8da]'}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={event.title}
      >
        <h3 className="font-display text-3xl mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h3>
        <p className="font-mono-label text-xs mb-4" style={{ color: 'var(--tt-accent)' }}>{event.date}</p>
        <p className="font-body text-sm mb-6" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>

        <div className="space-y-2 mb-6">
          {details.map(d => (
            <div key={d.label} className="flex gap-4">
              <span className="font-mono-label text-xs w-20" style={{ color: 'var(--tt-text-muted)' }}>{d.label}</span>
              <span className="font-body text-sm" style={{ color: 'var(--tt-text)' }}>{d.value}</span>
            </div>
          ))}
        </div>

        <h4 className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-accent)' }}>WHAT YOU'LL LEARN</h4>
        <ul className="space-y-1 mb-6">
          {event.learnings.map(l => (
            <li key={l} className="font-body text-sm flex items-center gap-2" style={{ color: 'var(--tt-text-secondary)' }}>
              <span style={{ color: 'var(--tt-accent)' }}>→</span> {l}
            </li>
          ))}
        </ul>

        <div className="flex gap-3">
          <button
            className="flex-1 py-3 rounded-lg font-mono-label text-sm"
            style={{ background: '#5865F2', color: '#ffffff' }}
          >
            REGISTER VIA DISCORD
          </button>
          <button
            onClick={onClose}
            className={`px-6 py-3 rounded-lg font-mono-label text-sm ${
              isDark ? 'border border-[rgba(0,255,170,0.2)]' : 'border border-[#d0e8da]'
            }`}
            style={{ color: 'var(--tt-text-secondary)' }}
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};

const CommunityPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedEvent, setSelectedEvent] = useState<DiscordEvent | null>(null);
  const [toast, setToast] = useState(false);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
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
        <h1 className="font-display text-5xl sm:text-7xl mb-4" style={{ color: 'var(--tt-text)' }}>TERRAMOBIUS</h1>
        <p className="font-body text-lg mb-6 max-w-xl mx-auto" style={{ color: 'var(--tt-text-secondary)' }}>
          Our community hub for builders, learners, and innovators
        </p>
        <a
          href="#discord"
          className="inline-block px-8 py-3 rounded-lg font-mono-label text-sm"
          style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
        >
          JOIN OUR DISCORD ↓
        </a>
      </section>

      <main className="relative z-10 px-4">
        <div className="max-w-6xl mx-auto">

          {/* Identity */}
          <section className="py-16 text-center">
            <div className="text-5xl mb-4">🌍</div>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>OUR COMMUNITY IDENTITY</h2>
            <p className="font-body max-w-2xl mx-auto" style={{ color: 'var(--tt-text-secondary)' }}>
              TerraMobius is the living, breathing community behind TerraTech. It's where ideas are born, collaborations happen, and builders connect across disciplines.
            </p>
          </section>

          {/* Discord Widget */}
          <section id="discord" className="py-8">
            <div
              className={`rounded-xl p-6 ${isDark ? 'glass-card' : 'bg-[#ffffff] border border-[#d0e8da]'}`}
              style={{ borderLeft: '4px solid #5865F2' }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">💬</span>
                <h3 className="font-display text-2xl" style={{ color: 'var(--tt-text)' }}>JOIN OUR DISCORD</h3>
              </div>
              <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>
                Connect with fellow members, get help, share projects, and stay updated on events.
              </p>
              <button
                onClick={showToast}
                className="px-6 py-3 rounded-lg font-mono-label text-sm mb-3"
                style={{ background: '#5865F2', color: '#ffffff' }}
              >
                JOIN DISCORD SERVER
              </button>
              <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>
                LINK COMING SOON · STAY TUNED!
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="py-16" style={!isDark ? { background: '#f0faf4', borderRadius: '1rem', padding: '2rem', marginBottom: '2rem' } : {}}>
            <div
              className={`rounded-xl p-6 ${isDark ? 'glass-card' : 'border-l-4 border-[#00a86b]'}`}
            >
              <h3 className="font-display text-2xl mb-6" style={{ color: 'var(--tt-text)' }}>COMMUNITY FEATURES</h3>
              <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                {communityFeatures.map(f => (
                  <div
                    key={f.label}
                    className={`min-w-[160px] rounded-xl p-5 text-center flex-shrink-0 transition-all ${
                      isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                    }`}
                  >
                    <div className="text-3xl mb-2">{f.icon}</div>
                    <div className="font-mono-label text-xs" style={{ color: 'var(--tt-text)' }}>{f.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Discord Events */}
          <section className="py-16">
            <h2 className={`font-display text-3xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
              UPCOMING DISCORD EVENTS
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {discordEvents.map(event => (
                <div
                  key={event.title}
                  className={`rounded-xl p-6 transition-all cursor-pointer ${
                    isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <h3 className="font-body font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h3>
                  <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-accent)' }}>{event.date}</p>
                  <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>
                  <button className="font-mono-label text-xs" style={{ color: 'var(--tt-accent)' }}>
                    LEARN MORE →
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} isDark={isDark} />}

      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 rounded-xl p-4 ${isDark ? 'glass-card' : 'bg-[#ffffff] border border-[#d0e8da] shadow-lg'}`}
          style={{ animation: 'slide-in-toast 0.3s ease-out' }}
        >
          <p className="font-mono-label text-sm" style={{ color: 'var(--tt-text)' }}>✓ Join our Discord to register!</p>
        </div>
      )}

      <Footer />
      <BackToTop />
    </div>
  );
};

export default CommunityPage;
