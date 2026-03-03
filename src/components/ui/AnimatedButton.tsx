"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

type ButtonColor = "light" | "green" | "dark";

type AnimatedButtonProps = {
    href: string;
    children: React.ReactNode;
    color?: ButtonColor;
    className?: string;
};

const palette: Record<ButtonColor, { btn: string; bubble: string; icon: string }> = {
    light: {
        btn: "bg-[#D8F782] text-[#0A211F] hover:bg-[#CFF06F]",
        bubble: "bg-[#0A211F]",
        icon: "text-[#E9F3E6]",
    },
    green: {
        btn: "bg-[#8AF7B7] text-[#0A211F] hover:bg-[#74EAA6]",
        bubble: "bg-[#0A211F]",
        icon: "text-[#E9F3E6]",
    },
    dark: {
        btn: "bg-[#0A211F] text-[#E9F3E6] hover:bg-[#0F2D2A] border border-white/15",
        bubble: "bg-[#D8F782]",
        icon: "text-[#0A211F]",
    },
};

export function AnimatedButton({
    href,
    children,
    color = "light",
    className,
}: AnimatedButtonProps) {
    const s = palette[color];

    return (
        <Link href={href} className="inline-block">
            <Button
                className={cn(
                    "group relative cursor-pointer h-12 w-fit overflow-hidden rounded-full p-1 ps-6 pe-14 text-sm font-medium transition-all duration-500 hover:ps-14 hover:pe-6",
                    s.btn,
                    className
                )}
            >
                <span className="relative z-10 transition-all duration-500">{children}</span>

                <span
                    className={cn(
                        "absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-500",
                        "group-hover:right-[calc(100%-44px)] group-hover:rotate-45",
                        s.bubble
                    )}
                >
                    <ArrowUpRight size={16} className={cn(s.icon)} />
                </span>
            </Button>
        </Link>
    );
}