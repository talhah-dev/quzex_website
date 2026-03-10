"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getPortfolioCards } from "@/lib/api/portfolio";
import WorkPortfolioSkeleton from "@/components/Work/WorkPortfolioSkeleton";

type WorkPortfolioSectionProps = {
    selectedCategory?: string;
};

export default function WorkPortfolioSection({ selectedCategory = "" }: WorkPortfolioSectionProps) {
    const [query, setQuery] = useState("");
    const activeCategory = selectedCategory || "All";
    const { data, isLoading, isError } = useQuery({
        queryKey: ["portfolio-cards", activeCategory],
        queryFn: () =>
            getPortfolioCards(activeCategory === "All" ? undefined : activeCategory),
    });
    const portfolioCards = useMemo(() => data?.items ?? [], [data]);
    const categories = useMemo(() => data?.categories ?? [], [data]);

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return portfolioCards;
        }

        return portfolioCards.filter((item) => {
            const searchableText = `${item.title} ${item.category} ${item.tags.join(" ")}`.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });
    }, [portfolioCards, query]);

    return (
        <section className="bg-[#f7f9f2] py-14 text-[#0A211F] md:py-20">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 lg:px-8 xl:px-16">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="relative w-full sm:max-w-sm">
                        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-[#0A211F]/45" />
                        <input
                            type="search"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder="Search projects"
                            className="h-12 w-full rounded-full border border-[#0A211F]/12 bg-white pl-11 pr-4 text-sm text-[#0A211F] outline-none transition-colors placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/25"
                        />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                        {["All", ...categories].map((category) => (
                            <Link
                                key={category}
                                href={category === "All" ? "/work" : `/work?category=${encodeURIComponent(category)}`}
                                scroll={false}
                                className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${activeCategory === category
                                        ? "border-[#0A211F] bg-[#0A211F] text-[#E9F3E6]"
                                        : "border-[#0A211F]/12 bg-white text-[#0A211F]/70 hover:bg-[#EDF6E8]"
                                    }`}
                            >
                                {category}
                            </Link>
                        ))}
                    </div>
                </div>

                {isLoading ? <WorkPortfolioSkeleton /> : null}

                {isError ? (
                    <div className="rounded-[2rem] border border-[#C24141]/15 bg-[#FFF5F5] px-6 py-12 text-center text-[#C24141]">
                        Unable to load portfolio projects right now.
                    </div>
                ) : null}

                {!isLoading && !isError && filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filteredProjects.map((item) => (
                            <article
                                key={item._id}
                                className={`overflow-hidden rounded-[1rem] border border-[#0A211F]/10 bg-white p-2 shadow-[0_18px_45px_-35px_rgba(10,33,31,0.35)] ${item.href ? "group" : ""
                                    }`}
                            >
                                {item.href ? (
                                    <Link href={item.href} className="block">
                                        <div className="relative block h-[260px] overflow-hidden rounded-[0.7rem] sm:h-[320px]">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                className="object-cover object-top transition-[object-position] duration-[5000ms] ease-linear group-hover:object-bottom"
                                            />
                                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A211F]/10 via-transparent to-transparent" />
                                            <div className="pointer-events-none absolute left-2 top-2 inline-flex min-w-8 items-center justify-center rounded-full bg-[#0A211F] px-2 py-1.5 text-xs font-medium tracking-[0.1em] text-[#E9F3E6]">
                                                {item.category}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 px-2 pb-2 pt-6">
                                            <div className="inline-flex w-fit items-center gap-2 text-[#3d6b4c] transition-colors group-hover:text-[#0A211F]">
                                                <span className="text-[11px] font-medium uppercase tracking-[0.1em]">
                                                    Visit Website
                                                </span>
                                                <ArrowUpRight className="size-4" />
                                            </div>

                                            <p className="w-fit text-xl font-medium text-[#0A211F] transition-colors group-hover:text-[#3d6b4c] sm:text-2xl">
                                                {item.title}
                                            </p>

                                            <div className="flex flex-wrap gap-2.5">
                                                {item.tags.map((tag) => (
                                                    <Badge
                                                        key={tag}
                                                        variant="outline"
                                                        className="h-7 border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-sm font-normal text-[#0A211F]/75"
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className="block">
                                    <div className="relative block h-[260px] overflow-hidden rounded-[0.7rem] sm:h-[320px]">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                            className="object-cover object-top"
                                        />
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A211F]/10 via-transparent to-transparent" />
                                        <div className="pointer-events-none absolute left-2 top-2 inline-flex min-w-8 items-center justify-center rounded-full bg-[#0A211F] px-2 py-1.5 text-xs font-medium tracking-[0.1em] text-[#E9F3E6]">
                                            {item.category}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-3 px-2 pb-2 pt-6">
                                        <div className="inline-flex w-fit items-center gap-2 text-[#0A211F]/55">
                                            <span className="text-[11px] font-medium uppercase tracking-[0.1em]">
                                                Creative Preview
                                            </span>
                                        </div>

                                        <p className="w-fit text-xl font-medium text-[#0A211F] sm:text-2xl">
                                            {item.title}
                                        </p>

                                        <div className="flex flex-wrap gap-2.5">
                                            {item.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    variant="outline"
                                                    className="h-7 border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-sm font-normal text-[#0A211F]/75"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    </div>
                                )}
                            </article>
                        ))}
                    </div>
                ) : null}

                {!isLoading && !isError && filteredProjects.length === 0 ? (
                    <div className="rounded-[2rem] border border-[#0A211F]/10 bg-white px-6 py-12 text-center text-[#0A211F]/70">
                        No matching projects found for your search.
                    </div>
                ) : null}
            </div>
        </section>
    );
}
