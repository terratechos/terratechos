import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';

const departments = [
  {
    emoji: '🧠', name: 'Core Committee', color: '#00ffaa',
    members: [
      { name: 'Aditya Sharma', role: 'President' },
      { name: 'Meera Reddy', role: 'Vice President' },
      { name: 'Karan Singh', role: 'Secretary' },
    ],
  },
  {
    emoji: '⚡', name: 'Associate Members', color: '#7b8cff',
    members: [
      { name: 'Rohan Das', role: 'Associate Lead' },
      { name: 'Sneha Gupta', role: 'Associate' },
      { name: 'Vikram Joshi', role: 'Associate' },
    ],
  },
  {
    emoji: '📅', name: 'Event Management', color: '#ff6b35',
    members: [
      { name: 'Priya Nair', role: 'Events Head' },
      { name: 'Amit Kumar', role: 'Logistics' },
      { name: 'Riya Chopra', role: 'Coordinator' },
    ],
  },
  {
    emoji: '💼', name: 'Finance & Management', color: '#ffd166',
    members: [
      { name: 'Deepak Verma', role: 'Finance Head' },
      { name: 'Anjali Mishra', role: 'Treasurer' },
    ],
  },
  {
    emoji: '🎨', name: 'Content & Web', color: '#ff3b6b',
    members: [
      { name: 'Ishaan Malik', role: 'Web Lead' },
      { name: 'Tanvi Shah', role: 'Content Creator' },
      { name: 'Neha Patel', role: 'Designer' },
    ],
  },
];

const InitialsAvatar = ({ name, color, isDark }: { name: string; color: string; isDark: boolean }) => {
  const initials = name.split(' ').map(n => n[0]).join('');
  return (
    <div
      className={`w-14 h-14 rounded-full flex items-center justify-center font-display text-xl ${
        isDark ? '' : 'border-2'
      }`}
      style={{
        background: isDark ? `${color}22` : '#ffffff',
        color: color,
        borderColor: isDark ? 'transparent' : color,
      }}
    >
      {initials}
    </div>
  );
};

const TeamPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            OUR TEAM
          </h1>
          <p className="font-mono-label text-xs mb-12" style={{ color: 'var(--tt-text-muted)' }}>THE PEOPLE BEHIND TERRATECH</p>

          {departments.map((dept, di) => (
            <div
              key={dept.name}
              className="mb-12"
              style={!isDark ? { background: di % 2 === 0 ? '#ffffff' : '#f0faf4', padding: '2rem', borderRadius: '1rem' } : {}}
            >
              <div className="flex items-center gap-3 mb-6 pb-3 border-b" style={{ borderColor: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}>
                <span className="text-2xl">{dept.emoji}</span>
                <h2 className="font-display text-2xl tracking-wider" style={{ color: 'var(--tt-text)' }}>{dept.name.toUpperCase()}</h2>
              </div>

              {isDark ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {dept.members.map(m => (
                    <div key={m.name} className="glass-card hover-glow rounded-xl p-5 flex items-center gap-4 transition-all">
                      <InitialsAvatar name={m.name} color={dept.color} isDark />
                      <div>
                        <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{m.name}</h3>
                        <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{m.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                  {dept.members.map(m => (
                    <div
                      key={m.name}
                      className="min-w-[220px] bg-[#ffffff] border border-[#d0e8da] rounded-xl p-5 flex flex-col items-center gap-3 hover-lift transition-all"
                      style={{ borderTop: `3px solid ${dept.color}` }}
                    >
                      <InitialsAvatar name={m.name} color={dept.color} isDark={false} />
                      <div className="text-center">
                        <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{m.name}</h3>
                        <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{m.role}</p>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full font-mono-label text-xs"
                        style={{ background: `${dept.color}15`, color: dept.color }}
                      >
                        {dept.name}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default TeamPage;
