import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif } from "next/font/google";
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
  title: "Quzex - Full-Stack Web Developer",
  description:
    "Quzex is the portfolio of Muhammad Talha, a full-stack web developer building fast, accessible, SEO-ready websites and web apps.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${interTight.className} ${instrumentSerif.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}