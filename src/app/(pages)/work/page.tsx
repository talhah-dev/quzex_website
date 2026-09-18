import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import WorkHeroSection from "@/components/Work/WorkHeroSection";
import WorkPortfolioSection from "@/components/Work/WorkPortfolioSection";

export const metadata = buildPageMetadata({
  title: "Web Development Portfolio & Case Studies | Quzex Pakistan",
  description:
    "Explore Quzex's portfolio of custom websites, web applications, website redesigns, and AI integrations built for clients across Pakistan and worldwide.",
  path: "/work",
  keywords: [
    "quzex portfolio",
    "web development portfolio Pakistan",
    "website case studies",
    "client website examples",
    "Next.js portfolio",
    "website redesign portfolio",
    "web design examples Karachi",
    "web design examples Lahore",
    "development portfolio Pakistan",
  ],
});

type WorkPageProps = {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category, page, search } = await searchParams;
  const selectedPage = Number.parseInt(page || "1", 10);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <WorkHeroSection />
      <WorkPortfolioSection
        selectedCategory={category}
        selectedPage={Number.isFinite(selectedPage) && selectedPage > 0 ? selectedPage : 1}
        selectedSearch={search || ""}
      />
    </Wrapper>
  );
}
