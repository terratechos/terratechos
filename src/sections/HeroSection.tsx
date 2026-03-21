import { useTheme } from '../components/ThemeProvider';
import { TypewriterText } from '../components/TypewriterText';
import { useSectionFade } from '../hooks/useSectionFade';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const stats = [
  { value: '100+', label: 'Members' },
  { value: '30+', label: 'Events' },
  { value: '12', label: 'Industry Talks' },
  { value: '2024', label: 'Founded' },
];

export const HeroSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section 
      ref={ref} 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="section-fade min-h-screen flex flex-col items-center justify-center relative px-4 pt-20 pb-12 overflow-hidden" 
      style={{ perspective: "1500px" }}
    >
      {!isDark && <div className="absolute inset-0 dot-grid-bg opacity-40" />}
      {isDark && (
        <>
          {/* 3D Floating Wireframes */}
          <motion.div 
            className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-[#00ffaa]/20 rounded-xl"
            style={{ transformStyle: 'preserve-3d' }} 
            animate={{ rotateX: [0, 360], rotateY: [0, 360], rotateZ: [0, 360] }} 
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-40 h-40 border border-[#00ffaa]/10 rounded-full" 
            style={{ transformStyle: 'preserve-3d' }} 
            animate={{ rotateX: [360, 0], rotateY: [0, 360], rotateZ: [360, 0] }} 
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #00ffaa, transparent)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #00ffaa, transparent)', filter: 'blur(60px)' }} />
        </>
      )}

      {/* 3D Tilting Container */}
      <motion.div 
        className="relative z-10 text-center max-w-4xl"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ transform: "translateZ(80px)" }}
        >
          <h1
            className="font-display text-6xl sm:text-8xl md:text-9xl tracking-wider mb-4"
            style={isDark
              ? { color: 'transparent', WebkitTextStroke: '2px #00ffaa' }
              : { background: 'linear-gradient(135deg, #0d2419, #00a86b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }
            }
          >
            TERRA <span className="block sm:inline">TECH</span>
          </h1>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-10 mb-8" 
          style={{ transform: "translateZ(40px)" }}
        >
          {isDark ? (
            <TypewriterText />
          ) : (
            <p className="font-body text-lg sm:text-xl md:text-2xl font-bold" style={{ color: 'var(--tt-text-secondary)' }}>
              Where Engineers Become Builders
            </p>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
          style={{ transform: "translateZ(60px)" }}
        >
          <button
            onClick={() => {
              const el = document.getElementById('events');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="px-8 py-3 rounded-lg font-mono-label text-sm font-medium transition-all hover:scale-105"
            style={{
              background: 'var(--tt-accent)',
              color: isDark ? '#050a07' : '#ffffff',
            }}
          >
            EXPLORE EVENTS →
          </button>
          <button
            onClick={() => {
              const el = document.getElementById('about');
              el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`px-8 py-3 rounded-lg font-mono-label text-sm font-medium transition-all hover:scale-105 ${
              isDark
                ? 'border border-[rgba(0,255,170,0.3)] hover:bg-[rgba(0,255,170,0.1)]'
                : 'border border-[#00a86b] hover:bg-[#00a86b]/10'
            }`}
            style={{ color: 'var(--tt-accent)' }}
          >
            ABOUT US
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${isDark ? '' : 'max-w-2xl mx-auto'}`}
          style={{ transform: "translateZ(20px)" }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className={`p-4 rounded-lg transition-all ${isDark ? 'glass-card hover-glow' : 'border border-[#d0e8da] hover-lift'}`}
              style={!isDark ? { background: '#ffffff' } : {}}
            >
              <div className="font-display text-3xl" style={{ color: 'var(--tt-accent)' }}>{s.value}</div>
              <div className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div 
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8" 
        style={{ color: 'var(--tt-accent)' }}
      >
        ↓
      </motion.div>
    </section>
  );
};
