export interface Alumni {
  name: string;
  batch: number;
  role: string;
  linkedin: string;
}

export const alumni: Alumni[] = [
  { name: 'Kshithij M K',  batch: 2026, role: 'President',  linkedin: '#' },
  { name: 'Jayanth Gowda C S ',   batch: 2026, role: 'Treasurer ',     linkedin: '#' },
  { name: 'Jayashree S R ',   batch: 2026, role: 'Co-Secretary ',     linkedin: '#' },
  { name: 'Chiranthan Chakravarty A A',   batch: 2026, role: 'Secretary',     linkedin: '#' },
 { name: 'Abhisheck Devaraj Bhangi',   batch: 2026, role: 'Technical Lead',     linkedin: '#' },
   { name: 'Darshana M',   batch: 2026, role: 'Club Member',     linkedin: '#' },
   { name: 'Khushi H C',   batch: 2026, role: 'Club Member',     linkedin: '#' },
   { name: 'Harshitha B G',   batch: 2026, role: 'Club Member',     linkedin: '#' },
  { name: 'Monisha K',   batch: 2026, role: 'Club Member',     linkedin: '#' },
  { name: 'Hemraj D',   batch: 2026, role: 'Club Member',     linkedin: '#' },
  { name: 'Dhanush C S',   batch: 2026, role: 'Club Member',     linkedin: '#' },
  { name: 'Bhoomika T S',   batch: 2026, role: 'Club Member',     linkedin: '#' },
  { name: 'Chinnashree D N',   batch: 2026, role: 'Club Member',     linkedin: '#' },
];

export const years = ['All','2028' , '2027', '2026', ] as const;
export type YearFilter = typeof years[number];
