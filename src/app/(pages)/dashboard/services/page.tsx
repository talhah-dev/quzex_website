import DashboardServices from "@/components/Dashboard/DashboardServices";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function ServicesPage() {
  return (
    <DashboardShell activeItem="services">
      <DashboardServices />
    </DashboardShell>
  );
}
