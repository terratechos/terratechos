/* ─────────────────────────────────────────── TYPES ── */

export type TierType = 'financial' | 'inkind' | 'barter';

export interface Tier {
    id: string;
    num: string;
    icon: string;
    name: string;
    type: TierType;
    price: string;
    tagline: string;
    perks: string[];
}

/* ─────────────────────────────────────────── DATA ── */

export const tiers: Tier[] = [
    // ...same array as before
];

/* ─────────────────────────────────────────── EMAIL TEMPLATES ── */

export const buildEmailTemplate = ({ tier }: { tier: Tier; }): { subject: string; body: string } => {
    // ...same function as before
};