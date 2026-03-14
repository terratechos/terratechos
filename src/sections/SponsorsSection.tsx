import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

const titlePartners = [
  { name: 'TechCorp Solutions', href: '#' },
  { name: 'CloudNova', href: '#' },
];
const associatePartners = [
  { name: 'DevHub', href: '#' },
  { name: 'OpenStack India', href: '#' },
  { name: 'ByteWorks', href: '#' },
  { name: 'SkillForge', href: '#' },
];

const LogoPlaceholder = ({ name, large, isDark }: { name: string; large?: boolean; isDark: boolean }) => (
  <div
    className={`flex items-center justify-center rounded-xl transition-all ${large ? 'h-32' : 'h-24'} ${
      isDark ? 'glass-card hover-glow' : 'bg-[#ffffff] border border-[#d0e8da] hover-lift grayscale hover:grayscale-0'
    }`}
  >
    <span className="font-mono-label text-sm" style={{ color: 'var(--tt-text-muted)' }}>{name}</span>
  </div>
);

export const SponsorsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();

  return (
    <section ref={ref} id="sponsors" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-display text-4xl sm:text-5xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
          SPONSORS & PARTNERS
        </h2>
        <p className="font-mono-label text-xs mb-8" style={{ color: 'var(--tt-text-muted)' }}>TITLE PARTNERS</p>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {titlePartners.map(p => <LogoPlaceholder key={p.name} name={p.name} large isDark={isDark} />)}
        </div>
        <p className="font-mono-label text-xs mb-4" style={{ color: 'var(--tt-text-muted)' }}>ASSOCIATE PARTNERS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {associatePartners.map(p => <LogoPlaceholder key={p.name} name={p.name} isDark={isDark} />)}
        </div>
      </div>
    </section>
  );
};
