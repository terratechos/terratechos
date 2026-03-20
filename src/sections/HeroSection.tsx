import { useTheme } from '../components/ThemeProvider';
import { TypewriterText } from '../components/TypewriterText';
import { useSectionFade } from '../hooks/useSectionFade';
import { Link } from 'react-router-dom';

const stats = [
  { value: '100+', label: 'Members' },
  { value: '30+', label: 'Events' },
  { value: '12', label: 'Industry Talks' },
  { value: '2024', label: 'Founded' },
];

export const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();

  return (
    <section ref={ref} className="section-fade min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 pb-12">
      {!isDark && <div className="absolute inset-0 dot-grid-bg opacity-40" />}
      {isDark && (
        <>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00ffaa, transparent)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #00ffaa, transparent)', filter: 'blur(60px)' }} />
        </>
      )}

      <div className="relative z-10 text-center max-w-4xl">
        <h1
          className="font-display text-6xl sm:text-8xl md:text-9xl tracking-wider mb-4"
          style={isDark
            ? { color: 'transparent', WebkitTextStroke: '2px #00ffaa' }
            : { background: 'linear-gradient(135deg, #0d2419, #00a86b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
          }
        >
          TERRA <span className="block sm:inline">TECH</span>
        </h1>

        <div className="h-10 mb-8">
          {isDark ? (
            <TypewriterText />
          ) : (
            <p className="font-body text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--tt-text-secondary)' }}>
              Where Engineers Become Builders
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
          <button
            onClick={() => {
              const el = document.getElementById('events');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-8 py-3 rounded-lg font-mono-label text-sm font-medium transition-all"
            style={{
              background: 'var(--tt-accent)',
              color: isDark ? '#050a07' : '#ffffff',
            }}
          >
            EXPLORE EVENTS →
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`px-8 py-3 rounded-lg font-mono-label text-sm font-medium transition-all ${
              isDark
                ? 'border border-[rgba(0,255,170,0.3)] hover:bg-[rgba(0,255,170,0.1)]'
                : 'border border-[#00a86b] hover:bg-[#00a86b]/10'
            }`}
            style={{ color: 'var(--tt-accent)' }}
          >
            ABOUT US
          </button>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isDark ? '' : 'max-w-2xl mx-auto'}`}>
          {stats.map(s => (
            <div
              key={s.label}
              className={`p-4 rounded-lg transition-all ${isDark ? 'glass-card hover-glow' : 'border border-[#d0e8da] hover-lift'}`}
              style={!isDark ? { background: '#ffffff' } : {}}
            >
              <div className="font-display text-3xl" style={{ color: 'var(--tt-accent)' }}>{s.value}</div>
              <div className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 bounce-arrow" style={{ color: 'var(--tt-accent)' }}>
        ↓
      </div>
    </section>
  );
};
