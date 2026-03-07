"use client";

import { Badge } from "@/components/ui/badge";
import { HOME_PORTFOLIO_ITEMS } from "@/lib/portfolio";
import { PortfolioCard } from "../ui/PortfolioCard";

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
                        {HOME_PORTFOLIO_ITEMS.map((item, index) => (
                            <PortfolioCard key={item.title} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
