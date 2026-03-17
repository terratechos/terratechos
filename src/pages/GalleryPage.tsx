import { useState, useEffect } from 'react';
import { useTheme } from '../components/ThemeProvider';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { galleryItems } from '../data/galleryData';

const GalleryModal = ({ item, onClose, isDark }: { item: any; onClose: () => void; isDark: boolean }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % item.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80" />
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden ${isDark ? 'glass-card' : 'bg-[#ffffff]'}`}
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-full h-8 rounded-full flex items-center justify-center"
          style={{ background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}
        >
          ✕
        </button>

        <div className="relative w-full" style={{ paddingBottom: '66.67%' }}>
          <img
            src={item.images[currentImageIndex]}
            alt={`${item.title} ${currentImageIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=400&fit=crop';
            }}
          />
        </div>

        <div className="p-6">
          <h3 className="font-display text-2xl mb-2" style={{ color: 'var(--tt-text)' }}>{item.title}</h3>
          <p className="font-body text-sm mb-4" style={{ color: 'var(--tt-text-secondary)' }}>{item.desc}</p>

          <div className="flex items-center justify-center">
            <span className="font-mono-label text-xs" style={{ color: 'var(--tt-text-muted)' }}>
              {currentImageIndex + 1} / {item.images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryPage = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="min-h-screen" style={{ background: 'var(--tt-bg)' }}>
      <Navbar />
      <main className="pt-24 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className={`font-display text-5xl sm:text-6xl mb-2 ${!isDark ? 'pl-4 border-l-4 border-[#00a86b]' : ''}`} style={{ color: 'var(--tt-text)' }}>
            GALLERY
          </h1>
          <p className="font-mono-label text-xs mb-12" style={{ color: 'var(--tt-text-muted)' }}>MOMENTS & MEMORIES</p>

          {isDark ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item, i) => (
                <div
                  key={item.title}
                  onClick={() => setSelectedItem(item)}
                  className="relative rounded-xl overflow-hidden glass-card transition-all cursor-pointer hover-glow"
                  style={{ height: (i === 0 || i === 4) ? 260 : 180 }}
                >
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(135deg, rgba(0,255,170,0.05), rgba(5,10,7,0.8))',
                    backgroundImage: `repeating-linear-gradient(0deg, rgba(0,255,170,0.03) 0px, rgba(0,255,170,0.03) 1px, transparent 1px, transparent 20px),
                      repeating-linear-gradient(90deg, rgba(0,255,170,0.03) 0px, rgba(0,255,170,0.03) 1px, transparent 1px, transparent 20px)`,
                  }} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 p-4">
                    <h3 className="font-display text-2xl mb-1" style={{ color: '#00ffaa' }}>{item.title}</h3>
                    <p className="font-body text-sm text-center" style={{ color: '#9ab8ae' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {galleryItems.map((item) => (
                <div 
                  key={item.title} 
                  onClick={() => setSelectedItem(item)}
                  className="break-inside-avoid bg-[#ffffff] border border-[#d0e8da] rounded-xl overflow-hidden transition-all cursor-pointer hover-lift"
                >
                  <div
                    className="w-full border-b-2 border-[#00a86b]"
                    style={{
                      height: 160 + Math.random() * 80,
                      background: 'linear-gradient(135deg, #f0faf4, #e0f5eb)',
                    }}
                  />
                  <div className="p-4">
                    <h3 className="font-body font-bold text-sm mb-1" style={{ color: 'var(--tt-text)' }}>{item.title}</h3>
                    <p className="font-body text-xs" style={{ color: 'var(--tt-text-secondary)' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {selectedItem && <GalleryModal item={selectedItem} onClose={() => setSelectedItem(null)} isDark={isDark} />}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default GalleryPage;
