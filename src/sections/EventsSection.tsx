import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { EVENTS_DATA, tagColors } from '@/data/searchableData';
import type { ClubEvent, EventStatus, EventPeriod } from '@/data/searchableData';
import { EventDetailModal } from '@/components/EventDetailModal';

export const EventsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | EventPeriod>('all');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  const filtered = EVENTS_DATA.filter(e =>
    (statusFilter === 'all' || e.status === statusFilter) &&
    (periodFilter === 'all' || e.period === periodFilter)
  );

  const FilterBtn = ({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-md font-mono-label text-xs transition-all ${
        active
          ? isDark ? 'bg-[rgba(0,255,170,0.15)] text-[#00ffaa]' : 'bg-[#00a86b] text-white'
          : isDark ? 'text-[#9ab8ae] hover:bg-[rgba(255,255,255,0.05)]' : 'text-[#4a8066] hover:bg-[#f0faf4]'
      }`}
    >
      {children}
    </button>
  );

  return (
    <>
      <section ref={ref} id="events" className="section-fade py-28 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`font-display text-4xl sm:text-5xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`}
            style={{ color: 'var(--tt-text)' }}
          >
            EVENTS
          </h2>
          <p className="font-mono-label text-xs mb-8" style={{ color: 'var(--tt-text-muted)' }}>UPCOMING & ONGOING</p>

          <div className="flex flex-wrap gap-3 mb-8">
            <FilterBtn active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>ALL</FilterBtn>
            <FilterBtn active={statusFilter === 'ongoing'} onClick={() => setStatusFilter('ongoing')}>🔴 ONGOING</FilterBtn>
            <FilterBtn active={statusFilter === 'upcoming'} onClick={() => setStatusFilter('upcoming')}>UPCOMING</FilterBtn>
            <span className="w-px mx-2" style={{ background: 'var(--tt-card-border)' }} />
            <FilterBtn active={periodFilter === 'all'} onClick={() => setPeriodFilter('all')}>ALL</FilterBtn>
            <FilterBtn active={periodFilter === 'thisMonth'} onClick={() => setPeriodFilter('thisMonth')}>THIS MONTH</FilterBtn>
            <FilterBtn active={periodFilter === 'nextMonth'} onClick={() => setPeriodFilter('nextMonth')}>NEXT MONTH</FilterBtn>
            <FilterBtn active={periodFilter === 'nextTerm'} onClick={() => setPeriodFilter('nextTerm')}>NEXT TERM</FilterBtn>
          </div>

          <div className="flex justify-end mb-6">
            <Link
              to="/events"
              className="font-mono-label text-xs transition-colors hover:underline"
              style={{ color: 'var(--tt-accent)' }}
            >
              VIEW ALL EVENTS →
            </Link>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🗓️</span>
              <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--tt-text)' }}>No events found</h3>
              <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-muted)' }}>Try changing your filters or check back soon.</p>
              <button
                onClick={() => { setStatusFilter('all'); setPeriodFilter('all'); }}
                className="px-4 py-2 rounded-lg font-mono-label text-xs transition-colors"
                style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(event => (
                <div
                  key={event.id}
                  id={event.id}
                  data-event-id={event.id}
                  className={`relative rounded-xl p-6 transition-all duration-300 ${
                    isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                  }`}
                  style={!isDark ? { borderBottom: `3px solid ${tagColors[event.tag]}` } : {}}
                >
                  {event.status === 'ongoing' && (
                    <span className="absolute top-4 right-4 w-3 h-3 rounded-full pulse-dot" style={{ background: '#ff3b3b' }} />
                  )}
                  <span
                    className="inline-block px-2 py-0.5 rounded font-mono-label text-xs mb-3"
                    style={{ background: `${tagColors[event.tag]}22`, color: tagColors[event.tag] }}
                  >
                    {event.tag}
                  </span>
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="font-body text-lg font-semibold flex-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h3>
                    <span className="font-mono-label text-xs px-2 py-0.5 rounded whitespace-nowrap" style={{ background: 'rgba(0,0,0,0.1)', color: 'var(--tt-text-muted)' }}>{event.id}</span>
                  </div>
                  <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{event.date}</p>
                  <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="font-mono-label text-xs transition-colors"
                    style={{ color: 'var(--tt-accent)' }}
                    aria-label={`Register for ${event.title}`}
                  >
                    REGISTER →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </>
  );
};
