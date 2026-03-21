import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram } from 'lucide-react';
import { DiscordIcon } from './icons/DiscordIcon';
import { useTheme } from './ThemeProvider';

const socials = [
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/groups/14553246/', color: '#0A66C2' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/terratech_nceh', color: '#E1306C' },
  { label: 'Discord', icon: DiscordIcon, href: 'https://discord.gg/gfYFcsTTRh', color: '#5865F2' },
  { label: 'GitHub', icon: Github, href: 'https://github.com/terratech-OS', color: '#888' }
];

export const FloatingSocials = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed left-0 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col gap-4 pl-4"
    >
      <div 
        className={`flex flex-col gap-3 p-3 rounded-full border shadow-2xl backdrop-blur-xl ${
          isDark 
            ? 'bg-[rgba(5,10,7,0.7)] border-[rgba(0,255,170,0.2)]' 
            : 'bg-[rgba(255,255,255,0.85)] border-[#d0e8da]'
        }`}
      >
        {socials.map((s) => {
          const Icon = s.icon;
          return (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, x: 4 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 flex items-center justify-center rounded-full transition-colors relative group"
              style={{ color: 'var(--tt-text-secondary)' }}
              title={s.label}
            >
              <div 
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: s.color }}
              />
              <Icon 
                className="w-5 h-5 transition-colors group-hover:text-current" 
              />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};
