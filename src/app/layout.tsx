import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { buildOrganizationSchema, buildWebsiteSchema, stringifyJsonLd } from "@/lib/seo";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Providers from "./providers/react-query-provider";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  fallback: ["Inter", "Arial", "sans-serif"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://quzex.co"),
  title: {
    default: "Quzex | Website Development Agency",
    template: "%s | Quzex",
  },
  description:
    "Quzex builds modern business websites, redesigns outdated websites, and delivers digital solutions focused on speed, clarity, and growth.",
  keywords: [
    "website development agency",
    "business website development",
    "Next.js development",
    "website redesign",
    "AI integration",
    "quzex",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en">
      <body className={`${interTight.className} ${instrumentSerif.variable} antialiased`}>
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildWebsiteSchema()) }}
        />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
