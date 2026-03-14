import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/#about' },
  { label: 'Events', href: '/#events' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Community', href: '/community' },
  { label: 'Updates', href: '/#updates' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Join Us', href: '/join' },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname === '/') {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'backdrop-blur-xl bg-[rgba(5,10,7,0.85)] border-b border-[rgba(0,255,170,0.1)]'
            : 'bg-[#ffffff] border-b border-[#d0e8da] shadow-sm'
          : isDark
            ? 'bg-transparent'
            : 'bg-[#ffffff]/80 backdrop-blur-sm'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="font-display text-2xl tracking-wider" style={{ color: 'var(--tt-accent)' }}>
            TERRA<span style={{ color: 'var(--tt-text)' }}>TECH</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href.startsWith('/#') ? (location.pathname === '/' ? link.href : `/${link.href}`) : link.href}
                onClick={() => handleNavClick(link.href)}
                className="font-mono-label text-xs px-3 py-2 rounded-md transition-colors hover:bg-[var(--tt-accent)]/10"
                style={{ color: 'var(--tt-text-secondary)' }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--tt-accent)]/10"
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--tt-accent)]/10"
              aria-label="Toggle menu"
            >
              <div className="space-y-1.5">
                <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--tt-text)' }} />
                <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ background: 'var(--tt-text)' }} />
                <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--tt-text)' }} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className={`lg:hidden border-t ${isDark ? 'bg-[rgba(5,10,7,0.95)] border-[rgba(0,255,170,0.1)]' : 'bg-[#ffffff] border-[#d0e8da]'}`}>
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.label}
                to={link.href.startsWith('/#') ? (location.pathname === '/' ? link.href : `/${link.href}`) : link.href}
                onClick={() => handleNavClick(link.href)}
                className="block font-mono-label text-sm px-3 py-2 rounded-md transition-colors hover:bg-[var(--tt-accent)]/10"
                style={{ color: 'var(--tt-text-secondary)' }}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
