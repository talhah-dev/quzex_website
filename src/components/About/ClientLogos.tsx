"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getClientLogos } from "@/lib/api/client-logo";

const INITIAL_VISIBLE = 18;

export default function ClientLogos() {
  const [showAll, setShowAll] = useState(false);
  const { data = [] } = useQuery({
    queryKey: ["client-logos"],
    queryFn: getClientLogos,
  });

  const logos = data;

  const visibleCount = showAll
    ? logos.length
    : Math.min(INITIAL_VISIBLE, logos.length);
  const visibleLogos = logos.slice(0, visibleCount);

  return (
    <section className="relative w-full py-12 text-[#0A211F] md:py-16">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="mb-10 space-y-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="size-5 text-[#0A211F]" />
              <span className="text-sm font-medium text-[#0A211F]/80">Client Partnerships</span>
            </div>
            <h2 className="text-balance text-3xl font-semibold md:text-4xl">
              Brands that trusted our website services
            </h2>
            <p className="text-center text-sm text-[#0A211F]/65">
              More client collaborations are added as we continue delivering high-quality web
              solutions.
            </p>
          </div>

          <div className="relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12">
              {visibleLogos.map((logo) => (
                <article
                  key={logo.id}
                  className=""
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={84}
                    height={28}
                    unoptimized
                    className="h-20 md:h-30 w-auto object-contain brightness-70 grayscale opacity-65 md:h-10 h-6"
                  />
                </article>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#0A211F]/70">
              Showing {visibleCount} of {logos.length} logos
            </p>

            {logos.length > INITIAL_VISIBLE ? (
              <Button
                type="button"
                onClick={() => setShowAll((prev) => !prev)}
                className="rounded-lg bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531]"
              >
                {showAll ? "Show less logos" : "View all logos"}
                <ArrowRight className="ml-2 size-4" />
              </Button>
            ) : null}
          </div>


        </div>
      </div>
    </section>
  );
}
