import { useState, useCallback } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { useFormSpamProtection } from '../hooks/useFormSpamProtection';
import { supabase } from '@/integrations/supabase/client';

const roleOptions = ['Web Dev', 'Design', 'Events', 'Finance', 'Content', 'Open to anything'];

interface FormState {
  fullName: string;
  email: string;
  studentId: string;
  year: string;
  department: string;
  roles: string[];
  whyJoin: string;
  skills: string;
  profileUrl: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  studentId?: string;
  year?: string;
  department?: string;
  roles?: string;
  whyJoin?: string;
}

const validateField = (field: string, value: any, roles?: string[]): string | undefined => {
  switch (field) {
    case 'fullName':
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      return undefined;
    case 'email':
      if (!value.trim()) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return 'Please enter a valid email address';
      return undefined;
    case 'studentId':
      if (!value.trim()) return 'Student ID is required';
      return undefined;
    case 'year':
      if (!value) return 'Please select a year';
      return undefined;
    case 'department':
      if (!value.trim()) return 'Department is required';
      return undefined;
    case 'roles':
      if (!roles || roles.length === 0) return 'Please select at least one preferred role';
      return undefined;
    case 'whyJoin':
      if (!value.trim()) return 'This field is required';
      if (value.trim().length < 30) return 'Please write at least 30 characters';
      return undefined;
    default:
      return undefined;
  }
};

const JoinPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', studentId: '', year: '', department: '',
    roles: [], whyJoin: '', skills: '', profileUrl: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const spam = useFormSpamProtection('join');

  const handleBlur = (field: string) => {
    setTouched(t => ({ ...t, [field]: true }));
    const error = validateField(field, (form as any)[field], form.roles);
    setErrors(e => ({ ...e, [field]: error }));
  };

  const handleChange = (field: string, value: any) => {
    setForm(f => ({ ...f, [field]: value }));
    if (touched[field]) {
      const newForm = { ...form, [field]: value };
      const error = validateField(field, value, newForm.roles);
      setErrors(e => ({ ...e, [field]: error }));
    }
  };

  const toggleRole = (role: string) => {
    const newRoles = form.roles.includes(role) ? form.roles.filter(r => r !== role) : [...form.roles, role];
    setForm(f => ({ ...f, roles: newRoles }));
    if (touched.roles) {
      setErrors(e => ({ ...e, roles: validateField('roles', '', newRoles) }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validate all
    const newErrors: FormErrors = {
      fullName: validateField('fullName', form.fullName),
      email: validateField('email', form.email),
      studentId: validateField('studentId', form.studentId),
      year: validateField('year', form.year),
      department: validateField('department', form.department),
      roles: validateField('roles', '', form.roles),
      whyJoin: validateField('whyJoin', form.whyJoin),
    };
    setErrors(newErrors);
    setTouched({ fullName: true, email: true, studentId: true, year: true, department: true, roles: true, whyJoin: true });
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
      const { error } = await supabase.from('membership_applications').insert({
        full_name: form.fullName.trim(),
        email: form.email.trim(),
        student_id: form.studentId.trim(),
        year_of_study: form.year,
        department: form.department.trim(),
        preferred_roles: form.roles,
        why_join: form.whyJoin.trim(),
        skills: form.skills.trim() || null,
        profile_url: form.profileUrl.trim() || null,
      });
      if (error) throw error;

      // Trigger confirmation email edge function
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: { fullName: form.fullName.trim(), email: form.email.trim() },
        });
      } catch {
        // Email is best-effort, don't block submission success
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const errorStyle = "font-['DM_Mono'] text-[11px] mt-1 text-[#ff3b6b]";

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

  if (status === 'success') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
        <Navbar />
        <main className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>APPLICATION SUBMITTED</h2>
            <p className="font-body" style={{ color: 'var(--tt-text-secondary)' }}>We've received your application and will review it within a week. We'll reach out via email.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-lg mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            JOIN US
          </h1>
          <p className="font-body mb-8" style={{ color: 'var(--tt-text-secondary)' }}>Apply to become a TerraTech member</p>

          <div className={`rounded-xl p-6 ${isDark ? 'glass-card' : 'bg-[#ffffff] border border-[#d0e8da]'}`} style={!isDark ? { borderTop: '3px solid #00a86b' } : {}}>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label htmlFor="join-name" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>FULL NAME *</label>
                <input id="join-name" type="text" maxLength={100} className={errors.fullName && touched.fullName ? inputErrorClass : inputClass} value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} onBlur={() => handleBlur('fullName')} />
                {errors.fullName && touched.fullName && <p className={errorStyle}>{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="join-email" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>COLLEGE EMAIL *</label>
                <input id="join-email" type="email" maxLength={255} className={errors.email && touched.email ? inputErrorClass : inputClass} value={form.email} onChange={e => handleChange('email', e.target.value)} onBlur={() => handleBlur('email')} />
                {errors.email && touched.email && <p className={errorStyle}>{errors.email}</p>}
              </div>
              <div>
                <label htmlFor="join-sid" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>STUDENT ID *</label>
                <input id="join-sid" type="text" maxLength={50} className={errors.studentId && touched.studentId ? inputErrorClass : inputClass} value={form.studentId} onChange={e => handleChange('studentId', e.target.value)} onBlur={() => handleBlur('studentId')} />
                {errors.studentId && touched.studentId && <p className={errorStyle}>{errors.studentId}</p>}
              </div>
              <div>
                <label htmlFor="join-year" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>YEAR OF STUDY *</label>
                <select id="join-year" className={errors.year && touched.year ? inputErrorClass : inputClass} value={form.year} onChange={e => handleChange('year', e.target.value)} onBlur={() => handleBlur('year')}>
                  <option value="">Select year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
                {errors.year && touched.year && <p className={errorStyle}>{errors.year}</p>}
              </div>
              <div>
                <label htmlFor="join-dept" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>DEPARTMENT / BRANCH *</label>
                <input id="join-dept" type="text" maxLength={100} className={errors.department && touched.department ? inputErrorClass : inputClass} value={form.department} onChange={e => handleChange('department', e.target.value)} onBlur={() => handleBlur('department')} />
                {errors.department && touched.department && <p className={errorStyle}>{errors.department}</p>}
              </div>
              <div>
                <span className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>PREFERRED CLUB ROLE *</span>
                <div className="flex flex-wrap gap-2">
                  {roleOptions.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => { toggleRole(role); setTouched(t => ({ ...t, roles: true })); }}
                      className={`px-3 py-1.5 rounded-md font-mono-label text-xs transition-all ${
                        form.roles.includes(role)
                          ? isDark ? 'bg-[rgba(0,255,170,0.15)] text-[#00ffaa] border border-[rgba(0,255,170,0.3)]' : 'bg-[#00a86b] text-white'
                          : isDark ? 'border border-[rgba(0,255,170,0.1)] text-[#9ab8ae]' : 'border border-[#d0e8da] text-[#4a8066]'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
                {errors.roles && touched.roles && <p className={errorStyle}>{errors.roles}</p>}
              </div>
              <div>
                <label htmlFor="join-why" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>WHY DO YOU WANT TO JOIN? *</label>
                <textarea id="join-why" maxLength={500} rows={3} className={errors.whyJoin && touched.whyJoin ? inputErrorClass : inputClass} value={form.whyJoin} onChange={e => handleChange('whyJoin', e.target.value)} onBlur={() => handleBlur('whyJoin')} />
                {errors.whyJoin && touched.whyJoin && <p className={errorStyle}>{errors.whyJoin}</p>}
              </div>
              <div>
                <label htmlFor="join-skills" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>SKILLS & EXPERIENCE (OPTIONAL)</label>
                <textarea id="join-skills" maxLength={500} rows={2} className={inputClass} value={form.skills} onChange={e => handleChange('skills', e.target.value)} />
              </div>
              <div>
                <label htmlFor="join-profile" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>LINKEDIN / GITHUB URL (OPTIONAL)</label>
                <input id="join-profile" type="url" maxLength={255} className={inputClass} value={form.profileUrl} onChange={e => handleChange('profileUrl', e.target.value)} />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || spam.cooldown}
                className="w-full py-3 rounded-lg font-mono-label text-sm font-medium transition-all disabled:opacity-50"
                style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
              >
                {status === 'loading' ? 'SUBMITTING...' : spam.cooldown ? 'PLEASE WAIT...' : 'SUBMIT APPLICATION'}
              </button>
              {(status === 'error' || errorMsg || spam.rateLimited) && (
                <p className={errorStyle}>{errorMsg || 'Something went wrong. Please try again.'}</p>
              )}
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default JoinPage;
