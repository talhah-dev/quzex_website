"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPortfolioCards } from "@/lib/api/portfolio";
import { PortfolioCard } from "../ui/PortfolioCard";

type PortfolioSectionProps = {
    selectedCategory?: string;
};

export default function PortfolioSection({ selectedCategory = "" }: PortfolioSectionProps) {
    const activeCategory = selectedCategory;
    const { data, isLoading, isError } = useQuery({
        queryKey: ["portfolio-cards", "home"],
        queryFn: () => getPortfolioCards(),
    });
    const portfolioCards = useMemo(() => data?.items ?? [], [data]);
    const categories = useMemo(() => data?.categories ?? [], [data]);
    const displayedCategory = useMemo(() => {
        if (activeCategory && categories.includes(activeCategory)) {
            return activeCategory;
        }

        return categories[0] ?? "";
    }, [activeCategory, categories]);

    const filteredItems = useMemo(
        () =>
            portfolioCards
                .filter((item) => item.showOnHome && (!displayedCategory || item.category === displayedCategory))
                .slice(0, 4),
        [displayedCategory, portfolioCards]
    );

    return (
        <section className="bg-[#0A211F] py-14 text-[#E9F3E6] md:py-20">
            <div className="mx-auto max-w-7xl px-4 lg:px-8 xl:px-16">
                <div className="flex w-full flex-col items-center gap-8 sm:gap-10">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <Badge
                            variant="outline"
                            className="h-7 border-white/15 bg-white/5 px-3 py-1 text-sm font-normal text-[#E9F3E6]/85"
                        >
                            Portfolio
                        </Badge>

                        <h2 className="max-w-3xl text-3xl leading-tight text-[#f7f9f2] sm:text-5xl">
                            Let&apos;s have a look at our Categorized Projects that{" "}
                            <span className="font-accent">Stands Out</span>
                        </h2>
                    </div>

                    <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/home?category=${encodeURIComponent(category)}`}
                                scroll={false}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                                    displayedCategory === category
                                        ? "border-[#D8F782] bg-[#D8F782] text-[#0A211F]"
                                        : "border-white/12 bg-white/5 text-[#E9F3E6]/80 hover:border-white/25 hover:bg-white/10"
                                }`}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="w-full rounded-2xl border border-white/12 bg-white/5 px-6 py-10 text-center text-sm text-[#E9F3E6]/72">
                            Loading portfolio projects...
                        </div>
                    ) : null}

                    {isError ? (
                        <div className="w-full rounded-2xl border border-[#C24141]/20 bg-[#401919] px-6 py-10 text-center text-sm text-[#FFD8D8]">
                            Unable to load portfolio projects right now.
                        </div>
                    ) : null}

                    {!isLoading && !isError && filteredItems.length > 0 ? (
                        <>
                            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-7 md:gap-y-8">
                                {filteredItems.map((item, index) => (
                                    <PortfolioCard key={item._id} item={item} index={index} />
                                ))}
                            </div>

                            <Button
                                asChild
                                className="mt-2 rounded-xl bg-[#D8F782] px-6 text-[#0A211F] hover:bg-[#cde86f]"
                            >
                                <Link
                                    href={
                                        displayedCategory
                                            ? `/work?category=${encodeURIComponent(displayedCategory)}`
                                            : "/work"
                                    }
                                >
                                    View all {displayedCategory || "portfolio"} projects
                                </Link>
                            </Button>
                        </>
                    ) : null}

                    {!isLoading && !isError && filteredItems.length === 0 ? (
                        <div className="w-full rounded-2xl border border-white/12 bg-white/5 px-6 py-10 text-center text-sm text-[#E9F3E6]/72">
                            No portfolio projects are available in this category yet.
                        </div>
                    ) : null}
                </div>
            </div>
        </section>
    );
}
