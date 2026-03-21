import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { GlobalSearch } from './GlobalSearch';
import { Search, Sun, Moon } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/', section: '' },
  { label: 'About', href: '/', section: 'about' },
  { label: 'Events', href: '/', section: 'events' },
  { label: 'Updates', href: '/', section: 'updates' },
  { label: 'Team', href: '/team', section: '' },
  { label: 'Gallery', href: '/gallery', section: '' },
  { label: 'Community', href: '/community', section: '' },
  { label: 'Alumni', href: '/alumni', section: '' },
  { label: 'Contact', href: '/', section: 'contact' },
  { label: 'Join Us', href: '/join', section: '' },
];

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  // Close mobile nav on outside click
  useEffect(() => {
    if (!mobileOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [mobileOpen]);

  // Cmd/Ctrl+K shortcut for search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(s => !s);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (link.label === 'Home') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileOpen(false);
      }
      return;
    }

    if (link.section) {
      e.preventDefault();
      const targetHash = `#${link.section}`;
      
      // If we're already on home, just update the hash and scroll smoothly
      if (location.pathname === '/') {
        const el = document.getElementById(link.section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          window.history.pushState(null, '', `/${targetHash}`);
        }
      } else {
        // Navigate to home page with the target hash
        navigate(`/${targetHash}`);
      }
      setMobileOpen(false);
    }
  };

  const isActive = (link: typeof navLinks[0]) => {
    // For section links (About, Events, etc on home), don't highlight as active
    if (link.section) {
      return false;
    }
    // For standalone pages
    if (link.href !== '/') {
      return location.pathname === link.href;
    }
    return location.pathname === '/';
  };

  const isDark = theme === 'dark';

  return (
    <>
      <nav
        ref={navRef}
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

            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map(link => {
                const isJoinButton = link.label === 'Join Us';
                const active = isActive(link);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`font-mono-label text-xs px-3 py-2 rounded-md transition-all ${
                      isJoinButton
                        ? 'font-semibold hover:opacity-90'
                        : active
                          ? isDark ? 'bg-[rgba(0,255,170,0.12)]' : 'bg-[#e8f5ef]'
                          : 'hover:bg-[var(--tt-accent)]/10'
                    }`}
                    style={isJoinButton ? {
                      background: 'var(--tt-accent)',
                      color: isDark ? '#050a07' : '#ffffff'
                    } : {
                      color: active ? 'var(--tt-accent)' : 'var(--tt-text-secondary)'
                    }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--tt-accent)]/10"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" style={{ color: 'var(--tt-text-secondary)' }} />
              </button>
              <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--tt-accent)]/10"
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              >
                {isDark ? <Sun className="w-5 h-5" style={{ color: 'var(--tt-text-secondary)' }} /> : <Moon className="w-5 h-5" style={{ color: 'var(--tt-text-secondary)' }} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[var(--tt-accent)]/10"
                aria-label="Toggle menu"
              >
                <div className="space-y-2">
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
            <div className="px-4 py-4 space-y-2">
              {navLinks.map(link => {
                const isJoinButton = link.label === 'Join Us';
                const active = isActive(link);
                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`block font-mono-label text-sm px-3 py-2 rounded-md transition-all ${
                      isJoinButton
                        ? 'font-semibold hover:opacity-90'
                        : active
                          ? isDark ? 'bg-[rgba(0,255,170,0.12)]' : 'bg-[#e8f5ef]'
                          : 'hover:bg-[var(--tt-accent)]/10'
                    }`}
                    style={isJoinButton ? {
                      background: 'var(--tt-accent)',
                      color: isDark ? '#050a07' : '#ffffff'
                    } : {
                      color: active ? 'var(--tt-accent)' : 'var(--tt-text-secondary)'
                    }}
                  >
                    {link.label.toUpperCase()}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
      <GlobalSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};