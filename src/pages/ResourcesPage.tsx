import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';

const workshopSlides = [
  { title: 'Intro to React', date: 'Feb 2025', tag: 'Web Dev' },
  { title: 'Machine Learning Basics', date: 'Jan 2025', tag: 'AI/ML' },
  { title: 'CTF for Beginners', date: 'Dec 2024', tag: 'Security' },
  { title: 'Git & Open Source 101', date: 'Nov 2024', tag: 'Tools' },
];

const tools = [
  { name: 'Figma', desc: 'Collaborative design tool', category: 'Design', href: 'https://figma.com' },
  { name: 'GitHub Copilot', desc: 'AI-powered code completion', category: 'AI', href: 'https://github.com/features/copilot' },
  { name: 'Vercel', desc: 'Frontend deployment platform', category: 'Deployment', href: 'https://vercel.com' },
  { name: 'Notion', desc: 'All-in-one workspace', category: 'Productivity', href: 'https://notion.so' },
  { name: 'LeetCode', desc: 'Practice coding problems', category: 'DSA', href: 'https://leetcode.com' },
  { name: 'HackTheBox', desc: 'Cybersecurity training', category: 'Security', href: 'https://hackthebox.com' },
];

const readingList: Record<string, { title: string; author: string }[]> = {
  'Web Dev': [
    { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke' },
    { title: 'You Don\'t Know JS', author: 'Kyle Simpson' },
  ],
  'AI / ML': [
    { title: 'Hands-On Machine Learning', author: 'Aurélien Géron' },
    { title: 'Deep Learning', author: 'Ian Goodfellow' },
  ],
  'Security': [
    { title: 'The Web Application Hacker\'s Handbook', author: 'Dafydd Stuttard' },
    { title: 'Hacking: The Art of Exploitation', author: 'Jon Erickson' },
  ],
  'Career': [
    { title: 'Cracking the Coding Interview', author: 'Gayle Laakmann McDowell' },
    { title: 'The Pragmatic Programmer', author: 'David Thomas & Andrew Hunt' },
  ],
};

const tagColorMap: Record<string, string> = {
  'Web Dev': '#ff6b35', 'AI/ML': '#7b8cff', 'Security': '#ff3b6b', 'Tools': '#ffd166',
  'Design': '#ff3b6b', 'AI': '#7b8cff', 'Deployment': '#00a86b', 'Productivity': '#ffd166',
  'DSA': '#ff6b35',
};

const ResourcesPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            RESOURCES
          </h1>
          <p className="font-mono-label text-xs mb-12" style={{ color: 'var(--tt-text-muted)' }}>LEARN · BUILD · GROW</p>

          {/* Workshop Slides */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--tt-text)' }}>WORKSHOP SLIDES</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {workshopSlides.map(ws => (
                <div
                  key={ws.title}
                  className={`rounded-xl p-5 transition-all ${isDark ? 'glass-card hover-glow' : 'bg-white border border-[#d0e8da] hover-lift'}`}
                  style={!isDark ? { borderBottom: `3px solid ${tagColorMap[ws.tag] || 'var(--tt-accent)'}` } : {}}
                >
                  <span className="inline-block px-2 py-0.5 rounded font-mono-label text-xs mb-3"
                    style={{ background: `${tagColorMap[ws.tag] || 'var(--tt-accent)'}22`, color: tagColorMap[ws.tag] || 'var(--tt-accent)' }}>
                    {ws.tag}
                  </span>
                  <h3 className="font-body text-sm font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{ws.title}</h3>
                  <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{ws.date}</p>
                  <a href="#" className="font-mono-label text-xs transition-colors" style={{ color: 'var(--tt-accent)' }}>Download PDF →</a>
                </div>
              ))}
            </div>
          </section>

          {/* GitHub */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--tt-text)' }}>GITHUB ORGANIZATION</h2>
            <div className={`rounded-xl p-8 flex flex-col sm:flex-row items-center gap-6 ${isDark ? 'glass-card' : 'bg-white border border-[#d0e8da]'}`}>
              <span className="text-5xl">🐙</span>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-body text-lg font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>TerraTech on GitHub</h3>
                <p className="font-body text-sm mb-3" style={{ color: 'var(--tt-text-secondary)' }}>Explore our open-source projects, workshop code, and community contributions.</p>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="inline-block px-5 py-2.5 rounded-lg font-mono-label text-xs transition-colors"
                  style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}>
                  View TerraTech GitHub →
                </a>
              </div>
            </div>
          </section>

          {/* Useful Tools */}
          <section className="mb-16">
            <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--tt-text)' }}>USEFUL TOOLS</h2>
            <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
              {tools.map(t => (
                <div
                  key={t.name}
                  className={`min-w-[200px] rounded-xl p-5 flex-shrink-0 transition-all ${isDark ? 'glass-card hover-glow' : 'bg-white border border-[#d0e8da] hover-lift'}`}
                >
                  <span className="inline-block px-2 py-0.5 rounded font-mono-label text-xs mb-3"
                    style={{ background: `${tagColorMap[t.category] || 'var(--tt-accent)'}22`, color: tagColorMap[t.category] || 'var(--tt-accent)' }}>
                    {t.category}
                  </span>
                  <h3 className="font-body text-sm font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{t.name}</h3>
                  <p className="font-body text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{t.desc}</p>
                  <a href={t.href} target="_blank" rel="noopener noreferrer" className="font-mono-label text-xs" style={{ color: 'var(--tt-accent)' }}>Visit →</a>
                </div>
              ))}
            </div>
          </section>

          {/* Reading List */}
          <section>
            <h2 className="font-display text-2xl mb-6" style={{ color: 'var(--tt-text)' }}>READING LIST</h2>
            <div className="space-y-3">
              {Object.entries(readingList).map(([category, books]) => (
                <div
                  key={category}
                  className={`rounded-xl overflow-hidden transition-all ${isDark ? 'glass-card' : 'bg-white border border-[#d0e8da]'}`}
                >
                  <button
                    onClick={() => setOpenCategory(openCategory === category ? null : category)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{category}</span>
                    <span className="font-mono-label text-lg" style={{ color: 'var(--tt-accent)' }}>
                      {openCategory === category ? '−' : '+'}
                    </span>
                  </button>
                  {openCategory === category && (
                    <div className="px-5 pb-5 space-y-3" style={!isDark ? { background: '#f0faf4' } : {}}>
                      {books.map(b => (
                        <div key={b.title} className="flex items-start gap-3">
                          <span style={{ color: 'var(--tt-accent)' }}>▸</span>
                          <div>
                            <p className="font-body text-sm font-semibold" style={{ color: 'var(--tt-text)' }}>{b.title}</p>
                            <p className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{b.author}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default ResourcesPage;
