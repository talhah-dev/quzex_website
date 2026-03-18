import { buildPageMetadata } from "@/lib/seo";
import HomePageContent from "@/components/Home/HomePageContent";

export const metadata = buildPageMetadata({
  title: "quzex | Website Development and Digital Solutions",
  description:
    "quzex builds modern business websites, redesigns outdated websites, and delivers digital solutions focused on speed, clarity, and growth.",
  path: "/",
  keywords: [
    "quzex",
    "website development agency",
    "business website development",
    "dynamic website development",
    "static website development",
    "website redesign services",
  ],
});

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;

  return <HomePageContent selectedCategory={category} />;
}
