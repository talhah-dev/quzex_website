"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { normalizeImageSrc } from "@/lib/normalize-image-src";

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
    variant?: "dark" | "light";
};

export function PortfolioCard({ item, index = 0, variant = "dark" }: PortfolioCardProps) {
    const isClickable = Boolean(item.href);
    const imageSrc = normalizeImageSrc(item.image);
    const isLight = variant === "light";

    const cardClassName = isLight
        ? "rounded-[1rem] border border-[#0A211F]/10 bg-white p-2 shadow-[0_18px_45px_-35px_rgba(10,33,31,0.35)]"
        : "rounded-2xl border-none bg-transparent p-0 shadow-none";

    const contentClassName = isLight ? "flex flex-col gap-3 px-2 pb-2 pt-6" : "flex flex-col gap-3 pb-6";
    const imageClassName = isLight
        ? "relative block h-[280px] overflow-hidden rounded-[0.7rem]"
        : "relative block h-[260px] overflow-hidden rounded-2xl sm:h-[320px]";
    const categoryBadgeClassName = isLight
        ? "pointer-events-none absolute left-2 top-2 inline-flex min-w-8 items-center justify-center rounded-full bg-[#0A211F] px-2 py-1.5 text-xs font-medium tracking-[0.1em] text-[#E9F3E6]"
        : "pointer-events-none absolute left-3 top-3 inline-flex rounded-full border border-[#D8F782]/20 bg-[#0A211F]/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8F782] backdrop-blur-sm";
    const labelClassName = isLight
        ? `inline-flex w-fit items-center gap-2 transition-colors ${isClickable ? "text-[#3d6b4c] group-hover:text-[#0A211F]" : "text-[#0A211F]/55"}`
        : `inline-flex w-fit items-center gap-2 transition-colors ${isClickable ? "text-[#D8F782] group-hover:text-white" : "text-[#E9F3E6]/72"}`;
    const titleClassName = isLight
        ? `w-fit text-xl font-medium sm:text-2xl ${isClickable ? "text-[#0A211F] transition-colors group-hover:text-[#3d6b4c]" : "text-[#0A211F]"}`
        : `w-fit text-xl font-medium sm:text-2xl ${isClickable ? "text-[#E9F3E6] transition-colors group-hover:text-[#D8F782]" : "text-[#E9F3E6]"}`;
    const tagClassName = isLight
        ? "h-7 border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-sm font-normal text-[#0A211F]/75"
        : "h-7 border-white/12 bg-white/0 px-3 py-1 text-sm font-normal text-[#E9F3E6]/80";

    const content = (
        <div className={cardClassName}>
            <div className="flex flex-col gap-6">
                <div className={imageClassName}>
                    <Image
                        src={imageSrc}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className={`object-cover object-top transition-[object-position] duration-[5000ms] ease-linear ${isClickable ? "group-hover:object-bottom" : ""
                            }`}
                    />
                    <div className={categoryBadgeClassName}>
                        {item.category}
                    </div>
                </div>

                <div className={contentClassName}>
                    <div className={labelClassName}>
                        <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                            {isClickable ? "Visit Website" : "Creative Preview"}
                        </span>
                        {isClickable ? <ArrowUpRight className="size-4" /> : null}
                    </div>

                    <p className={titleClassName}>
                        {item.title}
                    </p>

                    <div className="flex flex-wrap gap-2.5">
                        {item.tags.map((tag, i) => (
                            <Badge
                                key={i}
                                variant="outline"
                                className={tagClassName}
                            >
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: { delay: index * 0.2, duration: 0.6, ease: [0.42, 0, 0.58, 1] },
            }}
            viewport={{ once: true, amount: 0.2 }}
            className={isClickable ? "group" : ""}
        >
            {isClickable ? <Link href={item.href!} className="block">{content}</Link> : content}
        </motion.div>
    );
}
