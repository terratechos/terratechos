import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

type EventStatus = 'ongoing' | 'upcoming';
type EventPeriod = 'thisMonth' | 'nextMonth' | 'nextTerm';
type EventTag = 'Hackathon' | 'Workshop' | 'Talk' | 'Competition' | 'Collab';

interface ClubEvent {
  title: string;
  tag: EventTag;
  date: string;
  status: EventStatus;
  period: EventPeriod;
  description: string;
}

const tagColors: Record<EventTag, string> = {
  Hackathon: '#ff6b35',
  Workshop: 'var(--tt-accent)',
  Talk: '#7b8cff',
  Competition: '#ff3b6b',
  Collab: '#ffd166',
};

const events: ClubEvent[] = [
  { title: 'HackTerra 2025', tag: 'Hackathon', date: 'Mar 10–12', status: 'ongoing', period: 'thisMonth', description: '48-hour hackathon with industry mentors and prizes' },
  { title: 'AI Workshop Series', tag: 'Workshop', date: 'Mar 15', status: 'ongoing', period: 'thisMonth', description: 'Hands-on workshop covering ML fundamentals and deployment' },
  { title: 'DevTalks Vol.3', tag: 'Talk', date: 'Apr 5', status: 'upcoming', period: 'nextMonth', description: 'Industry speakers on cloud-native, web3, and OSS' },
  { title: 'CTF Championship', tag: 'Competition', date: 'Apr 20', status: 'upcoming', period: 'nextMonth', description: 'Capture the flag security competition' },
  { title: 'Open Source Sprint', tag: 'Collab', date: 'May 1', status: 'upcoming', period: 'nextTerm', description: 'Contribute to real open source projects' },
  { title: 'Annual Tech Fest', tag: 'Hackathon', date: 'Jun 14', status: 'upcoming', period: 'nextTerm', description: 'Our flagship annual technology festival' },
];

export const EventsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [statusFilter, setStatusFilter] = useState<'all' | EventStatus>('all');
  const [periodFilter, setPeriodFilter] = useState<'all' | EventPeriod>('all');

  const filtered = events.filter(e =>
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
    <section ref={ref} id="events" className="section-fade py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`font-display text-4xl sm:text-5xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`}
          style={{ color: 'var(--tt-text)' }}
        >
          EVENTS
        </h2>
        <p className="font-mono-label text-xs mb-8" style={{ color: 'var(--tt-text-muted)' }}>UPCOMING & ONGOING</p>

        <div className="flex flex-wrap gap-2 mb-8">
          <FilterBtn active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>ALL</FilterBtn>
          <FilterBtn active={statusFilter === 'ongoing'} onClick={() => setStatusFilter('ongoing')}>🔴 ONGOING</FilterBtn>
          <FilterBtn active={statusFilter === 'upcoming'} onClick={() => setStatusFilter('upcoming')}>UPCOMING</FilterBtn>
          <span className="w-px mx-2" style={{ background: 'var(--tt-card-border)' }} />
          <FilterBtn active={periodFilter === 'all'} onClick={() => setPeriodFilter('all')}>ALL</FilterBtn>
          <FilterBtn active={periodFilter === 'thisMonth'} onClick={() => setPeriodFilter('thisMonth')}>THIS MONTH</FilterBtn>
          <FilterBtn active={periodFilter === 'nextMonth'} onClick={() => setPeriodFilter('nextMonth')}>NEXT MONTH</FilterBtn>
          <FilterBtn active={periodFilter === 'nextTerm'} onClick={() => setPeriodFilter('nextTerm')}>NEXT TERM</FilterBtn>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(event => (
            <div
              key={event.title}
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
              <h3 className="font-body text-lg font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{event.title}</h3>
              <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{event.date}</p>
              <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>{event.description}</p>
              <button
                className="font-mono-label text-xs transition-colors"
                style={{ color: 'var(--tt-accent)' }}
              >
                REGISTER →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
