import DashboardPortfolioCreate from "@/components/Dashboard/Portfolio/DashboardPortfolioCreate";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function PortfolioCreatePage() {
  return (
    <DashboardShell activeItem="portfolio">
      <DashboardPortfolioCreate />
    </DashboardShell>
  );
}
