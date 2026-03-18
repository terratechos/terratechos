import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const TopProgressBar = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    setProgress(80);

    const complete = setTimeout(() => {
      setProgress(100);
    }, 200);

    const hide = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 500);

    return () => {
      clearTimeout(complete);
      clearTimeout(hide);
    };
  }, [location.key]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 300ms ease-out' }}
    >
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'var(--tt-accent)',
          transition: progress === 0 ? 'none' : 'width 200ms ease-out',
          boxShadow: '0 0 8px var(--tt-accent)',
        }}
      />
    </div>
  );
};