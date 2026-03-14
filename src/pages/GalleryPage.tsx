import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';

const items = [
  { title: 'HackTerra 2024', desc: 'Our flagship 48-hour hackathon event' },
  { title: 'DevTalks Vol.2', desc: 'Industry speakers sharing their journey' },
  { title: 'CTF Prelims', desc: 'Cybersecurity capture the flag competition' },
  { title: 'AI Summit', desc: 'Exploring the frontiers of artificial intelligence' },
  { title: 'Open Day', desc: 'Welcoming new students to TerraTech' },
  { title: 'Club Induction', desc: 'Inaugural ceremony and team introductions' },
];

const GalleryPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            GALLERY
          </h1>
          <p className="font-mono-label text-xs mb-12" style={{ color: 'var(--tt-text-muted)' }}>MOMENTS & MEMORIES</p>

          {isDark ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item, i) => (
                <div
                  key={item.title}
                  className="relative rounded-xl overflow-hidden glass-card transition-all"
                  style={{ height: (i === 0 || i === 4) ? 260 : 180 }}>
                >
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0,255,170,0.05), rgba(5,10,7,0.8))',
                    backgroundImage: `repeating-linear-gradient(0deg, rgba(0,255,170,0.03) 0px, rgba(0,255,170,0.03) 1px, transparent 1px, transparent 20px),
                      repeating-linear-gradient(90deg, rgba(0,255,170,0.03) 0px, rgba(0,255,170,0.03) 1px, transparent 1px, transparent 20px)`,
                  }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 p-4">
                    <h3 className="font-display text-2xl mb-1" style={{ color: '#00ffaa' }}>{item.title}</h3>
                    <p className="font-body text-sm text-center" style={{ color: '#9ab8ae' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {items.map((item) => (
                <div key={item.title} className="break-inside-avoid bg-[#ffffff] border border-[#d0e8da] rounded-xl overflow-hidden transition-all">
                  <div
                    className="w-full border-b-2 border-[#00a86b]"
                    style={{
                      height: 160 + Math.random() * 80,
                      background: 'linear-gradient(135deg, #f0faf4, #e0f5eb)',
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-body font-bold text-sm mb-1" style={{ color: 'var(--tt-text)' }}>{item.title}</h3>
                    <p className="font-body text-xs" style={{ color: 'var(--tt-text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default GalleryPage;
