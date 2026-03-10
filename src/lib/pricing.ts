export type PricingFeature = {
  label: string;
  included: boolean;
};

export type PricingPlan = {
  tier: string;
  title: string;
  priceUsd: number;
  summary: string;
  delivery: string;
  features: PricingFeature[];
  featured?: boolean;
};

export const DEFAULT_PRICING_PLANS: PricingPlan[] = [
  {
    tier: "Starter",
    title: "3-Page Starter Pack",
    priceUsd: 25,
    summary:
      "Responsive website + 3 custom pages + source code + GitHub or Netlify free hosting + 10 days support",
    delivery: "3-day delivery",
    features: [
      { label: "3 pages", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: false },
    ],
  },
  {
    tier: "Standard",
    title: "5-Page Silver Pack",
    priceUsd: 35,
    summary:
      "Responsive + Animations + Google maps + GitHub or Netlify free hosting + 5 pages + 18 Days Support",
    delivery: "4-day delivery",
    featured: true,
    features: [
      { label: "5 pages", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: true },
    ],
  },
  {
    tier: "Premium",
    title: "8-Page Pro Pack",
    priceUsd: 50,
    summary:
      "Responsive + Animations + Google maps + GitHub or Netlify free hosting + 8 pages + 30 Days Support",
    delivery: "6-day delivery",
    features: [
      { label: "8 pages", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: true },
    ],
  },
];
