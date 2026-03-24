import DashboardPortfolio from "@/components/Dashboard/DashboardPortfolio";
import DashboardShell from "@/components/Dashboard/DashboardShell";

type PortfolioPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const { page } = await searchParams;
  const selectedPage = Number.parseInt(page || "1", 10);

  return (
    <DashboardShell activeItem="portfolio">
      <DashboardPortfolio
        selectedPage={Number.isFinite(selectedPage) && selectedPage > 0 ? selectedPage : 1}
      />
    </DashboardShell>
  );
}
