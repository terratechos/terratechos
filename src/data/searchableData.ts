// Centralized searchable data for events, updates, and team members

export type EventTag = 'Hackathon' | 'Workshop' | 'Talk' | 'Competition' | 'Collab';
export type EventStatus = 'ongoing' | 'upcoming';
export type EventPeriod = 'thisMonth' | 'nextMonth' | 'nextTerm';

export interface ClubEvent {
  title: string;
  tag: EventTag;
  date: string;
  status: EventStatus;
  period: EventPeriod;
  description: string;
  location: string;
  format: string;
  teamSize: string;
  prize: string;
  expectations: string[];
  registerUrl: string;
}

export const tagColors: Record<EventTag, string> = {
  Hackathon: '#ff6b35',
  Workshop: 'var(--tt-accent)',
  Talk: '#7b8cff',
  Competition: '#ff3b6b',
  Collab: '#ffd166',
};

export const EVENTS_DATA: ClubEvent[] = [
  {
    title: 'HackTerra 2025', tag: 'Hackathon', date: 'Mar 10–12', status: 'ongoing', period: 'thisMonth',
    description: '48-hour hackathon with industry mentors and prizes',
    location: 'Main Auditorium', format: 'Hybrid', teamSize: '2–4 members', prize: '₹10,000 pool',
    expectations: ['Build a working prototype in 48 hours', 'Get mentored by industry professionals', 'Network with fellow developers', 'Win exciting prizes and goodies'],
    registerUrl: '#',
  },
  {
    title: 'AI Workshop Series', tag: 'Workshop', date: 'Mar 15', status: 'ongoing', period: 'thisMonth',
    description: 'Hands-on workshop covering ML fundamentals and deployment',
    location: 'CS Lab 301', format: 'Offline', teamSize: 'Individual', prize: 'Certificates',
    expectations: ['Learn ML fundamentals from scratch', 'Hands-on model training and deployment', 'Work with real-world datasets'],
    registerUrl: '#',
  },
  {
    title: 'DevTalks Vol.3', tag: 'Talk', date: 'Apr 5', status: 'upcoming', period: 'nextMonth',
    description: 'Industry speakers on cloud-native, web3, and OSS',
    location: 'Seminar Hall B', format: 'Hybrid', teamSize: 'Individual', prize: 'Swag kits',
    expectations: ['Hear from Google & Microsoft engineers', 'Q&A with industry leaders', 'Networking opportunities'],
    registerUrl: '#',
  },
  {
    title: 'CTF Championship', tag: 'Competition', date: 'Apr 20', status: 'upcoming', period: 'nextMonth',
    description: 'Capture the flag security competition',
    location: 'Online', format: 'Online', teamSize: '1–3 members', prize: '₹5,000 pool',
    expectations: ['Solve real-world security challenges', 'Learn offensive and defensive techniques', 'Compete with top security enthusiasts'],
    registerUrl: '#',
  },
  {
    title: 'Open Source Sprint', tag: 'Collab', date: 'May 1', status: 'upcoming', period: 'nextTerm',
    description: 'Contribute to real open source projects',
    location: 'CS Lab 201', format: 'Offline', teamSize: '2–5 members', prize: 'GitHub swag',
    expectations: ['Contribute to popular OSS projects', 'Learn Git workflow and code review', 'Build your open source portfolio'],
    registerUrl: '#',
  },
  {
    title: 'Annual Tech Fest', tag: 'Hackathon', date: 'Jun 14', status: 'upcoming', period: 'nextTerm',
    description: 'Our flagship annual technology festival',
    location: 'University Campus', format: 'Offline', teamSize: '2–6 members', prize: '₹25,000 pool',
    expectations: ['Multiple tracks: AI, Web, Mobile, IoT', 'Industry-sponsored challenges', 'Career fair with top companies', 'Live entertainment and food stalls'],
    registerUrl: '#',
  },
];

export interface UpdatePost {
  title: string;
  date: string;
  tag: string;
  body: string;
}

export const UPDATES_DATA: UpdatePost[] = [
  { title: 'HackTerra 2025 registrations are now open!', date: 'Mar 8, 2025', tag: 'Announcement', body: 'Registration for HackTerra 2025 is live! Sign up now to participate in our flagship 48-hour hackathon. Open to all college students.' },
  { title: 'DevTalks Vol.3 speaker lineup announced', date: 'Mar 5, 2025', tag: 'News', body: 'We are excited to announce speakers from Google, Microsoft, and leading startups for DevTalks Vol.3. Topics include cloud-native, web3, and open source.' },
  { title: 'CTF Championship — registration closes April 10', date: 'Feb 28, 2025', tag: 'Announcement', body: "Don't miss out on the CTF Championship! Registration closes on April 10. Form your teams and get ready for the challenge." },
  { title: 'Open Source Sprint x CodeForGood collab confirmed', date: 'Feb 20, 2025', tag: 'News', body: "We're partnering with CodeForGood for an exciting Open Source Sprint. Contribute to impactful projects and build your portfolio." },
];

export interface TeamMember {
  name: string;
  role: string;
  linkedin?: string;
}

export interface Department {
  emoji: string;
  name: string;
  color: string;
  members: TeamMember[];
}

