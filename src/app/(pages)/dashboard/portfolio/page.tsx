import DashboardPortfolio from "@/components/Dashboard/DashboardPortfolio";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function PortfolioPage() {
  return (
    <DashboardShell activeItem="portfolio">
      <DashboardPortfolio />
    </DashboardShell>
  );
}
