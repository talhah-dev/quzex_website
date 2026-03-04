"use client";

import { Variants } from "framer-motion";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { TextEffect } from "@/components/ui/text-effect";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  heading: string;
  paragraph: string;
  primaryButtonLabel: string;
  primaryButtonHref: string;
  secondaryButtonLabel: string;
  secondaryButtonHref: string;
};

const transitionVariants: { item: Variants } = {
  item: {
    hidden: { opacity: 0, filter: "blur(12px)", y: 12 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { type: "spring", bounce: 0.3, duration: 1.5 },
    },
  },
};

export default function HeroSection({
  heading,
  paragraph,
  primaryButtonLabel,
  primaryButtonHref,
  secondaryButtonLabel,
  secondaryButtonHref,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden text-[#E9F3E6]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full overflow-hidden"
      >
        <div className="absolute inset-0 bg-[#0A211F]" />
        <div className="absolute inset-0 isolate opacity-65 contain-strict">
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(138,247,183,.14)_0,rgba(94,163,131,.06)_50%,rgba(10,33,31,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(216,247,130,.10)_0,rgba(94,163,131,.06)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,rgba(138,247,183,.08)_0,rgba(94,163,131,.05)_80%,transparent_100%)]" />
        </div>
      </div>

      <div className="relative py-32 md:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center w-full sm:mx-auto lg:mr-auto lg:mt-0">
            <h1 className="mx-auto mt-10 max-w-4xl text-balance font-medium text-4xl leading-[1.15] text-[#8AF7B7] md:text-7xl">
              <TextEffect preset="fade-in-blur" speedSegment={0.3} as="span" className="inline">
                {heading}
              </TextEffect>
            </h1>

            <TextEffect
              per="line"
              preset="fade-in-blur"
              speedSegment={0.3}
              delay={0.2}
              as="p"
              className="mx-auto mt-8 max-w-2xl text-lg text-[#E9F3E6]/80"
            >
              {paragraph}
            </TextEffect>

            <AnimatedGroup
              variants={{
                container: {
                  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } },
                },
                ...transitionVariants,
              }}
              className="mx-auto mt-12 flex w-full max-w-4xl flex-col items-center justify-center gap-7 sm:flex-row"
            >
              <AnimatedButton href={primaryButtonHref} color="light">
                {primaryButtonLabel}
              </AnimatedButton>
              <Link href={secondaryButtonHref} className="flex items-center gap-2">
                {secondaryButtonLabel} <ArrowRight size={18} />
              </Link>
            </AnimatedGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
