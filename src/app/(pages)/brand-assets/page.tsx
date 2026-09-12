import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/app/Wrapper";
import { SITE_CONFIG, SITE_LINKS } from "@/lib/site";
import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import {
  Download,
  Palette,
  Type,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Mail,
  Layers,
} from "lucide-react";

export const metadata = buildPageMetadata({
  title: "Brand Assets & Guidelines | Quzex",
  description:
    "Download official Quzex logos, wordmarks, and brand guidelines. Access the assets you need to reference, integrate with, or partner with Quzex.",
  path: "/brand-assets",
  keywords: [
    "quzex brand assets",
    "quzex logo download",
    "quzex brand guidelines",
    "quzex press kit",
    "quzex media kit",
  ],
});

const brandColors = [
  {
    name: "Primary Dark",
    hex: "#0A211F",
    textClass: "text-[#E9F3E6]",
    description: "Main brand dark. Used for backgrounds, text, and primary UI.",
  },
  {
    name: "Primary Light",
    hex: "#E9F3E6",
    textClass: "text-[#0A211F]",
    description: "Light backgrounds, cards, and text on dark surfaces.",
  },
  {
    name: "Accent Green",
    hex: "#8AF7B7",
    textClass: "text-[#0A211F]",
    description: "Highlight color for headings, badges, and key elements.",
  },
  {
    name: "Lime",
    hex: "#D8F782",
    textClass: "text-[#0A211F]",
    description: "Secondary accent for tags, active states, and hover effects.",
  },
  {
    name: "Surface Green",
    hex: "#EDF6E8",
    textClass: "text-[#0A211F]",
    description: "Subtle surface tint for cards, sections, and soft contrast.",
  },
  {
    name: "Deep Teal",
    hex: "#143531",
    textClass: "text-[#E9F3E6]",
    description: "Hover state for primary dark. Used in interactive elements.",
  },
];

