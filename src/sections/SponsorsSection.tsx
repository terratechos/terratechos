import { useState } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { useSectionFade } from '../hooks/useSectionFade';
import { SponsorsDetailsModal } from '../components/SponsorsDetailsModal';

interface Partner {
  name: string;
  imagePath?: string;
  imageUrl?: string;
  svgCode?: string;
}

const titlePartners: Partner[] = [
  {
    name: 'Open Spot',
    imagePath: '../../placeholder.svg',
  },
];

const associatePartners: Partner[] = [
  {
    name: 'Open Spot',
    imagePath: '../../placeholder.svg',
  },
  {
    name: 'Open Spot',
    imagePath: '../../placeholder.svg',
  },
];

const LogoCard = ({
  partner,
  large,
  isDark,
  onSponsorClick,
}: {
  partner: Partner;
  large?: boolean;
  isDark: boolean;
  onSponsorClick: () => void;
}) => {
  const src = partner.imagePath ?? partner.imageUrl;

  return (
    <div
      className={`flex items-center gap-5 rounded-xl transition-all w-full px-6 ${large ? 'h-40' : 'h-28'} ${
        isDark
          ? 'glass-card hover-glow'
          : 'bg-[#ffffff] border border-[#d0e8da] hover-lift'
      }`}
    >
      {/* Logo */}
      <div className={`shrink-0 flex items-center justify-center ${large ? 'w-20 h-20' : 'w-14 h-14'}`}>
        {src ? (
          <img
            src={src}
            alt={`${partner.name} logo`}
            className="w-full h-full object-contain"
          />
        ) : partner.svgCode ? (
          <div
            className="w-full h-full flex items-center justify-center"
            dangerouslySetInnerHTML={{ __html: partner.svgCode }}
          />
        ) : (
          <div className="w-full h-full rounded bg-current opacity-10" />
        )}
      </div>

      {/* Name + CTA */}
      <div className="flex flex-col gap-2">
        <span
          className={`font-body font-semibold ${large ? 'text-lg' : 'text-base'}`}
          style={{ color: 'var(--tt-text)' }}
        >
          {partner.name}
        </span>
        <button
          onClick={onSponsorClick}
          className={`inline-block px-4 py-1.5 rounded-lg font-mono-label text-xs transition-colors w-fit ${
            isDark
              ? 'bg-[rgba(0,255,170,0.12)] border border-[rgba(0,255,170,0.25)] text-[#00ffaa] hover:bg-[rgba(0,255,170,0.2)]'
              : 'bg-[#00a86b] text-white hover:bg-[#008f5a]'
          }`}
        >
          LIKE TO SPONSOR →
        </button>
      </div>
    </div>
  );
};

export const SponsorsSection = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useSectionFade();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section
      ref={ref}
      id="sponsors"
      className="section-fade py-28 px-4"
      style={{ background: isDark ? 'transparent' : '#ffffff' }}
    >
      <div className="max-w-3xl mx-auto">
        <h2
          className={`font-display text-4xl sm:text-5xl mb-2 text-center ${
            !isDark ? 'border-b-4 border-[#00a86b] pb-2' : ''
          }`}
          style={{ color: 'var(--tt-text)' }}
        >
          SPONSORS & PARTNERS
        </h2>

        {/* Title Partner */}
        <p
          className="font-mono-label text-xs mb-6 mt-6 text-center"
          style={{ color: 'var(--tt-text-muted)' }}
        >
          TITLE PARTNERS
        </p>
        <div className="w-full mb-12">
          {titlePartners.map(p => (
            <LogoCard
              key={p.name}
              partner={p}
              large
              isDark={isDark}
              onSponsorClick={() => setModalOpen(true)}
            />
          ))}
        </div>

        {/* Associate Partners */}
        <p
          className="font-mono-label text-xs mb-6 text-center"
          style={{ color: 'var(--tt-text-muted)' }}
        >
          ASSOCIATE PARTNERS
        </p>
        <div className="grid grid-cols-2 gap-6 w-full">
          {associatePartners.map((p, i) => (
            <LogoCard
              key={i}
              partner={p}
              isDark={isDark}
              onSponsorClick={() => setModalOpen(true)}
            />
          ))}
        </div>
      </div>

      <SponsorsDetailsModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  );
};