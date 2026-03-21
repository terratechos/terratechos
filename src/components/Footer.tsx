import { Link } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { DiscordIcon } from './icons/DiscordIcon';

const footerLinks = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Community', href: '/community' },
  { label: 'Alumni', href: '/alumni' },
  { label: 'Join Us', href: '/join' },
];

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/terratech-OS', icon: <Github className="w-5 h-5" /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/groups/14553246/', icon: <Linkedin className="w-5 h-5" /> },
  { label: 'Instagram', href: 'https://www.instagram.com/terratech_nceh', icon: <Instagram className="w-5 h-5" /> },
  { label: 'Discord', href: 'https://discord.gg/gfYFcsTTRh', icon: <DiscordIcon className="w-5 h-5" /> },
];

export const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <footer
      className={`py-12 border-t ${isDark ? 'border-[rgba(0,255,170,0.1)]' : 'border-[#d0e8da]'}`}
      style={{ background: isDark ? 'rgba(0,0,0,0.4)' : '#f0faf4' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-4xl tracking-wider mb-6" style={{ color: 'var(--tt-accent)' }}>
          TERRATECH
        </h2>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {footerLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className="font-mono-label text-xs transition-colors hover:opacity-80"
              style={{ color: 'var(--tt-text-secondary)' }}
            >
              {link.label.toUpperCase()}
            </Link>
          ))}
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map(s => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              className="w-10 h-10 flex items-center justify-center rounded-lg transition-all hover:scale-110 hover:opacity-80"
              style={{ color: 'var(--tt-text-secondary)' }}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>
          © 2025 TERRATECH · BUILT WITH ♥ BY CONTENT & WEB TEAM
        </p>
      </div>
    </footer>
  );
};
