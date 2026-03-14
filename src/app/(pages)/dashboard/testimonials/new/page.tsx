import DashboardShell from "@/components/Dashboard/DashboardShell";
import DashboardTestimonialCreate from "@/components/Dashboard/Testimonials/DashboardTestimonialCreate";

export default function DashboardTestimonialCreatePage() {
  return (
    <DashboardShell activeItem="testimonials">
      <DashboardTestimonialCreate />
    </DashboardShell>
  );
}
