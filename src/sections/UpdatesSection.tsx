import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

const posts = [
  { title: 'HackTerra 2025 registrations are now open!', date: 'Mar 8, 2025', tag: 'Announcement', body: 'Registration for HackTerra 2025 is live! Sign up now to participate in our flagship 48-hour hackathon. Open to all college students.' },
  { title: 'DevTalks Vol.3 speaker lineup announced', date: 'Mar 5, 2025', tag: 'News', body: 'We are excited to announce speakers from Google, Microsoft, and leading startups for DevTalks Vol.3. Topics include cloud-native, web3, and open source.' },
  { title: 'CTF Championship — registration closes April 10', date: 'Feb 28, 2025', tag: 'Announcement', body: 'Don\'t miss out on the CTF Championship! Registration closes on April 10. Form your teams and get ready for the challenge.' },
  { title: 'Open Source Sprint x CodeForGood collab confirmed', date: 'Feb 20, 2025', tag: 'News', body: 'We\'re partnering with CodeForGood for an exciting Open Source Sprint. Contribute to impactful projects and build your portfolio.' },
];

export const UpdatesSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="updates" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#f0faf4' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className={`font-display text-4xl sm:text-5xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
          UPDATES
        </h2>
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden transition-all cursor-pointer ${
                isDark
                  ? `glass-card ${openIndex === i ? 'border-[rgba(0,255,170,0.3)]' : ''}`
                  : `bg-[#ffffff] border ${openIndex === i ? 'border-l-4 border-l-[#00a86b] border-[#d0e8da]' : 'border-[#d0e8da]'}`
              }`}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>{post.date}</span>
                    <span
                      className="px-2 py-0.5 rounded font-mono-label text-xs"
                      style={{
                        background: post.tag === 'Announcement' ? 'rgba(0,255,170,0.1)' : 'rgba(123,140,255,0.1)',
                        color: post.tag === 'Announcement' ? 'var(--tt-accent)' : '#7b8cff'
                      }}
                    >
                      {post.tag}
                    </span>
                  </div>
                  <h3 className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{post.title}</h3>
                </div>
                <span className="font-mono-label text-lg ml-4" style={{ color: 'var(--tt-accent)' }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </div>
              {openIndex === i && (
                <div className="px-5 pb-5" style={!isDark ? { background: '#f0faf4' } : {}}>
                  <p className="font-body text-sm" style={{ color: 'var(--tt-text-secondary)' }}>{post.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
