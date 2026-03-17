// import { useTheme } from '../components/ThemeProvider';
// import { useSectionFade } from '../hooks/useSectionFade';
// import { ACHIEVEMENTS_DATA } from '@/data/searchableData';

// export const AchievementsSection = () => {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';
//   const ref = useSectionFade();

//   return (
//     <section ref={ref} id="achievements" className="section-fade py-20 px-4" style={{ background: isDark ? 'transparent' : '#ffffff' }}>
//       <div className="max-w-6xl mx-auto">
//         <h2 className={`font-display text-4xl sm:text-5xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
//           ACHIEVEMENTS
//         </h2>
//         <p className="font-mono-label text-xs mb-8" style={{ color: 'var(--tt-text-muted)' }}>OUR PROUDEST MOMENTS</p>

//         <div className="flex gap-5 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
//           {ACHIEVEMENTS_DATA.map((a, i) => (
//             <div
//               key={i}
//               className={`min-w-[260px] max-w-[280px] rounded-xl p-5 flex-shrink-0 transition-all ${
//                 isDark
//                   ? 'glass-card hover-glow'
//                   : 'bg-white border border-[#d0e8da] hover-lift'
//               }`}
//               style={!isDark ? { borderLeft: `4px solid ${a.tagColor}` } : {}}
//             >
//               <span className="text-3xl mb-3 block">{a.emoji}</span>
//               <h3 className="font-body text-sm font-semibold mb-1" style={{ color: 'var(--tt-text)' }}>{a.title}</h3>
//               <p className="font-mono-label text-xs mb-3" style={{ color: 'var(--tt-text-muted)' }}>{a.team}</p>
//               <span
//                 className="inline-block px-2 py-0.5 rounded-full font-mono-label text-xs font-semibold"
//                 style={{
//                   background: isDark ? `${a.tagColor}22` : `${a.tagColor}15`,
//                   color: a.tagColor,
//                 }}
//               >
//                 {a.tag}
//               </span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
