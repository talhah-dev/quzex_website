import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardPortfolioEdit from "@/components/Dashboard/Portfolio/DashboardPortfolioEdit";

type DashboardPortfolioEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardPortfolioEditPage({
  params,
}: DashboardPortfolioEditPageProps) {
  const { id } = await params;

  return (
    <DashboardShell activeItem="portfolio">
      <div className="py-4">
        <DashboardPortfolioEdit portfolioId={id} />
      </div>
    </DashboardShell>
  );
}
