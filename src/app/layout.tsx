import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { buildOrganizationSchema, stringifyJsonLd } from "@/lib/seo";
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
  title: "quzex - Website Development and Digital Solutions",
  description:
    "quzex provides professional website development, static and dynamic websites, website redesign, backend systems, database integration, AI solutions, and digital services for modern businesses.",
  keywords: [
    "website development",
    "dynamic website development",
    "static website development",
    "website redesign",
    "backend development",
    "database integration",
    "AI chatbot integration",
    "AI blog post integration",
    "mobile app development",
    "social media management",
    "quzex",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang="en">
      <body className={`${interTight.className} ${instrumentSerif.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: stringifyJsonLd(organizationSchema) }}
        />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
