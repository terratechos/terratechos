import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { useToast } from '@/hooks/use-toast';
import type { ClubEvent } from '@/data/searchableData';
import { tagColors } from '@/data/searchableData';

interface Props {
  event: ClubEvent | null;
  onClose: () => void;
}

export const EventDetailModal = ({ event, onClose }: Props) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const { toast } = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!event) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      // Focus trap
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
    const url = `${window.location.origin}${window.location.pathname}#/`;
    navigator.clipboard.writeText(url).then(() => {
      toast({ title: 'Link copied!', description: 'Event link copied to clipboard.' });
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: isDark ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }} />
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg rounded-xl overflow-hidden max-h-[85vh] overflow-y-auto ${isDark ? 'glass-card' : 'bg-white border border-[#d0e8da] shadow-xl'}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label={`Event details: ${event.title}`}
        aria-modal="true"
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <span
              className="inline-block px-2 py-0.5 rounded font-mono-label text-xs"
              style={{ background: `${tagColors[event.tag]}22`, color: tagColors[event.tag] }}
            >
              {event.tag}
            </span>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[var(--tt-accent)]/10" aria-label="Close modal">
              <span style={{ color: 'var(--tt-text-muted)' }}>✕</span>
            </button>
          </div>
          <h2 className="font-display text-3xl mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h2>
          <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{event.date}</p>
        </div>

        {/* Description */}
        <div className="px-6 pb-4">
          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>
        </div>

        {/* Details grid */}
        <div className="px-6 pb-4 grid grid-cols-2 gap-3">
          {[
            { label: 'Location', value: event.location },
            { label: 'Format', value: event.format },
            { label: 'Team Size', value: event.teamSize },
            { label: 'Prize', value: event.prize },
          ].map(d => (
            <div key={d.label} className={`rounded-lg p-3 ${isDark ? 'bg-[rgba(255,255,255,0.03)]' : 'bg-[#f0faf4]'}`}>
              <p className="font-mono-label text-xs mb-0.5" style={{ color: 'var(--tt-text-muted)' }}>{d.label}</p>
              <p className="font-body text-sm font-semibold" style={{ color: 'var(--tt-text)' }}>{d.value}</p>
            </div>
          ))}
        </div>

        {/* Expectations */}
        <div className="px-6 pb-4">
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

        {/* Actions */}
        <div className="px-6 pb-6 flex gap-3">
          <a
            href={event.registerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-3 rounded-lg font-mono-label text-xs transition-colors"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
            aria-label={`Register for ${event.title}`}
          >
            REGISTER NOW →
          </a>
          <button
            onClick={handleShare}
            className={`px-4 py-3 rounded-lg font-mono-label text-xs transition-colors ${isDark ? 'bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)]' : 'bg-[#f0faf4] hover:bg-[#e0f0e8] border border-[#d0e8da]'}`}
            style={{ color: 'var(--tt-text-secondary)' }}
            aria-label="Share event link"
          >
            SHARE
          </button>
        </div>
      </div>
    </div>
  );
};
