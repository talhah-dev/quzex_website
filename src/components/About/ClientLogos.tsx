"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

type Logo = {
  name: string;
  src: string;
};

const logos: Logo[] = [
  { name: "Client 01", src: "/client_logos/1.webp" },
  { name: "Client 02", src: "/client_logos/22.webp" },
  { name: "Client 03", src: "/client_logos/27.webp" },
  { name: "Client 04", src: "/client_logos/28.webp" },
  { name: "Client 05", src: "/client_logos/29.webp" },
  { name: "Client 06", src: "/client_logos/logo.webp" },
  { name: "Client 07", src: "/client_logos/logo1.webp" },
  { name: "Client 08", src: "/client_logos/logo.svg" },
];

const INITIAL_VISIBLE = 6;

export default function ClientLogos() {
  const [showAll, setShowAll] = useState(false);

  const visibleCount = showAll ? logos.length : Math.min(INITIAL_VISIBLE, logos.length);
  const visibleLogos = useMemo(() => logos.slice(0, visibleCount), [visibleCount]);

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
                  key={logo.src}
                  className=""
                >
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={84}
                    height={28}
                    className="h-6 w-auto object-contain grayscale"
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
                className="rounded-xl bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531]"
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
