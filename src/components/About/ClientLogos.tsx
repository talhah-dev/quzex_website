"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Logo = {
  name: string;
  src: string;
};

const logos: Logo[] = [
  { name: "Client Logo 1", src: "/client_logos/1.webp" },
  { name: "Client Logo 2", src: "/client_logos/22.webp" },
  { name: "Client Logo 3", src: "/client_logos/27.webp" },
  { name: "Client Logo 4", src: "/client_logos/28.webp" },
  { name: "Client Logo 5", src: "/client_logos/29.webp" },
  { name: "Client Logo 6", src: "/client_logos/logo.webp" },
  { name: "Client Logo 7", src: "/client_logos/logo1.webp" },
  { name: "Client Logo 8", src: "/client_logos/logo.svg" },
];

const INITIAL_VISIBLE = 4;

export default function ClientLogos() {
  const [showAll, setShowAll] = useState(false);

  const visibleCount = showAll ? logos.length : Math.min(INITIAL_VISIBLE, logos.length);
  const visibleLogos = useMemo(() => logos.slice(0, visibleCount), [visibleCount]);

  return (
    <section className="w-full bg-[#f7f9f2] text-[#0A211F]">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-10 md:py-14">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Badge variant="outline" className="rounded-full border-[#0A211F]/20 bg-[#EDF6E8]">
              Our clients
            </Badge>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl">
              Brands we have worked with
            </h2>
            <p className="mt-2 text-sm text-[#0A211F]/70">
              Showing {visibleCount} of {logos.length} logos
            </p>
          </div>

          {logos.length > INITIAL_VISIBLE ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAll((prev) => !prev)}
              className="rounded-xl border-[#0A211F]/20 bg-[#EDF6E8] text-[#0A211F] hover:bg-[#DDEFD2]"
            >
              {showAll ? "Show less" : "Show all logos"}
            </Button>
          ) : null}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {visibleLogos.map((logo) => (
            <article
              key={logo.src}
              className="flex h-24 items-center justify-center rounded-2xl border border-[#0A211F]/10 bg-[#EDF6E8] p-4"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={140}
                height={56}
                className="h-10 w-auto object-contain opacity-80 grayscale"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
