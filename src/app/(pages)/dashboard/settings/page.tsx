import DashboardSettings from "@/components/Dashboard/DashboardSettings";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell activeItem="settings">
      <DashboardSettings />
    </DashboardShell>
  );
}
