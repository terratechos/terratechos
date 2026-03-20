import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const STORAGE_KEY = 'terratech-cookie-consent';

export const CookieConsent = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(STORAGE_KEY);
    if (!consent) setShow(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4">
      <div
        className={`max-w-2xl mx-auto rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 ${
          isDark ? 'glass-card' : 'bg-white border border-[#d0e8da] shadow-lg'
        }`}
      >
        <p className="font-body text-sm flex-1" style={{ color: 'var(--tt-text-secondary)' }}>
          We use cookies to store your preferences and form submissions. By continuing, you agree to our use of cookies.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg font-mono-label text-xs font-bold transition-all hover:opacity-90"
            style={{ background: 'var(--tt-accent)', color: isDark ? '#050a07' : '#ffffff' }}
          >
            ACCEPT
          </button>
        </div>
      </div>
    </div>
  );
};