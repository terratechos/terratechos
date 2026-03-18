import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SECTION_IDS = ['about', 'events', 'faq', 'sponsors', 'achievements', 'updates', 'contact'];

export const useScrollSpy = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const location = useLocation();

  useEffect(() => {
    // Only run scroll spy on the home page
    if (location.pathname !== '/' && location.pathname !== '/home') {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection('home');
        return;
      }

      let current = 'home';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        // Section is considered active when 40% visible
        if (rect.top < viewportHeight * 0.6 && rect.bottom > viewportHeight * 0.4) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  return activeSection;
};