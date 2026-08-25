import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import WorkHeroSection from "@/components/Work/WorkHeroSection";
import WorkPortfolioSection from "@/components/Work/WorkPortfolioSection";

export const metadata = buildPageMetadata({
  title: "Portfolio & Case Studies | quzex",
  description:
    "Explore quzex portfolio of custom websites, web applications, website redesigns, and AI integrations built for clients across various industries worldwide.",
  path: "/work",
  keywords: [
    "quzex portfolio",
    "website project portfolio",
    "development portfolio",
    "design portfolio",
    "AI portfolio",
    "marketing portfolio",
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
