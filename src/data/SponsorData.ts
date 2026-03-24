export type TierType = 'financial' | 'inkind' | 'barter';

export interface Tier {
    id: string;
    num: string;
    name: string;
    shortCode: string;
    type: TierType;
    price: string;
    priceNote?: string;
    tagline: string;
    perks: string[];
    slots: number;
}

export const tiers: Tier[] = [
    {
        id: 'title-partner',
        num: 'T-01',
        name: 'Title Partner',
        shortCode: 'TS',
        type: 'financial',
        price: '₹20,000+',
        tagline: 'Maximum visibility — your brand in the event name itself',
        perks: [
            'Name/logo in event title (e.g. "HackLoom 2.0 powered by [Brand]")',
            'Prime logo placement on all banners, posters & digital creatives',
            'Stage time / opening slot at flagship events',
            'Dedicated brand spotlight on all social platforms',
            'Booth / stall space at events',
            'Certificate of partnership',
        ],
        slots: 1,
    },
    {
        id: 'co-powered',
        num: 'T-03',
        name: 'Co-Powered By',
        shortCode: 'COPB',
        type: 'financial',
        price: '₹15,000+',
        tagline: 'Co-brand on flagship events with prominent stage presence',
        perks: [
            '"Co-powered by [Brand]" tag on all event posters & stage backdrop',
            'Logo on event banners and digital assets',
            'Mention in event announcements and ceremonies',
            'Dedicated social media feature post',
            'Certificate of partnership',
        ],
        slots: 2,
    },
    {
        id: 'associate-partner',
        num: 'T-02',
        name: 'Associate Partner',
        shortCode: 'AP',
        type: 'financial',
        price: '₹10,000+',
        tagline: 'Strong co-branding presence across events and channels',
        perks: [
            'Logo on event banners and digital creatives',
            'Mention in opening & closing ceremonies',
            'Social media feature posts',
            'Website listing under sponsors section',
            'Certificate of partnership',
        ],
        slots: 3,
    },
    {
        id: 'community-supporter',
        num: 'T-04',
        name: 'Community Supporter',
        shortCode: 'CS',
        type: 'financial',
        price: '₹5,000+',
        tagline: 'Back the community and get recognized for it',
        perks: [
            'Logo on the website sponsors section',
            'Social media acknowledgement post',
            'Name in event credits',
            'Certificate of partnership',
        ],
        slots: 2,
    },
    {
        id: 'tech-partner',
        num: 'T-05',
        name: 'Tech Partner',
        shortCode: 'TeP',
        type: 'inkind',
        price: 'In-Kind',
        priceNote: 'Tools / API credits / licenses / goodies — declared ₹ value',
        tagline: 'Power our events with your tools and tech stack',
        perks: [
            'Logo on tech credits section of event pages',
            'Mention in workshop & event materials',
            'Social media feature highlighting the partnership',
            'Certificate of partnership',
        ],
        slots: 2,
    },
    {
        id: 'media-partner',
        num: 'T-06',
        name: 'Media Partner',
        shortCode: 'MP',
        type: 'barter',
        price: 'Barter',
        priceNote: 'Visibility exchange — no cash involved',
        tagline: 'Mutual promotion to grow both our audiences',
        perks: [
            'Mutual shoutouts and reposts across platforms',
            'Co-promotion of events and campaigns',
            'Logo on event materials',
            'Certificate of partnership',
        ],
        slots: 2,
    },
];