import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { supabase } from '@/integrations/supabase/client';
import { useFormSpamProtection } from '@/hooks/useFormSpamProtection';

export const NewsletterSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const { honeypot, setHoneypot, cooldown, checkSpam, recordSubmission } = useFormSpamProtection('newsletter');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const spam = checkSpam();
    if (spam.blocked) {
      if (spam.reason) setMessage(spam.reason);
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage('Please enter a valid email.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.trim().toLowerCase() });

      if (error) {
        if (error.code === '23505') {
          setMessage("You're already subscribed!");
        } else {
          setMessage('Something went wrong. Try again.');
        }
        setStatus('error');
      } else {
        recordSubmission();
        setMessage('Subscribed! Welcome aboard 🚀');
        setStatus('success');
        setEmail('');
      }
    } catch {
      setMessage('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section ref={ref} id="newsletter" className="section-fade py-16 px-4" style={{ background: isDark ? 'transparent' : '#f0faf5' }}>
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl mb-2" style={{ color: 'var(--tt-text)' }}>
          STAY IN THE LOOP
        </h2>
        <p className="font-mono-label text-xs mb-6" style={{ color: 'var(--tt-text-muted)' }}>
          GET UPDATES ON EVENTS, WORKSHOPS & MORE
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto">
          {/* Honeypot */}
          <input
            type="text"
            name="website"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute opacity-0 pointer-events-none"
            tabIndex={-1}
            autoComplete="off"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg font-mono-label text-sm border transition-colors"
            style={{
              background: isDark ? 'rgba(255,255,255,0.05)' : '#ffffff',
              borderColor: isDark ? 'var(--tt-border)' : '#d0e8da',
              color: 'var(--tt-text)',
            }}
          />
          <button
            type="submit"
            disabled={cooldown || status === 'loading'}
            className="px-6 py-3 rounded-lg font-mono-label text-sm font-bold transition-all disabled:opacity-50"
            style={{
              background: 'var(--tt-accent)',
              color: '#000',
            }}
          >
            {status === 'loading' ? '...' : 'SUBSCRIBE'}
          </button>
        </form>

        {message && (
          <p
            className="font-mono-label text-xs mt-3"
            style={{ color: status === 'success' ? 'var(--tt-accent)' : '#ef4444' }}
          >
            {message}
          </p>
        )}
      </div>
    </section>
  );
};
