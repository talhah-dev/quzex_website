"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";

type ImageCTASectionProps = {
    backgroundImage?: string;
    eyebrow?: string;
    titleTop?: string;
    accentText?: string;
    titleBottom?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
};

export default function CTA({
    backgroundImage = "/22.png",
    eyebrow = "LET’S BUILD YOUR NEXT PROJECT",
    titleTop = "Now imagine this",
    accentText = "creative power",
    titleBottom = "behind your next project",
    description = "I help startups and businesses ship fast, accessible, and SEO-ready websites and web apps. Tell me your goal—I'll handle the build.",
    buttonText = "Book a demo",
    buttonHref = "/contact",
}: ImageCTASectionProps) {
    return (
        <section className="px-4  max-w-7xl mx-auto">
            <div
                className="relative overflow-hidden rounded-3xl flex items-center"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    // backgroundPosition: "center",
                }}
            >
                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto px-6 md:px-16 py-14 md:py-16">
                        <div className="max-w-2xl">
                            <p className="text-sm tracking-widest uppercase text-white/80">
                                {eyebrow}
                            </p>

                            <h2 className="mt-6 text-balance text-4xl md:text-6xl font-medium leading-[1.05] text-white">
                                {titleTop}{" "}
                                <span className="font-accent text-[#D8F782]">{accentText}</span>{" "}
                                {titleBottom}
                            </h2>

                            <p className="mt-6 max-w-xl text-base md:text-lg text-white/90 leading-relaxed">
                                {description}
                            </p>

                            <div className="mt-10">
                                <AnimatedButton href={buttonHref} color="light">
                                    {buttonText}
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/35 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/15 to-transparent" />
            </div>
        </section>
    );
}