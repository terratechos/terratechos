import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { Link } from 'react-router-dom';
import { alumni, years } from '../data/AlumniData';  // ← import, not hardcode
import type { YearFilter } from '../data/AlumniData';

const AlumniPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [filter, setFilter] = useState<YearFilter>('All');

  const filtered = filter === 'All' ? alumni : alumni.filter(a => a.batch === parseInt(filter));

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            OUR ALUMNI
          </h1>
<p className="font-body text-lg mb-2" style={{ color: 'var(--tt-text-secondary)' }}>The builders who started here</p>
<p className="font-mono-label text-xs mb-8" style={{ color: 'var(--tt-text-secondary)', opacity: 0.6 }}>
  * Roles listed reflect each alumni's first internship or job at the time of their graduation year.
</p>
          <div className="flex gap-3 mb-10">
            {years.map(y => (
              <button
                key={y}
                onClick={() => setFilter(y)}
                className={`px-4 py-2 rounded-lg font-mono-label text-xs transition-all ${
                  filter === y
                    ? isDark ? 'bg-[rgba(0,255,170,0.15)] text-[#00ffaa]' : 'bg-[#00a86b] text-white'
                    : isDark ? 'text-[#9ab8ae] hover:bg-[rgba(255,255,255,0.05)]' : 'text-[#4a8066] hover:bg-[#f0faf4] border border-[#d0e8da]'
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filtered.map(a => {
              const initials = a.name.split(' ').map(n => n[0]).join('');
              return (
                <div
                  key={a.name}
                  className={`rounded-xl p-6 transition-all ${
                    isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                  }`}
                  style={!isDark ? { borderTop: '3px solid #00a86b' } : {}}
                >
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-display text-xl mb-4 ${
                      isDark ? '' : 'border-2 border-[#00a86b]'
                    }`}
                    style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#ffffff', color: 'var(--tt-accent)' }}
                  >
                    {initials}
                  </div>
                  <h3 className="font-body font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{a.name}</h3>
                  <p className="font-mono-label text-xs mb-1" style={{ color: 'var(--tt-accent)' }}>BATCH {a.batch}</p>
                  <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>{a.role}</p>
                  
                   <a href={a.linkedin}
                    className="font-mono-label text-xs transition-colors"
                    style={{ color: 'var(--tt-accent)' }}
                    aria-label={`${a.name}'s LinkedIn profile`}
                  >
                    LINKEDIN →
                  </a>
                </div>
              );
            })}
          </div>

          <div className={`rounded-xl p-8 text-center ${isDark ? 'glass-card' : 'bg-[#f0faf4] border border-[#d0e8da]'}`}>
            <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--tt-text)' }}>ARE YOU A TERRATECH ALUMNI?</h3>
            <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>We'd love to hear from you and showcase your journey.</p>
            <Link
              to="https://forms.gle/alumni-form"
              className="inline-block px-6 py-3 rounded-lg font-mono-label text-sm"
              style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
            >
              GET IN TOUCH →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default AlumniPage;