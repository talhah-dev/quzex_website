"use client";

import Image from "next/image";
import { AnimatedButton } from "../ui/AnimatedButton";
import { cn } from "@/lib/utils";

type AboutSectionProps = {
    eyebrow?: string;
    heading?: string;
    accent?: string;
    description?: string;
    helper?: string;
    ctaText?: string;
    ctaHref?: string;
    imageSrc?: string;
    imageAlt?: string;
    className?: string;
};

export default function AboutSection({
    eyebrow = "ABOUT QUZEX",
    heading = "We build high-quality websites",
    accent = "that match your exact needs",
    description = "Quzex is a focused web development team specializing in website development, website redesign, and complete builds from scratch. We create fast, modern, and business-ready websites tailored to each client.",
    helper = "With 6+ years of experience across multiple industries, we combine strategy, UI design, and clean development to deliver websites that look professional, perform smoothly, and scale with your goals.",
    ctaText = "Start your website project",
    ctaHref = "/contact",
    imageSrc = "https://images.unsplash.com/photo-1650661926447-9efb2610f64c?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageAlt = "Work preview",
    className,
}: AboutSectionProps) {
    return (
        <section className={cn("w-full ", className)}>
            <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-4">
                            <p className="text-[11px] tracking-widest uppercase text-[#0A211F]/70">
                                {eyebrow}
                            </p>
                            <span className="h-px flex-1 bg-[#0A211F]/20" />
                        </div>

                        <h2 className="mt-10 text-balance text-4xl font-medium leading-[1.05] text-[#0A211F] sm:text-5xl md:text-6xl">
                            {heading}{" "}
                            <span className="font-accent text-[#0A211F]">{accent}</span>
                        </h2>

                        <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#0A211F]/75 font-medium">
                            {description}
                        </p>

                        <p className="mt-6 max-w-xl text-[#0A211F]/75">
                            {helper}
                        </p>

                        <div className="mt-10">
                            <AnimatedButton href={ctaHref} color="dark">
                                {ctaText}
                            </AnimatedButton>
                        </div>
                    </div>

                    <div className="relative">
                        <div className="overflow-hidden rounded-3xl z-20 bg-[#0A211F] p-2 shadow-[0_25px_70px_-40px_rgba(0,0,0,.55)]">
                            <div className="relative overflow-hidden z-20 rounded-[1.25rem] bg-[#0A211F]">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={1200}
                                    height={800}
                                    className="h-auto w-full object-cover w-full md:h-[30rem] opacity-95"
                                    priority={false}
                                />
                            </div>
                        </div>

                        <div
                            aria-hidden
                            className="pointer-events-none md:block hidden absolute z-10  -right-10 -top-10 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(216,247,130,.18)_0%,rgba(216,247,130,0)_60%)]"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
