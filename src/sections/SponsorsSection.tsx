import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { useNavigate } from 'react-router-dom';
import { tiers } from '@/data/SponsorData';
import type { Tier } from '@/data/SponsorData';

/* ── helpers ─────────────────────────────────── */

const typeLabel: Record<string, string> = {
  financial: 'Monetary',
  inkind: 'In-Kind',
  barter: 'Barter',
};

const PlaceholderCard = ({
  tier,
  large,
  isDark,
}: {
  tier: Tier;
  large?: boolean;
  isDark: boolean;
}) => (
  <div
    className={`rounded-xl flex flex-col justify-between transition-all ${large ? 'p-7 min-h-[120px]' : 'p-5 min-h-[96px]'
      } ${isDark
        ? 'glass-card border-dashed border border-[rgba(0,255,170,0.18)]'
        : 'bg-[#fafff9] border-2 border-dashed border-[#c4e8d4]'
      }`}
  >
    <div className="flex items-start justify-between gap-2">
      <div>
        <span
          className="font-mono-label text-[9px] tracking-[0.18em] block mb-1"
          style={{ color: 'var(--tt-text-muted)' }}
        >
          {tier.num} · {typeLabel[tier.type]}
        </span>
        <h3
          className={`font-display ${large ? 'text-xl' : 'text-base'} tracking-wide`}
          style={{ color: 'var(--tt-text)' }}
        >
          {tier.name.toUpperCase()}
        </h3>
      </div>
      <span
        className="font-mono-label text-xs px-2 py-0.5 rounded-md shrink-0"
        style={{
          background: isDark ? 'rgba(0,255,170,0.08)' : 'rgba(0,168,107,0.08)',
          color: 'var(--tt-accent)',
        }}
      >
        {tier.shortCode}
      </span>
    </div>

    <div className="flex items-center gap-2 mt-3">
      <div
        className={`w-8 h-8 rounded-lg flex items-center justify-center opacity-30 ${isDark ? 'bg-[rgba(0,255,170,0.1)]' : 'bg-[#d4f0e2]'
          }`}
      >
        <span className="text-base">🏷️</span>
      </div>
      <span className="font-body text-xs italic" style={{ color: 'var(--tt-text-muted)' }}>
        Open Spot · {tier.price}
      </span>
    </div>
  </div>
);

/* Render N slot cards for a tier */
const SlotRow = ({
  tier,
  isDark,
  large,
}: {
  tier: Tier;
  isDark: boolean;
  large?: boolean;
}) => (
  <div
    className={`grid gap-4 ${tier.slots === 1
      ? 'grid-cols-1'
      : tier.slots === 2
        ? 'grid-cols-1 sm:grid-cols-2'
        : 'grid-cols-1 sm:grid-cols-3'
      }`}
  >
    {Array.from({ length: tier.slots }).map((_, i) => (
      <PlaceholderCard key={i} tier={tier} large={large} isDark={isDark} />
    ))}
  </div>
);

/* ── Section ─────────────────────────────────── */

export const SponsorsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const navigate = useNavigate();

  const financial = tiers.filter(t => t.type === 'financial');
  const nonFinancial = tiers.filter(t => t.type !== 'financial');

  return (
    <section
      ref={ref}
      id="sponsors"
      className="section-fade py-28 px-4"
      style={{ background: isDark ? 'transparent' : '#ffffff' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h2
            className={`font-display text-4xl sm:text-5xl mb-3 ${!isDark ? 'border-b-4 border-[#00a86b] inline-block pb-2' : ''
              }`}
            style={{ color: 'var(--tt-text)' }}
          >
            SPONSORS &amp; PARTNERS
          </h2>
          <p className="font-body text-sm mt-4" style={{ color: 'var(--tt-text-secondary)' }}>
            These spots are open — help shape the next generation of tech builders.
          </p>
        </div>

        {/* ── Monetary tiers ── */}
        <div className="mb-4">
          <p
            className="font-mono-label text-[9px] tracking-[0.22em] uppercase mb-6"
            style={{ color: 'var(--tt-text-muted)' }}
          >
            Monetary Partners
          </p>
          <div className="space-y-4">
            {/* Title Partner — extra large, full-width */}
            {financial
              .filter(t => t.id === 'title-partner')
              .map(t => (
                <SlotRow key={t.id} tier={t} isDark={isDark} large />
              ))}

            {/* Co-Powered + Associate side by side groups */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {financial
                .filter(t => t.id === 'co-powered' || t.id === 'associate-partner')
                .map(t => (
                  <div key={t.id} className="space-y-4">
                    <span
                      className="font-mono-label text-[9px] tracking-[0.18em] uppercase block"
                      style={{ color: 'var(--tt-text-muted)' }}
                    >
                      {t.name}
                    </span>
                    <SlotRow tier={t} isDark={isDark} />
                  </div>
                ))}
            </div>

            {/* Community Supporter */}
            {financial
              .filter(t => t.id === 'community-supporter')
              .map(t => (
                <div key={t.id}>
                  <span
                    className="font-mono-label text-[9px] tracking-[0.18em] uppercase block mb-3"
                    style={{ color: 'var(--tt-text-muted)' }}
                  >
                    {t.name}
                  </span>
                  <SlotRow tier={t} isDark={isDark} />
                </div>
              ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 my-10">
          <div
            className="flex-1 h-px"
            style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}
          />
          <span
            className="font-mono-label text-[9px] tracking-[0.22em] uppercase"
            style={{ color: 'var(--tt-text-muted)' }}
          >
            Non-Monetary
          </span>
          <div
            className="flex-1 h-px"
            style={{ background: isDark ? 'rgba(0,255,170,0.1)' : '#d0e8da' }}
          />
        </div>

        {/* ── Non-monetary tiers ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {nonFinancial.map(t => (
            <div key={t.id}>
              <span
                className="font-mono-label text-[9px] tracking-[0.18em] uppercase block mb-3"
                style={{ color: 'var(--tt-text-muted)' }}
              >
                {t.name}
              </span>
              <SlotRow tier={t} isDark={isDark} />
            </div>
          ))}
        </div>

        {/* Single CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate('/sponsors')}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-mono-label text-sm tracking-wide transition-all hover:scale-105"
            style={{
              background: 'var(--tt-accent)',
              color: isDark ? '#050a07' : '#ffffff',
            }}
          >
            LIKE TO SPONSOR →
          </button>
          <p
            className="font-mono-label text-[10px] mt-3"
            style={{ color: 'var(--tt-text-muted)' }}
          >
            Flexible tiers · Monetary &amp; non-monetary options
          </p>
        </div>

      </div>
    </section>
  );
};