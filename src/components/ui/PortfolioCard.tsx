"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

type PortfolioCardItem = {
    image: string;
    title: string;
    tags: string[];
    category: string;
    href?: string;
};

type PortfolioCardProps = {
    item: PortfolioCardItem;
    index?: number;
};

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.2, duration: 0.6, ease: [0.42, 0, 0.58, 1] },
            }}
            viewport={{ once: true, amount: 0.2 }}
            className="group"
        >
            <Link href={item.href ?? "#"} className="block">
                <Card className="rounded-2xl border-none bg-transparent p-0 shadow-none">
                    <CardContent className="flex flex-col gap-6 p-0">
                        <div className="relative block h-[260px] overflow-hidden rounded-2xl sm:h-[320px]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                className="object-cover object-top transition-[object-position] duration-[5000ms] ease-linear group-hover:object-bottom"
                            />
                            <div className="pointer-events-none absolute left-3 top-3 inline-flex rounded-full border border-[#D8F782]/20 bg-[#0A211F]/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8F782] backdrop-blur-sm">
                                {item.category}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 pb-6">
                            <div className="inline-flex w-fit items-center gap-2 text-[#D8F782] transition-colors group-hover:text-white">
                                <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                                    Visit Website
                                </span>
                                <ArrowUpRight className="size-4" />
                            </div>

                            <p className="w-fit text-xl font-medium text-[#E9F3E6] transition-colors group-hover:text-[#D8F782] sm:text-2xl">
                                {item.title}
                            </p>

                            <div className="flex flex-wrap gap-2.5">
                                {item.tags.map((tag, i) => (
                                    <Badge
                                        key={i}
                                        variant="outline"
                                        className="h-7 border-white/12 bg-white/0 px-3 py-1 text-sm font-normal text-[#E9F3E6]/80"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
    );
}
