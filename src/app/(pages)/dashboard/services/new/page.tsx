import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardServiceCreate from "@/components/Dashboard/Services/DashboardServiceCreate";

export default function ServiceCreatePage() {
  return (
    <DashboardShell activeItem="services">
      <DashboardServiceCreate />
    </DashboardShell>
  );
}
