"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_ITEMS } from "@/lib/portfolio";

export default function WorkPortfolioSection() {
    const [query, setQuery] = useState("");

    const filteredProjects = useMemo(() => {
        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            return PORTFOLIO_ITEMS;
        }

        return PORTFOLIO_ITEMS.filter((item) => {
            const searchableText = `${item.title} ${item.tags.join(" ")}`.toLowerCase();
            return searchableText.includes(normalizedQuery);
        });
    }, [query]);

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
                    <div className="inline-flex w-fit items-center gap-2 self-start rounded-full border border-[#0A211F]/12 bg-white px-4 py-2 text-sm font-medium text-[#0A211F] sm:self-auto">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-full bg-[#0A211F] px-2 py-1 text-xs font-semibold text-[#E9F3E6]">
                            {String(filteredProjects.length).padStart(2, "0")}
                        </span>
                        <span>Showing portfolio items</span>
                    </div>
                </div>

                {filteredProjects.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {filteredProjects.map((item) => (
                            <article
                                key={item.title}
                                className="group overflow-hidden rounded-[1rem] border border-[#0A211F]/10 bg-white p-2 shadow-[0_18px_45px_-35px_rgba(10,33,31,0.35)]"
                            >
                                <Link href={item.href ?? "#"} className="block">
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
                                            {String(item.priority).padStart(2, "0")}
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
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-[2rem] border border-[#0A211F]/10 bg-white px-6 py-12 text-center text-[#0A211F]/70">
                        No matching projects found for your search.
                    </div>
                )}
            </div>
        </section>
    );
}
