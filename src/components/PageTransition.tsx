import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

export const PageTransition = ({ children }: Props) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (location.key !== displayLocation.key) {
      setStage('exit');
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setStage('enter');
        window.scrollTo(0, 0);
      }, 200);
      return () => clearTimeout(timeout);
    }
  }, [location, displayLocation]);

  return (
    <div
      style={{
        opacity: stage === 'exit' ? 0 : 1,
        transform: stage === 'exit' ? 'translateY(-12px)' : stage === 'enter' ? 'translateY(0)' : 'translateY(16px)',
        transition: stage === 'exit'
          ? 'opacity 200ms ease-out, transform 200ms ease-out'
          : 'opacity 300ms ease-out, transform 300ms ease-out',
      }}
    >
      {children}
    </div>
  );
};