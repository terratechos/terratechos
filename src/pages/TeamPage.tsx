import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { TEAMS_DATA } from '@/data/searchableData';

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

          {TEAMS_DATA.map((dept, di) => (
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
                      <div className="flex-1">
                        <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{m.name}</h3>
                        <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{m.role}</p>
                      </div>
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: dept.color }}>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.791 0-9.714h3.554v1.377c.43-.664 1.2-1.61 2.923-1.61 2.135 0 3.73 1.401 3.73 4.413v5.534zM5.337 9.342c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.957-1.71 1.187 0 1.914.754 1.937 1.71 0 .951-.75 1.71-1.979 1.71zm1.581 11.11H3.737V9.558h3.18v10.894zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                          </svg>
                        </a>
                      )}
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
                      <div className="text-center flex-1">
                        <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{m.name}</h3>
                        <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{m.role}</p>
                      </div>
                      <span
                        className="px-2 py-0.5 rounded-full font-mono-label text-xs"
                        style={{ background: `${dept.color}15`, color: dept.color }}
                      >
                        {dept.name}
                      </span>
                      {m.linkedin && (
                        <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="transition-transform hover:scale-110 mt-2">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: dept.color }}>
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.732-2.004 1.438-.103.25-.129.599-.129.948v5.419h-3.554s.05-8.791 0-9.714h3.554v1.377c.43-.664 1.2-1.61 2.923-1.61 2.135 0 3.73 1.401 3.73 4.413v5.534zM5.337 9.342c-1.144 0-1.915-.759-1.915-1.71 0-.956.77-1.71 1.957-1.71 1.187 0 1.914.754 1.937 1.71 0 .951-.75 1.71-1.979 1.71zm1.581 11.11H3.737V9.558h3.18v10.894zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                          </svg>
                        </a>
                      )}
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
