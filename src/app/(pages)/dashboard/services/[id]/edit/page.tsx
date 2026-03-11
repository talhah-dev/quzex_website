import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardServiceEdit from "@/components/Dashboard/Services/DashboardServiceEdit";

type DashboardServiceEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardServiceEditPage({
  params,
}: DashboardServiceEditPageProps) {
  const { id } = await params;

  return (
    <DashboardShell activeItem="services">
      <div className="py-4">
        <DashboardServiceEdit serviceId={id} />
      </div>
    </DashboardShell>
  );
}
