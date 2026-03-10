import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardOverview from "@/components/Dashboard/DashboardOverview";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <DashboardShell activeItem="overview">
      <DashboardOverview />
    </DashboardShell>
  );
}
