import DashboardBlogs from "@/components/Dashboard/Blog/DashboardBlogs";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function DashboardBlogPage() {
  return (
    <DashboardShell activeItem="blog">
      <DashboardBlogs />
    </DashboardShell>
  );
}
