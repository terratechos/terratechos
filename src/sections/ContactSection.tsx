import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

export const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setStatus('loading');
    // Simulate submission
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <section ref={ref} id="contact" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>MESSAGE SENT</h3>
          <p className="font-body text-sm mb-6" style={{ color: 'var(--tt-text-secondary)' }}>Thanks for reaching out! We'll get back to you soon.</p>
          <button
            onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); }}
            className="px-6 py-3 rounded-lg font-mono-label text-sm"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
          >
            SEND ANOTHER
          </button>
        </div>
      </section>
    );
  }

  const inputClass = `w-full px-4 py-3 rounded-lg font-body text-sm transition-all outline-none ${
    isDark
      ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(0,255,170,0.1)] text-[#e8f5f0] focus:border-[#00ffaa] focus:shadow-[0_0_10px_rgba(0,255,170,0.2)]'
      : 'bg-[#ffffff] border border-[#d0e8da] text-[#0d2419] focus:border-[#00a86b]'
  }`;

  return (
    <section ref={ref} id="contact" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
      <div className="max-w-lg mx-auto">
        <h2 className={`font-display text-4xl sm:text-5xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
          CONTACT US
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>NAME *</label>
            <input id="contact-name" type="text" required maxLength={100} className={inputClass} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="contact-email" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>EMAIL *</label>
            <input id="contact-email" type="email" required maxLength={255} className={inputClass} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>SUBJECT</label>
            <input id="contact-subject" type="text" maxLength={200} className={inputClass} value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>MESSAGE *</label>
            <textarea id="contact-message" required maxLength={1000} rows={5} className={inputClass} value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 rounded-lg font-mono-label text-sm font-medium transition-all disabled:opacity-50"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
          >
            {status === 'loading' ? 'SENDING...' : 'SEND MESSAGE'}
          </button>
          {status === 'error' && (
            <p className="font-mono-label text-xs text-red-500">Something went wrong. Please try again.</p>
          )}
        </form>
        <p className="font-mono-label text-xs mt-6 text-center" style={{ color: 'var(--tt-text-muted)' }}>
          POWERED BY SUPABASE · DATA STORED SECURELY
        </p>
      </div>
    </section>
  );
};
