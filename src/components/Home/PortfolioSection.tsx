"use client";

import { Badge } from "@/components/ui/badge";
import { PortfolioCard, PortfolioItem } from "../ui/PortfolioCard";

const portfolioData: PortfolioItem[] = [
    {
        image: "/portfolio/saas-dashboard.jpg",
        title: "SaaS Analytics Dashboard",
        tags: ["Next.js", "UI/UX", "Charts", "Performance"],
        href: "/portfolio/saas-dashboard",
    },
    {
        image: "/portfolio/ecommerce.jpg",
        title: "Ecommerce Storefront",
        tags: ["Next.js", "Stripe", "SEO", "Conversion"],
        href: "/portfolio/ecommerce-storefront",
    },
    {
        image: "/portfolio/api-platform.jpg",
        title: "API Platform (Go + Fiber)",
        tags: ["Golang", "Fiber", "PostgreSQL", "Auth"],
        href: "/portfolio/api-platform",
    },
    {
        image: "/portfolio/landing-page.jpg",
        title: "High-Converting Landing Page",
        tags: ["Landing Page", "Core Web Vitals", "A/B Ready", "Copy"],
        href: "/portfolio/landing-page",
    },
];

export default function PortfolioSection() {
    return (
        <section className="bg-[#0A211F] py-14 md:py-20 text-[#E9F3E6]">
            <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16">
                <div className="flex flex-col gap-10 sm:gap-14 items-center w-full">
                    <div className="flex flex-col gap-4 items-center text-center">
                        <Badge
                            variant="outline"
                            className="h-7 px-3 py-1 text-sm font-normal border-white/15 text-[#E9F3E6]/85 bg-white/5"
                        >
                            Portfolio
                        </Badge>

                        <h2 className="text-[#f7f9f2] text-3xl sm:text-5xl max-w-2xl leading-tight">
                            Selected work that ships fast and <span className="font-accent">scales cleanly</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-7 md:gap-y-8 w-full">
                        {portfolioData.map((item, index) => (
                            <PortfolioCard key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}