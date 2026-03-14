import { Link } from 'react-router-dom';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';

const NotFound = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      {isDark && (
        <div className="absolute inset-0 pointer-events-none opacity-10">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-px"
              style={{
                top: `${12 * i}%`,
                background: 'rgba(0,255,170,0.3)',
                animation: `scanline ${3 + i * 0.5}s linear infinite`,
              }}
            />
          ))}
        </div>
      )}
      {!isDark && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: 60 + i * 30,
                height: 60 + i * 30,
                top: `${20 + i * 15}%`,
                left: `${10 + i * 18}%`,
                background: 'rgba(0,168,107,0.05)',
                animation: `bounce-arrow ${3 + i}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      )}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1
          className="font-display text-[8rem] sm:text-[12rem] leading-none mb-4"
          style={isDark
            ? { color: 'transparent', WebkitTextStroke: '3px #00ffaa' }
            : { background: 'linear-gradient(135deg, #0d2419, #00a86b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
          }
        >
          404
        </h1>
        <h2 className="font-body text-xl font-semibold mb-2" style={{ color: 'var(--tt-text)' }}>
          Looks like this page got lost in the matrix.
        </h2>
        <p className="font-body text-sm mb-8" style={{ color: 'var(--tt-text-secondary)' }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 rounded-lg font-mono-label text-sm"
          style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
        >
          ← BACK TO HOME
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
