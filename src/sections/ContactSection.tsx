import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();

  return (
    <section ref={ref} id="contact" className="section-fade py-28 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`font-display text-4xl sm:text-5xl mb-6 ${!isDark ? 'border-b-4 border-[#00a86b] inline-block pb-2' : ''}`} style={{ color: 'var(--tt-text)' }}>
          GET IN TOUCH
        </h2>
        <p className="font-body text-lg mb-12 max-w-2xl mx-auto" style={{ color: 'var(--tt-text-secondary)' }}>
          Have a question, want to collaborate, or just want to say hi? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <a href="mailto:terratech@navkisce.ac.in" className={`p-8 rounded-xl flex flex-col items-center transition-all ${isDark ? 'glass-card hover-glow' : 'border border-[#d0e8da] hover-lift'}`} style={!isDark ? { background: '#ffffff' } : {}}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#e8f5ef', color: 'var(--tt-accent)' }}>
              <Mail className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--tt-text)' }}>EMAIL US</h3>
            <p className="font-mono-label text-sm break-all" style={{ color: 'var(--tt-text-muted)' }}>terratech@navkisce.ac.in</p>
          </a>

          <a href="https://discord.gg/gfYFcsTTRh" target="_blank" rel="noopener noreferrer" className={`p-8 rounded-xl flex flex-col items-center transition-all ${isDark ? 'glass-card hover-glow' : 'border border-[#d0e8da] hover-lift'}`} style={!isDark ? { background: '#ffffff' } : {}}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: isDark ? 'rgba(88,101,242,0.1)' : '#f0f1fa', color: '#5865F2' }}>
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--tt-text)' }}>DISCORD</h3>
            <p className="font-mono-label text-sm" style={{ color: 'var(--tt-text-muted)' }}>Join the community</p>
          </a>

          <a href="https://maps.app.goo.gl/vMQH59Ad9BPKS69P8" target="_blank" rel="noopener noreferrer" className={`p-8 rounded-xl flex flex-col items-center transition-all ${isDark ? 'glass-card hover-glow' : 'border border-[#d0e8da] hover-lift'}`} style={!isDark ? { background: '#ffffff' } : {}}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{ background: isDark ? 'rgba(255,107,53,0.1)' : '#fff0eb', color: '#ff6b35' }}>
              <MapPin className="w-8 h-8" />
            </div>
            <h3 className="font-display text-xl mb-2" style={{ color: 'var(--tt-text)' }}>VISIT US</h3>
            <p className="font-mono-label text-sm" style={{ color: 'var(--tt-text-muted)' }}>College Campus</p>
          </a>
        </div>
      </div>
    </section>
  );
};

