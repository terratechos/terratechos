import { useState, useCallback } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { useFormSpamProtection } from '../hooks/useFormSpamProtection';
import { supabase } from '@/integrations/supabase/client';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateField = (field: string, value: string): string | undefined => {
  switch (field) {
    case 'name':
      if (!value.trim()) return 'Name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
      return undefined;
    case 'message':
      if (!value.trim()) return 'Message is required';
      if (value.trim().length < 10) return 'Message must be at least 10 characters';
      return undefined;
    default:
      return undefined;
  }
};

export const ContactSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const spam = useFormSpamProtection('contact');

  const handleBlur = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
    const error = validateField(field, (form as any)[field]);
    setErrors(e => ({ ...e, [field]: error }));
  };

  const handleChange = (field: string, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(e => ({ ...e, [field]: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validate all fields
    const newErrors: FormErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      message: validateField('message', form.message),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    if (Object.values(newErrors).some(Boolean)) return;

    // Spam check
    const spamResult = spam.checkSpam();
    if (spamResult.blocked) {
      if (spamResult.reason) setErrorMsg(spamResult.reason);
      return;
    }

    setStatus('loading');
    spam.recordSubmission();

    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const errorStyle = "font-['DM_Mono'] text-[11px] mt-1" + (isDark ? ' text-[#ff3b6b]' : ' text-[#ff3b6b]');

  if (status === 'success') {
    return (
      <section ref={ref} id="contact" className="section-fade py-28 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
        <div className="max-w-lg mx-auto text-center">
          <div className="text-5xl mb-4">✅</div>
          <h3 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>MESSAGE SENT</h3>
          <p className="font-body text-sm mb-6" style={{ color: 'var(--tt-text-secondary)' }}>Thanks for reaching out! We'll get back to you soon.</p>
          <button
            onClick={() => { setStatus('idle'); setForm({ name: '', email: '', subject: '', message: '' }); setErrors({}); setTouched({}); }}
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

  const inputErrorClass = `w-full px-4 py-3 rounded-lg font-body text-sm transition-all outline-none ${
    isDark
      ? 'bg-[rgba(255,255,255,0.03)] border border-[#ff3b6b] text-[#e8f5f0] focus:border-[#ff3b6b]'
      : 'bg-[#ffffff] border border-[#ff3b6b] text-[#0d2419] focus:border-[#ff3b6b]'
  }`;

  return (
    <section ref={ref} id="contact" className="section-fade py-28 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
      <div className="max-w-lg mx-auto">
        <h2 className={`font-display text-4xl sm:text-5xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
          CONTACT US
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Honeypot */}
          <input
            name="website"
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
            value={spam.honeypot}
            onChange={e => spam.setHoneypot(e.target.value)}
          />
          <div>
            <label htmlFor="contact-name" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>NAME *</label>
            <input id="contact-name" type="text" maxLength={100} className={errors.name && touched.name ? inputErrorClass : inputClass} value={form.name} onChange={e => handleChange('name', e.target.value)} onBlur={() => handleBlur('name')} />
            {errors.name && touched.name && <p className={errorStyle}>{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>EMAIL *</label>
            <input id="contact-email" type="email" maxLength={255} className={errors.email && touched.email ? inputErrorClass : inputClass} value={form.email} onChange={e => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')} />
            {errors.email && touched.email && <p className={errorStyle}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="contact-subject" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>SUBJECT</label>
            <input id="contact-subject" type="text" maxLength={200} className={inputClass} value={form.subject} onChange={e => handleChange('subject', e.target.value)} />
          </div>
          <div>
            <label htmlFor="contact-message" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>MESSAGE *</label>
            <textarea id="contact-message" maxLength={1000} rows={5} className={errors.message && touched.message ? inputErrorClass : inputClass} value={form.message} onChange={e => handleChange('message', e.target.value)} onBlur={() => handleBlur('message')} />
            {errors.message && touched.message && <p className={errorStyle}>{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={status === 'loading' || spam.cooldown}
            className="w-full py-3 rounded-lg font-mono-label text-sm font-medium transition-all disabled:opacity-50"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
          >
            {status === 'loading' ? 'SENDING...' : spam.cooldown ? 'PLEASE WAIT...' : 'SEND MESSAGE'}
          </button>
          {(status === 'error' || errorMsg || spam.rateLimited) && (
            <p className={errorStyle}>{errorMsg || 'Something went wrong. Please try again.'}</p>
          )}
        </form>
        <p className="font-mono-label text-xs mt-6 text-center" style={{ color: 'var(--tt-text-muted)' }}>
          POWERED BY LOVABLE CLOUD · DATA STORED SECURELY
        </p>
      </div>
    </section>
  );
};
