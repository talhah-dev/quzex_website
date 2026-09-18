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
    default: "Quzex | Website Development Agency in Pakistan",
    template: "%s | Quzex",
  },
  description:
    "Quzex is a professional website development agency in Pakistan, serving clients in Karachi, Lahore, and worldwide. We build modern business websites and deliver digital solutions.",
  keywords: [
    "quzex",
    "website development agency",
    "website development agency in Pakistan",
    "web development company Karachi",
    "web development company Lahore",
    "web design Pakistan",
    "business website development",
    "Next.js development",
    "website redesign",
    "AI integration",
    "hire web developer Pakistan",
    "remote web development agency",
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