export const TEAMS_DATA: Department[] = [
  {
    emoji: '🧠', name: 'Core Committee', color: '#00ffaa',
    members: [
      { name: 'Kruthi C', role: 'President', linkedin: 'https://linkedin.com/in/kruthi-c-1a7a44324' },
      { name: 'Muizza', role: 'Secretary', linkedin: 'linkedin.com/in/muizzah-m-ahmed-1aa5a1321' },
    ],
  },
  {
    emoji: '⚙️', name: 'Tech Wing', color: '#7b8cff',
    members: [
      { name: 'Chandu K H', role: 'Tech Lead', linkedin: 'https://linkedin.com/in/chandukh' },
      { name: 'Veresh Mahalinpur', role: 'Developer', linkedin: '#' },
      { name: 'Roshan R Babu', role: 'Developer', linkedin: '#' },
      { name: 'Aditnya H S', role: 'Developer', linkedin: 'http://linkedin.com/in/adithya-h-s-0a6387337' },
    ],
  },
  {
    emoji: '📅', name: 'Event Management Wing', color: '#ff6b35',
    members: [
      { name: 'S. Pooja Chandana', role: 'Events Head', linkedin: 'https://linkedin.com/in/priya-nair' },
      { name: 'Mohammad Faud', role: 'Event Coordinator', linkedin: 'https://linkedin.com/in/amit-kumar' },
      { name: 'Pranav P Desai', role: 'Event Assistant', linkedin: 'https://linkedin.com/in/riya-chopra' },
      { name: 'Yukshi', role: 'Event Coordinator', linkedin: 'https://linkedin.com/in/amit-kumar' },
      { name: 'Prisulla Y', role: 'Event Assistant', linkedin: 'https://linkedin.com/in/riya-chopra' },
      { name: 'Mahadiya Khanum', role: 'Event Assistant', linkedin: 'https://linkedin.com/in/riya-chopra' },
      { name: 'Mehnaz Filak', role: 'Event Assistant', linkedin: 'https://linkedin.com/in/riya-chopra' },
    ],
  },
  {
    emoji: '📹', name: 'Media & Production Wing', color: '#ffd166',
    members: [
      { name: 'Abiram Bhargav M Y', role: 'Media Head', linkedin: 'https://linkedin.com/in/deepak-verma' },
      { name: 'Chinmayi ', role: 'Photographer', linkedin: 'https://linkedin.com/in/anjali-mishra' },
      { name: 'Chandan H', role: 'Videographer', linkedin: 'https://linkedin.com/in/siddharth-rao' },
      { name: 'Sinchana HP', role: 'Editor', linkedin: 'https://linkedin.com/in/kavya-singh' },

    ],
  },
  {
    emoji: '🎨', name: 'Creative Wing', color: '#ff3b6b',
    members: [
       { name: 'Rohith A', role: 'Graphic Designer', linkedin: '#' },
      { name: 'Open Spot', role: 'Creative Head', linkedin: '#/join' },
      { name: 'Open Spot', role: 'Copywriter', linkedin: '#/join' },
      
    ],
  },
  {
    emoji: '📱', name: 'Social & Community Wing', color: '#9b59b6',
    members: [
      { name: 'Bhoomi S Jain', role: 'Social Media Manager', linkedin: 'https://linkedin.com/in/ishaan-malik' },
      { name: 'Amrutha ', role: 'Social Media Manager', linkedin: 'https://linkedin.com/in/ishaan-malik' },
      { name: 'Hamsavri', role: 'Social Media Manager', linkedin: 'https://linkedin.com/in/ishaan-malik' },
      { name: 'Mahi H H', role: 'Community Manager', linkedin: 'https://linkedin.com/in/mahi-h-h' },
    ],
  },
  {
    emoji: '🎪', name: ' Operations & Relations Wing', color: '#e67e22',
    members: [
      { name: 'Mahi H H', role: 'Public Relations Head', linkedin: 'https://linkedin.com/in/mahi-h-h' },
      { name: 'Open Spot', role: 'Alumni Relations Head', linkedin: '#/join' },
      { name: 'Open Spot', role: 'Support Coordinator', linkedin: '#/join' },
    ],
  },
];

export interface Achievement {
  emoji: string;
  title: string;
  event: string;
  team: string;
  tag: string;
  tagColor: string;
}

export const ACHIEVEMENTS_DATA: Achievement[] = [
  { emoji: '🥇', title: 'Smart India Hackathon 2024', event: '1st Place', team: 'Team Nexus', tag: '🥇 1st Place', tagColor: '#ffd166' },
  { emoji: '🥇', title: 'HackTerra 2023 Champion', event: '1st Place', team: 'Team ByteForce', tag: '🥇 1st Place', tagColor: '#ffd166' },
  { emoji: '🎖️', title: 'Google Solution Challenge', event: 'Finalist', team: 'Aisha Khan & Dev Patel', tag: '🎖️ Finalist', tagColor: '#7b8cff' },
  { emoji: '🥈', title: 'National Coding Olympiad', event: '2nd Place', team: 'Rohan Das', tag: '🥈 2nd Place', tagColor: '#c0c0c0' },
  { emoji: '🎖️', title: 'Open Source Contributor Award', event: 'Recognition', team: 'Siddharth Rao', tag: '🎖️ Recognition', tagColor: '#ff6b35' },
];
