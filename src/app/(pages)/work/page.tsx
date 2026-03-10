import Wrapper from "@/app/Wrapper";
import WorkHeroSection from "@/components/Work/WorkHeroSection";
import WorkPortfolioSection from "@/components/Work/WorkPortfolioSection";

type WorkPageProps = {
  searchParams: Promise<{
    category?: string;
  }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { category } = await searchParams;

  return (
    <Wrapper>
      <WorkHeroSection />
      <WorkPortfolioSection selectedCategory={category} />
    </Wrapper>
  );
}
