import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useTheme } from './ThemeProvider';
import type { ClubEvent } from '@/data/searchableData';
import { tagColors, generateEventSlug } from '@/data/searchableData';
import { X, Share2, ExternalLink, Building2 } from 'lucide-react';

interface Props {
  event: ClubEvent | null;
  onClose: () => void;
}

export const EventDetailModal = ({ event, onClose }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>('button, a, input, [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = ''; };
  }, [event, onClose]);

  if (!event) return null;

  const handleShare = () => {
    const slug = generateEventSlug(event);
    const url = `https://terratech.com/events/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      toast.success('Copied! Event link copied to clipboard.');
    }).catch(() => {
      toast.error('Failed to copy link. Please try again.');
    });
  };

  const titleSponsors = event.sponsors?.filter(s => s.tier === 'title') || [];
  const associateSponsors = event.sponsors?.filter(s => s.tier === 'associate') || [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
      <div
        className="absolute inset-0"
        style={{
          background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)',
          backdropFilter: 'blur(4px)',
        }}
      />
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg lg:max-w-3xl rounded-xl overflow-hidden max-h-[90vh] overflow-y-auto ${
          isDark
            ? 'bg-[rgba(10,20,15,0.95)] border border-[rgba(0,255,170,0.15)] shadow-[0_0_40px_rgba(0,255,170,0.08)]'
            : 'bg-white border border-[hsl(var(--border))] shadow-xl'
        }`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label={`Event details: ${event.title}`}
        aria-modal="true"
      >
        {/* Header — full width */}
        <div className="p-4 sm:p-6 pb-3 sm:pb-4">
          <div className="flex items-start justify-between mb-3">
            <span
              className="inline-block px-2 py-0.5 rounded font-mono-label text-xs"
              style={{ background: `${tagColors[event.tag]}22`, color: tagColors[event.tag] }}
            >
              {event.tag}
            </span>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                isDark ? 'hover:bg-[rgba(255,255,255,0.1)]' : 'hover:bg-muted'
              }`}
              aria-label="Close modal"
            >
              <X className="w-4 h-4" style={{ color: 'var(--tt-text-muted)' }} />
            </button>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h2>
          <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{event.date}</p>
        </div>

        {/* 2-col body on lg */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-6">
          {/* Left column */}
          <div>
            {/* Description */}
            <div className="px-4 sm:px-6 pb-4">
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>
            </div>

        {/* Details grid */}
        <div className="px-4 sm:px-6 pb-4 grid grid-cols-2 gap-2 sm:gap-3">
          {[
            { label: 'Location', value: event.location },
            { label: 'Format', value: event.format },
            { label: 'Team Size', value: event.teamSize },
            { label: 'Prize', value: event.prize },
          ].map(d => (
            <div
              key={d.label}
              className={`rounded-lg p-2.5 sm:p-3 ${
                isDark ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]' : 'bg-muted/50 border border-[hsl(var(--border))]'
              }`}
            >
              <p className="font-mono-label text-[10px] sm:text-xs mb-0.5" style={{ color: 'var(--tt-text-muted)' }}>{d.label}</p>
              <p className="font-body text-xs sm:text-sm font-semibold" style={{ color: 'var(--tt-text)' }}>{d.value}</p>
            </div>
          ))}
        </div>

        {/* Expectations */}
        <div className="px-4 sm:px-6 pb-4">
          <h3 className="font-display text-lg mb-2" style={{ color: 'var(--tt-text)' }}>WHAT TO EXPECT</h3>
          <ul className="space-y-2">
            {event.expectations.map((exp, i) => (
              <li key={i} className="flex items-start gap-2">
                <span style={{ color: 'var(--tt-accent)' }}>▸</span>
                <span className="font-body text-sm" style={{ color: 'var(--tt-text-secondary)' }}>{exp}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Sponsors & Partners */}
        {(titleSponsors.length > 0 || associateSponsors.length > 0) && (
          <div className="px-4 sm:px-6 pb-4">
            <h3 className="font-display text-lg mb-3" style={{ color: 'var(--tt-text)' }}>SPONSORS & PARTNERS</h3>
            {titleSponsors.length > 0 && (
              <div className="mb-3">
                <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>TITLE SPONSORS</p>
                <div className="flex flex-wrap gap-2">
                  {titleSponsors.map(s => (
                    <span
                      key={s.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono-label text-xs ${
                        isDark
                          ? 'bg-[rgba(0,255,170,0.08)] border border-[rgba(0,255,170,0.15)]'
                          : 'bg-muted/60 border border-[hsl(var(--border))]'
                      }`}
                      style={{ color: 'var(--tt-text)' }}
                    >
                      <Building2 className="w-3.5 h-3.5" style={{ color: 'var(--tt-accent)' }} />
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {associateSponsors.length > 0 && (
              <div>
                <p className="font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>ASSOCIATE PARTNERS</p>
                <div className="flex flex-wrap gap-2">
                  {associateSponsors.map(s => (
                    <span
                      key={s.name}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg font-mono-label text-xs ${
                        isDark ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)]' : 'bg-muted/30 border border-[hsl(var(--border))]'
                      }`}
                      style={{ color: 'var(--tt-text-secondary)' }}
                    >
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Actions — full width */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 flex gap-3">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 rounded-lg font-mono-label text-xs transition-colors inline-flex items-center justify-center gap-2"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
            aria-label={`Register for ${event.title}`}
          >
            REGISTER NOW
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={handleShare}
            className={`px-4 py-3 rounded-lg font-mono-label text-xs transition-colors inline-flex items-center gap-2 ${
              isDark
                ? 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.08)]'
                : 'bg-muted/50 hover:bg-muted border border-[hsl(var(--border))]'
            }`}
            style={{ color: 'var(--tt-text-secondary)' }}
            aria-label="Share event link"
          >
            <Share2 className="w-3.5 h-3.5" />
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};
