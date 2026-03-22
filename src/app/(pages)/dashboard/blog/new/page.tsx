import DashboardBlogCreate from "@/components/Dashboard/Blog/DashboardBlogCreate";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function DashboardBlogCreatePage() {
  return (
    <DashboardShell activeItem="blog">
      <DashboardBlogCreate />
    </DashboardShell>
  );
}