export default function BrandAssetsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Brand Assets", path: "/brand-assets" },
  ]);

  return (
    <Wrapper forceNavbarBackground={true}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24 text-[#E9F3E6]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-full overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0A211F]" />
          <div className="absolute inset-0 isolate opacity-65 contain-strict">
            <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,rgba(138,247,183,.14)_0,rgba(94,163,131,.06)_50%,rgba(10,33,31,0)_80%)]" />
            <div className="h-320 absolute right-0 top-0 w-80 rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(216,247,130,.10)_0,rgba(94,163,131,.06)_80%,transparent_100%)]" />
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-[#8AF7B7] backdrop-blur">
            <Layers className="w-3.5 h-3.5" />
            Press &amp; Media Kit
          </div>

          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-[#8AF7B7] mb-6">
            Brand Assets
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-[#E9F3E6]/90 leading-relaxed">
            Official {SITE_CONFIG.name} logos, color palette, and brand guidelines.
            Download the assets you need to write about, integrate with, or partner with us.
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-20">
        <div className="mx-auto max-w-5xl px-6 space-y-20">

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Download className="w-6 h-6 text-[#0A211F]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
                Logo &amp; Wordmark
              </h2>
            </div>
            <p className="text-black/75 text-base md:text-lg leading-relaxed max-w-3xl">
              The Quzex wordmark is our primary brand identifier. Use it with clear space on all sides and never distort, recolor, or modify the logo.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="group relative overflow-hidden rounded-2xl border border-[#0A211F]/10 bg-white p-8 transition-shadow hover:shadow-lg">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A211F]/45 mb-6">
                  Logo on Light
                </p>
                <div className="flex items-center justify-center rounded-xl bg-[#f7f9f2] py-12 px-8">
                  <Image
                    src="/quzex.png"
                    alt="Quzex logo — dark variant on light background"
                    width={240}
                    height={80}
                    className="h-14 w-auto object-contain invert brightness-0"
                  />
                </div>
                <p className="mt-4 text-sm text-[#0A211F]/60">
                  Use on white or light-colored surfaces.
                </p>
              </div>

              <div className="group relative overflow-hidden rounded-2xl border border-[#0A211F]/10 bg-white p-8 transition-shadow hover:shadow-lg">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A211F]/45 mb-6">
                  Logo on Dark
                </p>
                <div className="flex items-center justify-center rounded-xl bg-[#0A211F] py-12 px-8">
                  <Image
                    src="/quzex.png"
                    alt="Quzex logo — light variant on dark background"
                    width={240}
                    height={80}
                    className="h-14 w-auto object-contain brightness-[10] invert-0"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </div>
                <p className="mt-4 text-sm text-[#0A211F]/60">
                  Use on dark or image-heavy backgrounds.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 md:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A211F]/45 mb-6">
                Full Lockup
              </p>
              <div className="flex items-center justify-center rounded-xl bg-gradient-to-br from-[#0A211F] to-[#143531] py-16 px-8">
                <Image
                  src="/quzex.png"
                  alt="Quzex full logo lockup"
                  width={320}
                  height={140}
                  className="h-20 w-auto object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
              </div>
              <p className="mt-4 text-sm text-[#0A211F]/60">
                Full lockup for presentations, partner pages, and press materials.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-black/8" />

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Palette className="w-6 h-6 text-[#0A211F]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
                Color Palette
              </h2>
            </div>
            <p className="text-black/75 text-base md:text-lg leading-relaxed max-w-3xl">
              Our color system is rooted in deep greens and natural tones that reflect reliability, growth, and technical precision. Use these values exactly as specified.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {brandColors.map((color) => (
                <div
                  key={color.hex}
                  className="group overflow-hidden rounded-2xl border border-[#0A211F]/10 bg-white transition-shadow hover:shadow-lg"
                >
                  <div
                    className="flex h-28 items-end p-4"
                    style={{ backgroundColor: color.hex }}
                  >
                    <span className={`text-sm font-semibold ${color.textClass}`}>
                      {color.hex}
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <p className="text-sm font-semibold text-[#0A211F]">{color.name}</p>
                    <p className="text-xs leading-relaxed text-[#0A211F]/60">{color.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px w-full bg-black/8" />

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <Type className="w-6 h-6 text-[#0A211F]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
                Typography
              </h2>
            </div>
            <p className="text-black/75 text-base md:text-lg leading-relaxed max-w-3xl">
              We use the Inter typeface family across all digital platforms for its clarity, readability, and modern feel.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 md:p-8 space-y-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
                  Headings
                </p>
                <div className="space-y-4">
                  <p className="text-4xl font-bold text-[#0A211F] leading-tight">
                    Inter Bold
                  </p>
                  <p className="text-2xl font-semibold text-[#0A211F] leading-tight">
                    Inter Semibold
                  </p>
                  <p className="text-xl font-medium text-[#0A211F] leading-tight">
                    Inter Medium
                  </p>
                </div>
                <p className="text-xs text-[#0A211F]/50">
                  Used for page titles, section headings, and emphasis.
                </p>
              </div>

              <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 md:p-8 space-y-6">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
                  Body &amp; UI
                </p>
                <div className="space-y-4">
                  <p className="text-lg text-[#0A211F] leading-relaxed">
                    Inter Regular — used for paragraphs and general body text across all pages.
                  </p>
                  <p className="text-sm text-[#0A211F]/70 leading-relaxed">
                    Inter Regular (14px) — used for smaller descriptions, labels, and secondary information throughout the interface.
                  </p>
                </div>
                <p className="text-xs text-[#0A211F]/50">
                  Optimized for 16px base with 1.6 line-height for readability.
                </p>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-black/8" />

          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-[#0A211F]" />
              <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
                Usage Guidelines
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/40 p-6 md:p-8 space-y-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" />
                  Do
                </p>
                <ul className="space-y-3 text-sm text-[#0A211F]/75 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    Use the official logo files provided on this page.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    Maintain clear space around the logo (minimum equal to the height of the &ldquo;q&rdquo; character).
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    Use the dark logo on light backgrounds and the light logo on dark backgrounds.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-emerald-500" />
                    Reference &ldquo;Quzex&rdquo; with a capital &ldquo;Q&rdquo; in written copy.
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-red-200/60 bg-red-50/40 p-6 md:p-8 space-y-5">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-red-600">
                  <XCircle className="w-4 h-4" />
                  Don&apos;t
                </p>
                <ul className="space-y-3 text-sm text-[#0A211F]/75 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                    Alter, rotate, stretch, or distort the logo in any way.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                    Change the logo colors or apply gradient fills.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                    Place the logo on busy or low-contrast backgrounds.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <XCircle className="w-4 h-4 mt-0.5 shrink-0 text-red-400" />
                    Use the Quzex name or logo to imply endorsement without written permission.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="h-px w-full bg-black/8" />

          <div className="space-y-6 pb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0A211F]">
              Need Something Specific?
            </h2>
            <p className="text-black/75 text-base md:text-lg leading-relaxed max-w-3xl">
              If you need additional file formats, custom lockups, or co-branding assets for a partnership, press article, or event, get in touch with us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={SITE_LINKS.mailto}
                className="inline-flex items-center gap-2 text-[#0A211F] hover:underline text-base font-medium"
              >
                <Mail className="w-5 h-5 text-[#0A211F]" />
                {SITE_CONFIG.email}
              </a>
              <span className="hidden sm:inline text-black/30">·</span>
              <Link
                href="/contact"
                className="inline-flex items-center text-[#0A211F] hover:underline text-base font-medium"
              >
                Contact Form →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
