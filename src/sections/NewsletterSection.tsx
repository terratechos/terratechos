import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { supabase } from '@/integrations/supabase/client';
import { useFormSpamProtection } from '@/hooks/useFormSpamProtection';

export const NewsletterSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'duplicate'>('idle');
  const [error, setError] = useState('');
  const spam = useFormSpamProtection('newsletter');

  const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (spam.honeypot) return;

    const spamCheck = spam.checkSpam();
    if (spamCheck.blocked) {
      if (spamCheck.reason) {
        setError(spamCheck.reason);
        setStatus('error');
      }
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      setStatus('error');
      return;
    }

    setStatus('loading');
    spam.recordSubmission();

    const { error: dbError } = await supabase
      .from('newsletter_subscribers')
      .insert({ email: email.trim() });

    if (dbError) {
      if (dbError.code === '23505') {
        setStatus('duplicate');
      } else {
        setError('Something went wrong. Try again.');
        setStatus('error');
      }
    } else {
      setStatus('success');
      setEmail('');
    }
  };

  return (
    <section
      className="py-16 px-4"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, rgba(0,255,170,0.08), rgba(0,255,170,0.02))'
          : '#f0faf4',
        borderTop: isDark ? '1px solid rgba(0,255,170,0.1)' : '1px solid #c0e0cc',
        borderBottom: isDark ? '1px solid rgba(0,255,170,0.1)' : '1px solid #c0e0cc',
      }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-3xl sm:text-4xl mb-2" style={{ color: 'var(--tt-text)' }}>
          STAY IN THE LOOP
        </h2>
        <p className="font-body text-sm mb-6" style={{ color: 'var(--tt-text-secondary)' }}>
          Get notified about upcoming events, workshops, and announcements.
        </p>

        {status === 'success' ? (
          <p className="font-mono-label text-sm" style={{ color: 'var(--tt-accent)' }}>
            ✓ You're subscribed! We'll notify you about upcoming events.
          </p>
        ) : status === 'duplicate' ? (
          <p className="font-mono-label text-sm" style={{ color: 'var(--tt-accent)' }}>
            You're already subscribed!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <input
              name="website"
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
              value={spam.honeypot}
              onChange={e => spam.setHoneypot(e.target.value)}
            />
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="your.email@example.com"
              className={`w-full sm:w-80 px-4 py-3 rounded-lg font-body text-sm outline-none transition-all ${
                isDark
                  ? 'bg-[rgba(255,255,255,0.05)] border border-[rgba(0,255,170,0.2)] focus:border-[rgba(0,255,170,0.5)]'
                  : 'bg-white border border-[#d0e8da] focus:border-[#00a86b]'
              }`}
              style={{ color: 'var(--tt-text)' }}
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              disabled={status === 'loading' || spam.cooldown}
              className="px-6 py-3 rounded-lg font-mono-label text-xs transition-colors disabled:opacity-50"
              style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
            >
              {status === 'loading' ? 'SUBSCRIBING...' : 'SUBSCRIBE →'}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="font-mono-label text-xs mt-3" style={{ color: '#ff3b6b' }}>{error}</p>
        )}
      </div>
    </section>
  );
};
