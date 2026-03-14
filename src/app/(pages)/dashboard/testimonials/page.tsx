import DashboardTestimonials from "@/components/Dashboard/Testimonials/DashboardTestimonials";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function DashboardTestimonialsPage() {
  return (
    <DashboardShell activeItem="testimonials">
      <DashboardTestimonials />
    </DashboardShell>
  );
}

