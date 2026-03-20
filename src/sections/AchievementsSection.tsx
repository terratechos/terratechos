import { useRef, useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { ACHIEVEMENTS_DATA } from '@/data/searchableData';

export const AchievementsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    el?.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => { el?.removeEventListener('scroll', checkScroll); window.removeEventListener('resize', checkScroll); };
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <section ref={ref} id="achievements" className="section-fade py-28 px-4" style={{ background: isDark ? 'transparent' : 'var(--tt-bg)' }}>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className={`font-display text-4xl sm:text-5xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
              ACHIEVEMENTS
            </h2>
            <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>OUR PROUDEST MOMENTS</p>
          </div>
          <div className="hidden sm:flex gap-3">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono-label text-sm transition-all disabled:opacity-30 ${
                isDark ? 'glass-card hover:bg-[rgba(0,255,170,0.1)]' : 'bg-white border border-[#d0e8da] hover:border-[#00a86b]'
              }`}
              style={{ color: 'var(--tt-text)' }}
              aria-label="Scroll left"
            >
              ←
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono-label text-sm transition-all disabled:opacity-30 ${
                isDark ? 'glass-card hover:bg-[rgba(0,255,170,0.1)]' : 'bg-white border border-[#d0e8da] hover:border-[#00a86b]'
              }`}
              style={{ color: 'var(--tt-text)' }}
              aria-label="Scroll right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 achievements-scroller"
        >
          {ACHIEVEMENTS_DATA.map((a, i) => (
            <div
              key={i}
              className={`min-w-[260px] max-w-[280px] rounded-xl p-5 flex-shrink-0 transition-all ${
                isDark
                  ? 'glass-card hover-glow'
                  : 'bg-white border border-[#d0e8da] hover-lift'
              }`}
              style={!isDark ? { borderLeft: `4px solid ${a.tagColor}` } : {}}
            >
              <span className="text-3xl mb-3 block">{a.emoji}</span>
              <h3 className="font-body text-sm font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{a.title}</h3>
              <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{a.team}</p>
              <span
                className="inline-block px-2 py-0.5 rounded-full font-mono-label text-xs font-semibold"
                style={{
                  background: isDark ? `${a.tagColor}22` : `${a.tagColor}15`,
                  color: a.tagColor,
                }}
              >
                {a.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};