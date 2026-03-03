"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type MarqueeLogo = {
    name: string;
    src: string;
    width?: number;
    height?: number;
};

export const DEFAULT_MARQUEE_LOGOS: MarqueeLogo[] = [
    { name: "Logo", src: "/client_logos/1.webp" },
    { name: "Logo", src: "/client_logos/27.webp" },
    { name: "Logo", src: "/client_logos/28.webp" },
    { name: "Logo", src: "/client_logos/29.webp" },
    { name: "Logo", src: "/client_logos/1.webp" },
    // { name: "Logo", src: "/client_logos/logo.webp" },
    // { name: "Logo", src: "/client_logos/logo1.webp" },
    // { name: "Logo", src: "/client_logos/logo.svg" },
];

type Props = {
    title?: string;
    logos?: MarqueeLogo[];
    className?: string;
    speedSeconds?: number;
    invertLogos?: boolean;
};

function MarqueeRow({
    logos,
    reverse = false,
    speedSeconds,
    invertLogos = false,
}: {
    logos: MarqueeLogo[];
    reverse?: boolean;
    speedSeconds: number;
    invertLogos?: boolean;
}) {
    const doubled = [...logos, ...logos];
    const style = { ["--qm-duration" as any]: `${speedSeconds}s` } as CSSProperties;

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
                "[-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
            )}
        >
            <div
                className={cn(
                    "flex w-max items-center gap-10 md:gap-16 will-change-transform motion-reduce:transform-none",
                    "qm-marquee",
                    reverse && "qm-marquee-reverse"
                )}
                style={style}
            >
                {doubled.map((logo, i) => (
                    <div
                        key={`${logo.name}-${i}`}
                        className="shrink-0"
                        aria-hidden={i >= logos.length}
                    >
                        <Image
                            src={logo.src}
                            alt={logo.name}
                            width={logo.width ?? 140}
                            height={logo.height ?? 36}
                            sizes="(min-width: 768px) 140px, 120px"
                            className={cn(
                                "h-7 w-auto md:h-24 opacity-60 grayscale brightness-0 transition-opacity duration-300 hover:opacity-90",
                                invertLogos && "invert"
                            )}
                        />
                    </div>
                ))}
            </div>

            <style jsx global>{`
        @keyframes qm-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        .qm-marquee {
          animation: qm-marquee var(--qm-duration) linear infinite;
        }
        .qm-marquee-reverse {
          animation-direction: reverse;
        }
        @media (prefers-reduced-motion: reduce) {
          .qm-marquee {
            animation: none !important;
          }
        }
      `}</style>
        </div>
    );
}

export default function TrustedMarquee({
    title = "Trusted by 250+ of the world’s brands",
    logos = DEFAULT_MARQUEE_LOGOS,
    className,
    speedSeconds = 26,
    invertLogos = false,
}: Props) {
    if (!logos.length) return null;

    return (
        <section className={cn("w-full", className)}>
            <div className="mx-auto max-w-7xl px-6 pt-16 md:pt-24 pb-10">
                <div className="text-center text-sm md:text-base text-[#0a211f]">
                    {title}
                </div>

                <div className="mt-10 space-y-7">
                    <MarqueeRow
                        logos={logos}
                        speedSeconds={speedSeconds}
                        invertLogos={invertLogos}
                    />
                    <MarqueeRow
                        logos={[...logos].reverse()}
                        reverse
                        speedSeconds={Math.max(18, speedSeconds - 6)}
                        invertLogos={invertLogos}
                    />
                </div>
            </div>
        </section>
    );
}