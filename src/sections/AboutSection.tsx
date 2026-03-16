import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

const values = [
{ icon: '🚀', label: 'Innovation' },
{ icon: '🤝', label: 'Collaboration' },
{ icon: '📚', label: 'Learning' }];


export const AboutSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();

  return (
    <section ref={ref} id="about" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#f0faf4' }}>
      <div className="max-w-6xl mx-auto">
        {isDark ?
        <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl mb-6" style={{ color: 'var(--tt-text)' }}>
                                            About TerraTech</span>
 <span style={{ color: 'var(--tt-accent)' }}>TerraTech</span>

              </h2>
              <p className="font-body mb-6 leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>
                Founded in 2024, TerraTech is a community-driven technical club focused on fostering creativity, innovation, and hands-on experience in the ever-evolving tech industry. Our mission is to create a dynamic platform where members can collaborate, learn, and grow in various technology fields, empowering them to become leaders and innovators in the tech world.
              </p>
            </div>
            <div className="space-y-6">
              <div className="glass-card rounded-xl p-6 hover-glow transition-all">
                <p className="font-body italic leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>
                  "We aim to empower tech enthusiasts through workshops, events, and collaborative projects, fostering both personal and professional growth."
                </p>
              </div>
              <div className="flex gap-4">
                {values.map((v) => <div key={v.label} className="glass-card rounded-xl p-4 flex-1 text-center hover-glow transition-all">
                    <div className="text-2xl mb-2">{v.icon}</div>
                    <div className="font-mono-label text-xs" style={{ color: 'var(--tt-accent)' }}>{v.label}</div>
                  </div>)}
              </div>
            </div>
          </div> :

        <div className="max-w-3xl">
            <h2 className="font-body text-3xl sm:text-4xl font-bold mb-6 pl-4 border-l-4 border-[#00a86b]" style={{ color: 'var(--tt-text)' }}>
              WHERE ENGINEERS BECOME BUILDERS
            </h2>
            <p className="font-body mb-8 leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>
              Founded in 2024, TerraTech is a community-driven technical club focused on fostering creativity, innovation, and hands-on experience in the ever-evolving tech industry. Our mission is to create a dynamic platform where members can collaborate, learn, and grow in various technology fields, empowering them to become leaders and innovators in the tech world.
            </p>
            <div className="bg-[#ffffff] border-l-4 border-[#00a86b] rounded-r-xl p-6 mb-8 shadow-sm">
              <p className="font-body italic leading-relaxed" style={{ color: 'var(--tt-text-secondary)' }}>
                "We aim to empower tech enthusiasts through workshops, events, and collaborative projects, fostering both personal and professional growth."
              </p>
            </div>
            <div className="flex gap-4">
              {values.map((v) =>
            <div key={v.label} className="bg-[#ffffff] border border-[#d0e8da] rounded-xl p-4 flex-1 text-center hover-lift transition-all">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <div className="font-mono-label text-xs" style={{ color: 'var(--tt-text-secondary)' }}>{v.label}</div>
                </div>
            )}
            </div>
          </div>
        }
      </div>
    </section>);

};