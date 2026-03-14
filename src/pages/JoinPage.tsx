import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';

const roles = ['Web Dev', 'Design', 'Events', 'Finance', 'Content', 'Open to anything'];

const JoinPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [form, setForm] = useState({
    fullName: '', email: '', studentId: '', year: '', department: '',
    roles: [] as string[], whyJoin: '', skills: '', profileUrl: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1500));
    setStatus('success');
  };

  const toggleRole = (role: string) => {
    setForm(f => ({
      ...f,
      roles: f.roles.includes(role) ? f.roles.filter(r => r !== role) : [...f.roles, role],
    }));
  };

  const inputClass = `w-full px-4 py-3 rounded-lg font-body text-sm transition-all outline-none ${
    isDark
      ? 'bg-[rgba(255,255,255,0.03)] border border-[rgba(0,255,170,0.1)] text-[#e8f5f0] focus:border-[#00ffaa] focus:shadow-[0_0_10px_rgba(0,255,170,0.2)]'
      : 'bg-[#ffffff] border border-[#d0e8da] text-[#0d2419] focus:border-[#00a86b]'
  }`;

  if (status === 'success') {
    return (
      <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
        <Navbar />
        <main className="pt-24 pb-20 px-4 flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-display text-3xl mb-4" style={{ color: 'var(--tt-text)' }}>APPLICATION SUBMITTED</h2>
            <p className="font-body" style={{ color: 'var(--tt-text-secondary)' }}>We'll reach out via email.</p>
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
              <div>
                <label htmlFor="join-name" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>FULL NAME *</label>
                <input id="join-name" type="text" required maxLength={100} className={inputClass} value={form.fullName} onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="join-email" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>COLLEGE EMAIL *</label>
                <input id="join-email" type="email" required maxLength={255} className={inputClass} value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="join-sid" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>STUDENT ID *</label>
                <input id="join-sid" type="text" required maxLength={50} className={inputClass} value={form.studentId} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="join-year" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>YEAR OF STUDY *</label>
                <select id="join-year" required className={inputClass} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))}>
                  <option value="">Select year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                  <option value="4th">4th Year</option>
                </select>
              </div>
              <div>
                <label htmlFor="join-dept" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>DEPARTMENT / BRANCH *</label>
                <input id="join-dept" type="text" required maxLength={100} className={inputClass} value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
              </div>
              <div>
                <span className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>PREFERRED CLUB ROLE *</span>
                <div className="flex flex-wrap gap-2">
                  {roles.map(role => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => toggleRole(role)}
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
              </div>
              <div>
                <label htmlFor="join-why" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>WHY DO YOU WANT TO JOIN? *</label>
                <textarea id="join-why" required maxLength={500} rows={3} className={inputClass} value={form.whyJoin} onChange={e => setForm(f => ({ ...f, whyJoin: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="join-skills" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>SKILLS & EXPERIENCE (OPTIONAL)</label>
                <textarea id="join-skills" maxLength={500} rows={2} className={inputClass} value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} />
              </div>
              <div>
                <label htmlFor="join-profile" className="block font-mono-label text-xs mb-2" style={{ color: 'var(--tt-text-muted)' }}>LINKEDIN / GITHUB URL (OPTIONAL)</label>
                <input id="join-profile" type="url" maxLength={255} className={inputClass} value={form.profileUrl} onChange={e => setForm(f => ({ ...f, profileUrl: e.target.value }))} />
              </div>
              <button
                type="submit"
                disabled={status === 'loading' || form.roles.length === 0}
                className="w-full py-3 rounded-lg font-mono-label text-sm font-medium transition-all disabled:opacity-50"
                style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
              >
                {status === 'loading' ? 'SUBMITTING...' : 'SUBMIT APPLICATION'}
              </button>
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
