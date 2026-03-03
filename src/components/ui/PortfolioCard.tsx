"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";

export type PortfolioItem = {
    image: string;
    title: string;
    tags: string[];
    href?: string;
};

type PortfolioCardProps = {
    item: PortfolioItem;
    index?: number;
};

export function PortfolioCard({ item, index = 0 }: PortfolioCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 80 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delay: index * 0.2,
                duration: 0.6,
                ease: [0.42, 0, 0.58, 1],
            },
        },
    };

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
            <Card className="p-0 overflow-hidden shadow-none bg-transparent border-none rounded-2xl">
                <CardContent className="p-0 flex flex-col gap-6">
                    <a href={item.href ?? "#"} className="relative overflow-hidden rounded-2xl">
                        <img
                            src={item.image}
                            alt={item.title}
                            width={"100%"}
                            height={370}
                            className="object-cover w-full h-[260px] sm:h-[320px] transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                    </a>

                    <div className="pb-6 flex flex-col gap-3">
                        <a
                            href={item.href ?? "#"}
                            className="text-[#E9F3E6] text-xl sm:text-2xl font-medium w-fit hover:text-[#D8F782] transition-colors"
                        >
                            {item.title}
                        </a>

                        <div className="flex flex-wrap gap-2.5">
                            {item.tags.map((tag, i) => (
                                <Badge
                                    key={i}
                                    variant="outline"
                                    className="h-7 px-3 py-1 text-sm font-normal border-white/12 text-[#E9F3E6]/80 bg-white/0"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}