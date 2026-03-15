import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardTestimonialEdit from "@/components/Dashboard/Testimonials/DashboardTestimonialEdit";

type DashboardTestimonialEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardTestimonialEditPage({
  params,
}: DashboardTestimonialEditPageProps) {
  const { id } = await params;

  return (
    <DashboardShell activeItem="testimonials">
      <div className="py-4">
        <DashboardTestimonialEdit testimonialId={id} />
      </div>
    </DashboardShell>
  );
}
