import { useState, useEffect } from 'react';

const phrases = [
  "Hackathons & Competitions",
  "Workshops & Dev Talks",
  "Open Source Projects",
  "A community of builders",
];

export const TypewriterText = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        if (charIndex < current.length) {
          setCharIndex(c => c + 1);
        } else {
          setTimeout(() => setDeleting(true), 1500);
        }
      } else {
        if (charIndex > 0) {
          setCharIndex(c => c - 1);
        } else {
          setDeleting(false);
          setPhraseIndex(i => (i + 1) % phrases.length);
        }
      }
    }, deleting ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
    <span className="typewriter-cursor pr-1 font-body text-lg sm:text-xl md:text-2xl" style={{ color: 'var(--tt-text-secondary)' }}>
      {phrases[phraseIndex].slice(0, charIndex)}
    </span>
  );
};
