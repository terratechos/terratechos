import { useTheme } from '@/components/ThemeProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { BackToTop } from '@/components/BackToTop';
import { tiers } from '@/data/SponsorData';
import type { Tier } from '@/data/SponsorData';

/* ── helpers ─────────────────────────────────── */

const typeBadge: Record<string, { label: string; color: string }> = {
  financial: { label: 'Monetary', color: '#00ffaa' },
  inkind: { label: 'In-Kind', color: '#7b8cff' },
  barter: { label: 'Barter', color: '#ffd166' },
};

const TierCard = ({ tier, isDark }: { tier: Tier; isDark: boolean }) => {
  const badge = typeBadge[tier.type];

  return (
    <div
      className={`rounded-xl p-6 transition-all flex flex-col gap-5 ${isDark
        ? 'glass-card hover-glow'
        : 'bg-white border border-[#d0e8da] hover-lift'
        }`}
      style={!isDark ? { borderTop: `3px solid ${badge.color}` } : {}}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-mono-label text-[9px] tracking-[0.18em]"
              style={{ color: 'var(--tt-text-muted)' }}
            >
              {tier.num}
            </span>
            <span
              className="font-mono-label text-[9px] px-2 py-0.5 rounded-full"
              style={{
                background: `${badge.color}18`,
                color: badge.color,
              }}
            >
              {badge.label}
            </span>
          </div>
          <h3
            className="font-display text-2xl tracking-wide"
            style={{ color: 'var(--tt-text)' }}
          >
            {tier.name.toUpperCase()}
          </h3>
        </div>

        <div className="text-right shrink-0">
          <p
            className="font-display text-xl"
            style={{ color: 'var(--tt-accent)' }}
          >
            {tier.price}
          </p>
          {tier.priceNote && (
            <p
              className="font-mono-label text-[9px] mt-0.5 max-w-[140px] text-right"
              style={{ color: 'var(--tt-text-muted)' }}
            >
              {tier.priceNote}
            </p>
          )}
        </div>
      </div>

      {/* Tagline */}
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: 'var(--tt-text-secondary)' }}
      >
        {tier.tagline}
      </p>

      {/* Perks */}
      <div>
        <p
          className="font-mono-label text-[9px] tracking-[0.18em] uppercase mb-3"
          style={{ color: 'var(--tt-text-muted)' }}
        >
          What you get
        </p>
        <ul className="space-y-2">
          {tier.perks.map((perk, i) => (
            <li key={i} className="flex items-start gap-2">
              <span style={{ color: 'var(--tt-accent)' }} className="mt-0.5 shrink-0">
                ▸
              </span>
              <span
                className="font-body text-sm"
                style={{ color: 'var(--tt-text-secondary)' }}
              >
                {perk}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Slots indicator */}
      <div
        className="flex items-center gap-2 pt-3 border-t"
        style={{ borderColor: isDark ? 'rgba(0,255,170,0.08)' : '#e8f5ef' }}
      >
        <div className="flex gap-1">
          {Array.from({ length: tier.slots }).map((_, i) => (
            <span
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: 'var(--tt-accent)', opacity: 0.4 }}
            />
          ))}
        </div>
        <span
          className="font-mono-label text-[10px]"
          style={{ color: 'var(--tt-text-muted)' }}
        >
          {tier.slots} slot{tier.slots > 1 ? 's' : ''} available
        </span>
      </div>
    </div>
  );
};

/* ── Page ─────────────────────────────────────── */

const SponsorsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const financial = tiers.filter(t => t.type === 'financial');
  const nonFinancial = tiers.filter(t => t.type !== 'financial');

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />

      {/* Hero */}
      <section
        className="pt-24 pb-16 px-4"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, rgba(0,255,170,0.04), transparent)'
            : '#f0faf4',
          borderRadius: '0 0 28px 28px',
        }}
      >
        <div className="max-w-4xl mx-auto">
          <p
            className="font-mono-label text-[10px] tracking-[0.22em] uppercase mb-3"
            style={{ color: 'var(--tt-accent)' }}
          >
            Partnership Programme
          </p>
          <h1
            className={`font-display text-4xl sm:text-6xl mb-4 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''
              }`}
            style={{ color: 'var(--tt-text)' }}
          >
            SPONSOR TERRATECH
          </h1>
          <p
            className="font-body text-lg max-w-2xl leading-relaxed"
            style={{ color: 'var(--tt-text-secondary)' }}
          >
            Partner with a growing campus tech community and put your brand in front of the
            next generation of engineers, designers, and builders.
          </p>
        </div>
      </section>

      <main className="px-4 pb-24">
        <div className="max-w-5xl mx-auto">

          {/* Who we are */}
          <section className="py-16">
            <div
              className={`rounded-2xl p-8 ${isDark
                ? 'glass-card'
                : 'bg-white border border-[#d0e8da]'
                }`}
              style={!isDark ? { borderLeft: '4px solid #00a86b' } : {}}
            >
              <h2
                className="font-display text-2xl mb-5"
                style={{ color: 'var(--tt-text)' }}
              >
                WHO WE ARE
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <p
                  className="font-body text-sm leading-relaxed"
                  style={{ color: 'var(--tt-text-secondary)' }}
                >
                  TerraTech is a student-run technical club founded in 2024 at NCEH. We run
                  hackathons, workshops, dev talks, and open-source sprints — building a community
                  where students go from learners to builders. Our events draw active participation
                  from across departments and batches.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '100+', label: 'Active Members' },
                    { value: '30+', label: 'Events Hosted' },
                    { value: '6+', label: 'Departments' },
                    { value: '2024', label: 'Founded' },
                  ].map(s => (
                    <div
                      key={s.label}
                      className={`rounded-xl p-4 text-center ${isDark
                        ? 'bg-[rgba(0,255,170,0.04)] border border-[rgba(0,255,170,0.1)]'
                        : 'bg-[#f0faf4]'
                        }`}
                    >
                      <p
                        className="font-display text-2xl"
                        style={{ color: 'var(--tt-accent)' }}
                      >
                        {s.value}
                      </p>
                      <p
                        className="font-mono-label text-[10px]"
                        style={{ color: 'var(--tt-text-muted)' }}
                      >
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* What sponsors get (general) */}
          <section className="pb-16">
            <h2
              className={`font-display text-3xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''
                }`}
              style={{ color: 'var(--tt-text)' }}
            >
              WHAT TO EXPECT
            </h2>
            <p
              className="font-mono-label text-xs mb-8"
              style={{ color: 'var(--tt-text-muted)' }}
            >
              AS A TERRATECH SPONSOR
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: '🎯', title: 'Direct Reach', desc: 'Access to 100+ active student developers and designers across NCEH.' },
                { icon: '📢', title: 'Multi-channel Visibility', desc: 'Logo and mentions across events, banners, social media, and our website.' },
                { icon: '🤝', title: 'Talent Pipeline', desc: 'Connect early with motivated students looking for internships and jobs.' },
                { icon: '📣', title: 'Brand Association', desc: 'Position your brand as a supporter of student innovation and open source.' },
                { icon: '🎟️', title: 'Event Access', desc: 'Booth space and representation at flagship events like HackLoom.' },
                { icon: '📄', title: 'Certified Partnership', desc: 'Official certificate of partnership from TerraTech club.' },
              ].map(item => (
                <div
                  key={item.title}
                  className={`rounded-xl p-5 ${isDark
                    ? 'glass-card'
                    : 'bg-white border border-[#d0e8da]'
                    }`}
                >
                  <span className="text-2xl block mb-3">{item.icon}</span>
                  <h3
                    className="font-body font-semibold text-sm mb-1"
                    style={{ color: 'var(--tt-text)' }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="font-body text-xs leading-relaxed"
                    style={{ color: 'var(--tt-text-secondary)' }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Monetary tiers */}
          <section className="pb-10">
            <div className="flex items-center gap-4 mb-8">
              <h2
                className="font-display text-2xl"
                style={{ color: 'var(--tt-text)' }}
              >
                MONETARY TIERS
              </h2>
              <div
                className="flex-1 h-px"
                style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {financial.map(t => (
                <TierCard key={t.id} tier={t} isDark={isDark} />
              ))}
            </div>
          </section>

          {/* Non-monetary tiers */}
          <section className="pb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2
                className="font-display text-2xl"
                style={{ color: 'var(--tt-text)' }}
              >
                NON-MONETARY TIERS
              </h2>
              <div
                className="flex-1 h-px"
                style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}
              />
            </div>
            <p
              className="font-body text-sm mb-6"
              style={{ color: 'var(--tt-text-secondary)' }}
            >
              No budget? No problem. We accept tools, credits, and visibility exchanges too.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {nonFinancial.map(t => (
                <TierCard key={t.id} tier={t} isDark={isDark} />
              ))}
            </div>
          </section>

          {/* Contact CTA */}
          <section>
            <div
              className={`rounded-2xl p-10 text-center ${isDark ? 'glass-card' : 'bg-[#f0faf4] border border-[#d0e8da]'
                }`}
            >
              <h2
                className="font-display text-3xl mb-3"
                style={{ color: 'var(--tt-text)' }}
              >
                INTERESTED IN PARTNERING?
              </h2>
              <p
                className="font-body text-sm mb-6 max-w-lg mx-auto"
                style={{ color: 'var(--tt-text-secondary)' }}
              >
                Pick the tier that fits and reach out to us directly. We'll get back to you
                within 48 hours with a custom proposal.
              </p>
              <a
                href="mailto:terratech@navkisce.ac.in?subject=Sponsorship Enquiry — TerraTech"
                className="inline-block px-8 py-3 rounded-xl font-mono-label text-sm transition-all hover:scale-105"
                style={{
                  background: 'var(--tt-accent)',
                  color: isDark ? '#050a07' : '#ffffff',
                }}
              >
                REACH OUT →
              </a>
            </div>
          </section>

        </div>
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default SponsorsPage;