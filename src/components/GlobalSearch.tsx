import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeProvider';
import { EVENTS_DATA, UPDATES_DATA, TEAMS_DATA } from '@/data/searchableData';

interface SearchResult {
  category: 'Events' | 'Updates' | 'Team';
  title: string;
  subtitle: string;
  route: string;
}

function searchAll(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const results: SearchResult[] = [];

  EVENTS_DATA.forEach(e => {
    if ([e.title, e.tag, e.description].some(s => s.toLowerCase().includes(q))) {
      results.push({ category: 'Events', title: e.title, subtitle: `${e.tag} · ${e.date}`, route: '/' });
    }
  });

  UPDATES_DATA.forEach(u => {
    if ([u.title, u.body].some(s => s.toLowerCase().includes(q))) {
      results.push({ category: 'Updates', title: u.title, subtitle: u.date, route: '/' });
    }
  });

  TEAMS_DATA.forEach(dept => {
    dept.members.forEach(m => {
      if ([m.name, m.role, dept.name].some(s => s.toLowerCase().includes(q))) {
        results.push({ category: 'Team', title: m.name, subtitle: `${m.role} · ${dept.name}`, route: '/team' });
      }
    });
  });

  return results;
}

export const GlobalSearch = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = searchAll(query);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)); }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex].route);
      onClose();
    }
  }, [results, activeIndex, navigate, onClose]);

  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  const grouped = results.reduce<Record<string, SearchResult[]>>((acc, r) => {
    (acc[r.category] = acc[r.category] || []).push(r);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24" onClick={onClose}>
      <div className="absolute inset-0" style={{ background: isDark ? 'rgba(0,0,0,0.8)' : 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} />
      <div
        className={`relative w-full max-w-2xl mx-4 rounded-xl overflow-hidden ${isDark ? 'glass-card' : 'bg-white border border-[#d0e8da] shadow-xl'}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-label="Search"
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b" style={{ borderColor: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}>
          <span className="text-lg" style={{ color: 'var(--tt-accent)' }}>🔍</span>
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search events, updates, team members..."
            className="flex-1 bg-transparent outline-none font-body text-sm"
            style={{ color: 'var(--tt-text)' }}
            aria-label="Search input"
          />
          <button onClick={onClose} className="font-mono-label text-xs px-2 py-1 rounded" style={{ color: 'var(--tt-text-muted)', background: isDark ? 'rgba(255,255,255,0.05)' : '#f0faf4' }}>
            ESC
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query && results.length === 0 && (
            <div className="py-12 text-center">
              <span className="text-3xl mb-3 block">🔎</span>
              <p className="font-body text-sm" style={{ color: 'var(--tt-text-muted)' }}>
                No results found for "<span style={{ color: 'var(--tt-text)' }}>{query}</span>"
              </p>
            </div>
          )}

          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-2">
              <p className="font-mono-label text-xs px-3 py-2" style={{ color: 'var(--tt-text-muted)' }}>{category.toUpperCase()}</p>
              {items.map(item => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <button
                    key={`${item.title}-${idx}`}
                    className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-colors ${
                      activeIndex === idx
                        ? isDark ? 'bg-[rgba(0,255,170,0.1)]' : 'bg-[#f0faf4]'
                        : 'hover:bg-[var(--tt-accent)]/5'
                    }`}
                    onClick={() => { navigate(item.route); onClose(); }}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-sm truncate" style={{ color: 'var(--tt-text)' }}>{item.title}</p>
                      <p className="font-mono-label text-xs truncate" style={{ color: 'var(--tt-text-muted)' }}>{item.subtitle}</p>
                    </div>
                    <span className="font-mono-label text-xs" style={{ color: 'var(--tt-accent)' }}>→</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
