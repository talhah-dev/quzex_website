import DashboardClientLogos from "@/components/Dashboard/DashboardClientLogos";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function ClientLogosPage() {
  return (
    <DashboardShell activeItem="clientLogos">
      <DashboardClientLogos />
    </DashboardShell>
  );
}
