/* ─────────────────────────────────────────── PAGE ── */

import { useTheme } from "@/components/ThemeProvider";
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { tiers, buildEmailTemplate } from '../data/SponsorData';
import type { TierType, Tier } from '../data/SponsorData';
import { useState } from "react";

const SponsorsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedTier = tiers.find(t => t.id === selectedId) ?? null;

  const emailData = selectedTier ? buildEmailTemplate({ tier: { tier: selectedTier } }) : null;
  const mailtoHref = emailData
    ? `mailto:terratech@example.com?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`
    : '#';

  const monetaryTiers = tiers.filter(t => t.type === 'financial');
  const nonMonetaryTiers = tiers.filter(t => t.type !== 'financial');

  return (
    <div className="relative min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />

      <main className="relative z-10 pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">

          {/* ── PAGE HEADER ── */}
          <div className="mb-10">
            <p
              className="font-mono-label text-[10px] tracking-[0.22em] mb-3 uppercase"
              style={{ color: 'var(--tt-accent)' }}
            >
              Partnership Programme
            </p>
            <h1
              className="font-display text-3xl sm:text-4xl leading-none tracking-tight mb-2"
              style={{ color: 'var(--tt-text)' }}
            >
              SELECT YOUR TIER
            </h1>
            <p className="font-body text-sm" style={{ color: 'var(--tt-text-muted)' }}>
              Choose the partnership that fits your brand, then send your inquiry directly.
            </p>
          </div>

          {/* ── TIER SELECTION ── */}
          <div className="space-y-6">

            <div>
              <p className="font-mono-label text-[8.5px] tracking-[0.2em] mb-3 uppercase" style={{ color: 'var(--tt-text-muted)' }}>
                Monetary
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {monetaryTiers.map(t => (
                  <TierCard
                    key={t.id}
                    tier={t}
                    selected={selectedId === t.id}
                    isDark={isDark}
                    onSelect={() => setSelectedId(t.id)}
                  />
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0' }} />
              <span className="font-mono-label text-[8px] tracking-[0.2em]" style={{ color: 'var(--tt-text-muted)' }}>
                NON-MONETARY
              </span>
              <div className="flex-1 h-px" style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0' }} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {nonMonetaryTiers.map(t => (
                <TierCard
                  key={t.id}
                  tier={t}
                  selected={selectedId === t.id}
                  isDark={isDark}
                  onSelect={() => setSelectedId(t.id)}
                />
              ))}
            </div>
          </div>

          {/* ── FOOTER ACTIONS ── */}
          <div
            className="flex items-center justify-between mt-10 pt-8"
            style={{ borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : '#e2e8f0'}` }}
          >
            <button
              onClick={() => navigate(-1)}
              className={`px-5 py-2.5 rounded-lg font-mono-label text-[10.5px] tracking-[0.06em] transition-colors ${isDark
                ? 'bg-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.07)]'
                : 'bg-muted/50 hover:bg-muted border border-[hsl(var(--border))]'
                }`}
              style={{ color: 'var(--tt-text-secondary)' }}
            >
              ← BACK
            </button>

            <a
              href={selectedTier ? mailtoHref : '#'}
              onClick={e => { if (!selectedTier) e.preventDefault(); }}
              className="px-6 py-2.5 rounded-lg font-mono-label text-[10.5px] tracking-[0.08em] transition-all duration-150"
              style={{
                background: 'var(--tt-accent)',
                color: isDark ? '#050a07' : '#ffffff',
                opacity: selectedTier ? 1 : 0.35,
                cursor: selectedTier ? 'pointer' : 'not-allowed',
                pointerEvents: selectedTier ? 'auto' : 'none',
              }}
            >
              SEND INQUIRY →
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorsPage;