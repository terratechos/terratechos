import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';

const faqs = [
  { q: 'How do I join TerraTech?', a: 'Fill out the Join Us form on our website. We review applications and reach out via email within a week.' },
  { q: 'Is membership free?', a: 'Yes! Membership is completely free for all enrolled students.' },
  { q: 'Which year students can join?', a: 'All years welcome — 1st year to final year.' },
  { q: 'Do I need prior coding experience?', a: 'Not at all. We have roles in design, content, events, and finance too.' },
  { q: 'How often do you meet?', a: 'We have weekly meetups and event-based sessions throughout the semester.' },
  { q: 'Can I participate in events without being a member?', a: 'Most events are open to all college students. Some workshops require prior registration.' },
];

export const FAQSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section ref={ref} id="faq" className="section-fade py-28 px-4" style={{ background: isDark ? 'transparent' : '#f0faf4' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className={`font-display text-4xl sm:text-5xl mb-8 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
          FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`rounded-xl overflow-hidden transition-all ${
                isDark
                  ? `glass-card ${openIndex === i ? 'border-[rgba(0,255,170,0.3)]' : ''}`
                  : `bg-[#ffffff] border ${openIndex === i ? 'border-l-4 border-l-[#00a86b] border-[#d0e8da]' : 'border-[#d0e8da]'}`
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left p-5 flex items-center justify-between"
              >
                <span className="font-body font-semibold text-sm" style={{ color: 'var(--tt-text)' }}>{faq.q}</span>
                <span className="font-mono-label text-lg ml-4" style={{ color: 'var(--tt-accent)' }}>
                  {openIndex === i ? '−' : '+'}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5" style={!isDark ? { background: '#f0faf4' } : {}}>
                  <p className="font-body text-sm" style={{ color: 'var(--tt-text-secondary)' }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
