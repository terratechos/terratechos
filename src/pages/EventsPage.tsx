import { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { ParticleBackground } from '../components/ParticleBackground';
import { useTheme } from '../components/ThemeProvider';
import { EVENTS_DATA, tagColors } from '@/data/searchableData';
import type { ClubEvent, EventStatus, EventPeriod, EventTag } from '@/data/searchableData';
import { EventDetailModal } from '@/components/EventDetailModal';

const EventsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | EventPeriod>('all');
  const [tagFilter, setTagFilter] = useState<'all' | EventTag>('all');
  const [selectedEvent, setSelectedEvent] = useState<ClubEvent | null>(null);

  const filtered = EVENTS_DATA.filter(e =>
    (statusFilter === 'all' || e.status === statusFilter) &&
    (periodFilter === 'all' || e.period === periodFilter) &&
    (tagFilter === 'all' || e.tag === tagFilter)
  );

  const allTags: EventTag[] = ['Hackathon', 'Workshop', 'Talk', 'Competition', 'Collab'];

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
    <div className="relative min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-10">
            <h1
              className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`}
              style={{ color: 'var(--tt-text)' }}
            >
              ALL EVENTS
            </h1>
            <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>
              BROWSE ALL UPCOMING & ONGOING EVENTS
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-mono-label text-xs self-center mr-1" style={{ color: 'var(--tt-text-muted)' }}>STATUS:</span>
            <FilterBtn active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>ALL</FilterBtn>
            <FilterBtn active={statusFilter === 'ongoing'} onClick={() => setStatusFilter('ongoing')}>🔴 ONGOING</FilterBtn>
            <FilterBtn active={statusFilter === 'upcoming'} onClick={() => setStatusFilter('upcoming')}>UPCOMING</FilterBtn>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="font-mono-label text-xs self-center mr-1" style={{ color: 'var(--tt-text-muted)' }}>PERIOD:</span>
            <FilterBtn active={periodFilter === 'all'} onClick={() => setPeriodFilter('all')}>ALL</FilterBtn>
            <FilterBtn active={periodFilter === 'thisMonth'} onClick={() => setPeriodFilter('thisMonth')}>THIS MONTH</FilterBtn>
            <FilterBtn active={periodFilter === 'nextMonth'} onClick={() => setPeriodFilter('nextMonth')}>NEXT MONTH</FilterBtn>
            <FilterBtn active={periodFilter === 'nextTerm'} onClick={() => setPeriodFilter('nextTerm')}>NEXT TERM</FilterBtn>
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            <span className="font-mono-label text-xs self-center mr-1" style={{ color: 'var(--tt-text-muted)' }}>TYPE:</span>
            <FilterBtn active={tagFilter === 'all'} onClick={() => setTagFilter('all')}>ALL</FilterBtn>
            {allTags.map(tag => (
              <FilterBtn key={tag} active={tagFilter === tag} onClick={() => setTagFilter(tag)}>
                {tag.toUpperCase()}
              </FilterBtn>
            ))}
          </div>

          {/* Results count */}
          <p className="font-mono-label text-xs mb-6" style={{ color: 'var(--tt-text-muted)' }}>
            {filtered.length} EVENT{filtered.length !== 1 ? 'S' : ''} FOUND
          </p>

          {/* Events grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">🗓️</span>
              <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--tt-text)' }}>No events found</h3>
              <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-muted)' }}>Try changing your filters or check back soon.</p>
              <button
                onClick={() => { setStatusFilter('all'); setPeriodFilter('all'); setTagFilter('all'); }}
                className="px-4 py-2 rounded-lg font-mono-label text-xs transition-colors"
                style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(event => {
                const titleSponsors = event.sponsors?.filter(s => s.tier === 'title') || [];
                return (
                  <div
                    key={event.title}
                    className={`relative rounded-xl p-6 transition-all duration-300 flex flex-col ${
                      isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
                    }`}
                    style={!isDark ? { borderBottom: `3px solid ${tagColors[event.tag]}` } : {}}
                  >
                    {event.status === 'ongoing' && (
                      <span className="absolute top-4 right-4 w-3 h-3 rounded-full pulse-dot" style={{ background: '#ff3b3b' }} />
                    )}
                    <span
                      className="inline-block px-2 py-0.5 rounded font-mono-label text-xs mb-3 self-start"
                      style={{ background: `${tagColors[event.tag]}22`, color: tagColors[event.tag] }}
                    >
                      {event.tag}
                    </span>
                    <h3 className="font-body text-lg font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h3>
                    <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{event.date}</p>
                    <p className="font-body text-sm mb-4 flex-1" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>

                    {/* Sponsors preview */}
                    {titleSponsors.length > 0 && (
                      <div className="mb-4">
                        <p className="font-mono-label text-xs mb-1.5" style={{ color: 'var(--tt-text-muted)' }}>POWERED BY</p>
                        <div className="flex flex-wrap gap-1.5">
                          {titleSponsors.map(s => (
                            <span
                              key={s.name}
                              className={`px-2 py-0.5 rounded font-mono-label text-xs ${
                                isDark ? 'bg-[rgba(0,255,170,0.06)]' : 'bg-[#f0faf4]'
                              }`}
                              style={{ color: 'var(--tt-text-muted)' }}
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="font-mono-label text-xs transition-colors self-start"
                      style={{ color: 'var(--tt-accent)' }}
                      aria-label={`View details for ${event.title}`}
                    >
                      VIEW DETAILS →
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
      <EventDetailModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default EventsPage;