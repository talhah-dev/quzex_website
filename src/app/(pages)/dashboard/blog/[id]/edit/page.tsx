import DashboardBlogEdit from "@/components/Dashboard/Blog/DashboardBlogEdit";
import DashboardShell from "@/components/Dashboard/DashboardShell";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DashboardBlogEditPage({ params }: Props) {
  const { id } = await params;

  return (
    <DashboardShell activeItem="blog">
      <DashboardBlogEdit id={id} />
    </DashboardShell>
  );
}
