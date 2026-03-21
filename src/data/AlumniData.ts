export interface Alumni {
  name: string;
  batch: number;
  role: string;
  linkedin: string;
}

export const alumni: Alumni[] = [
  { name: 'Kshithij M K',  batch: 2026, role: '#',  linkedin: '#' },
  { name: 'Jayanth ',   batch: 2026, role: '#',     linkedin: '#' },
 
];

export const years = ['All','2028' , '2027', '2026', ] as const;
export type YearFilter = typeof years[number];