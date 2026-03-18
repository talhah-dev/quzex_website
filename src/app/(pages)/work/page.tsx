import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import WorkHeroSection from "@/components/Work/WorkHeroSection";
import WorkPortfolioSection from "@/components/Work/WorkPortfolioSection";

export const metadata = buildPageMetadata({
  title: "Our Work | quzex",
  description:
    "Explore quzex portfolio work across development, designing, AI, and marketing projects to see the quality and direction behind each delivery.",
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
  }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category } = await searchParams;
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
      <WorkPortfolioSection selectedCategory={category} />
    </Wrapper>
  );
}
