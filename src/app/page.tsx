import { buildPageMetadata } from "@/lib/seo";
import HomePageContent from "@/components/Home/HomePageContent";
import { getTestimonialsServer } from "@/lib/server/testimonials";

export const metadata = buildPageMetadata({
  title: "Quzex | Website Development Agency in Pakistan",
  description:
    "Quzex is a professional website development agency in Pakistan — we build modern business websites, redesign outdated sites, and deliver digital solutions focused on speed, clarity, and growth.",
  path: "/",
  keywords: [
    "quzex",
    "website development agency",
    "website development agency in Pakistan",
    "web development company Karachi",
    "web development company Lahore",
    "web design Pakistan",
    "business website development",
    "custom website development",
    "website redesign services",
    "hire web developer Pakistan",
    "remote web development agency",
  ],
});

type HomeProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await searchParams;
  const initialReviews = await getTestimonialsServer();

  return <HomePageContent selectedCategory={category} initialReviews={initialReviews} />;
}
