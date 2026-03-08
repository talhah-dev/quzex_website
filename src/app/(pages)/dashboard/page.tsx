import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";

export default function DashboardPage() {
  return (
    <DashboardShell activeItem="overview">
      <DashboardOverview />
    </DashboardShell>
  );
}
