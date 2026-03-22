import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { X, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const tiers = [
  {
    tier: 'Title Sponsor',
    price: '₹15,000+',
    perks: [
      'Logo on all event banners & posters',
      'Featured on website homepage',
      'Shoutout on all social media channels',
      'Brand presence at every TTC event',
      'Direct access to recruit from our talent pool',
      'Speaking slot at flagship events',
    ],
  },
  {
    tier: 'Associate Partner',
    price: '₹5,000+',
    perks: [
      'Logo on select event materials',
      'Listed on website sponsors section',
      'Social media mention during events',
      'Access to TTC student network',
    ],
  },
];

const whatWeOffer = [
  { icon: '🎯', title: 'Targeted Reach', desc: 'Direct access to 200+ active tech students and a growing alumni network.' },
  { icon: '📣', title: 'Brand Visibility', desc: 'Presence across digital platforms, events, posters, and merchandise.' },
  { icon: '🤝', title: 'Talent Pipeline', desc: 'First-look access to skilled students for internships and placements.' },
  { icon: '🏆', title: 'Event Association', desc: 'Your brand tied to hackathons, workshops, and flagship tech expos.' },
];

export const SponsorsDetailsModal = ({ isOpen, onClose }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, a, input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div
        ref={modalRef}
        className={`relative w-full max-w-2xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-[rgba(10,20,15,0.97)] border border-[rgba(0,255,170,0.15)] shadow-[0_0_40px_rgba(0,255,170,0.08)]'
            : 'bg-white border border-[hsl(var(--border))] shadow-xl'
        }`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Become a Sponsor"
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 pb-4 flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl mb-1" style={{ color: 'var(--tt-text)' }}>
              BECOME A SPONSOR
            </h2>
            <p className="font-body text-sm" style={{ color: 'var(--tt-text-secondary)' }}>
              Partner with TerraTech Club and grow with us.
            </p>
          </div>
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors shrink-0 ${
              isDark ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'hover:bg-muted'
            }`}
            aria-label="Close modal"
          >
            <X className="w-4 h-4" style={{ color: 'var(--tt-text-muted)' }} />
          </button>
        </div>

        <div className="px-6 pb-6 space-y-8">
          {/* Who we are */}
          <div>
            <h3 className="font-display text-lg mb-2" style={{ color: 'var(--tt-text)' }}>WHO WE ARE</h3>
            <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>
              TerraTech Club (TTC) is a student-run technology and innovation club focused on building real-world skills
              through events, projects, and community. We run hackathons, workshops, and expos that bring together
              curious minds from across disciplines.
            </p>
          </div>

          {/* What we offer */}
          <div>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--tt-text)' }}>WHAT WE OFFER YOU</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {whatWeOffer.map(item => (
                <div
                  key={item.title}
                  className={`rounded-lg p-4 ${
                    isDark
                      ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]'
                      : 'bg-muted/40 border border-[hsl(var(--border))]'
                  }`}
                >
                  <p className="text-xl mb-1">{item.icon}</p>
                  <p className="font-body font-semibold text-sm mb-0.5" style={{ color: 'var(--tt-text)' }}>{item.title}</p>
                  <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing tiers */}
          <div>
            <h3 className="font-display text-lg mb-4" style={{ color: 'var(--tt-text)' }}>SPONSORSHIP TIERS</h3>
            <div className="space-y-4">
              {tiers.map((t, i) => (
                <div
                  key={t.tier}
                  className={`rounded-lg p-4 ${
                    isDark
                      ? i === 0
                        ? 'bg-[rgba(0,255,170,0.05)] border border-[rgba(0,255,170,0.2)]'
                        : 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)]'
                      : i === 0
                        ? 'bg-[#f0faf4] border border-[#00a86b]'
                        : 'bg-muted/40 border border-[hsl(var(--border))]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="font-display text-base" style={{ color: 'var(--tt-text)' }}>{t.tier}</p>
                    <span
                      className="font-mono-label text-sm px-3 py-1 rounded-full"
                      style={{
                        background: i === 0 ? 'var(--tt-accent)' : isDark ? 'rgba(255,255,255,0.06)' : '#e5e7eb',
                        color: i === 0 ? (isDark ? '#050a07' : '#fff') : 'var(--tt-text)',
                      }}
                    >
                      {t.price}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {t.perks.map(perk => (
                      <li key={perk} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--tt-accent)' }} />
                        <span className="font-body text-xs" style={{ color: 'var(--tt-text-secondary)' }}>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Note */}
          <p className="font-mono-label text-xs text-center" style={{ color: 'var(--tt-text-muted)' }}>
            * Pricing is flexible. Reach out and we'll tailor a package for you.
          </p>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <a 
              href="/#contact"
              className="flex-1 text-center py-3 rounded-lg font-mono-label text-xs transition-colors"
              style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
              onClick={onClose}
            >
              YES, I'D LIKE TO JOIN →
            </a>
            <button
              onClick={onClose}
              className={`px-6 py-3 rounded-lg font-mono-label text-xs transition-colors ${
                isDark
                  ? 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)]'
                  : 'bg-muted/50 hover:bg-muted border border-[hsl(var(--border))]'
              }`}
              style={{ color: 'var(--tt-text-secondary)' }}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};