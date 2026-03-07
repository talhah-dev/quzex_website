export type PortfolioItem = {
    image: string;
    title: string;
    tags: string[];
    href?: string;
    priority: number;
    showOnHome: boolean;
};

const portfolioItems: PortfolioItem[] = [
    {
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772881618/screencapture-stragthmond-vercel-app-2026-03-07-16_07_40_jswtb3.png",
        title: "Real Estate Property Marketplace",
        tags: ["Property Website", "Buy and Sell", "Listings", "Responsive"],
        href: "/portfolio/saas-dashboard",
        priority: 1,
        showOnHome: true,
    },
    {
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772880192/img_1_di9ju4.png",
        title: "Sports and Adventure Club Website",
        tags: ["Sports Club", "Adventure", "Responsive", "Custom Design"],
        href: "/portfolio/ecommerce-storefront",
        priority: 2,
        showOnHome: true,
    },
    {
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772881145/img3_1_oibcre.png",
        title: "AI-Powered Business Solutions Website",
        tags: ["AI Website", "Business Growth", "Automation", "Modern UI"],
        href: "/portfolio/api-platform",
        priority: 3,
        showOnHome: true,
    },
    {
        image: "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772880192/img_2_kr8an8.png",
        title: "Modern Ecommerce Store Website",
        tags: ["Ecommerce", "Online Store", "Product Showcase", "Sales"],
        href: "/portfolio/landing-page",
        priority: 4,
        showOnHome: true,
    },
];

export const PORTFOLIO_ITEMS = [...portfolioItems].sort((a, b) => a.priority - b.priority);

export const HOME_PORTFOLIO_ITEMS = PORTFOLIO_ITEMS.filter((item) => item.showOnHome).slice(0, 4);
