import DashboardInquiries from "@/components/Dashboard/DashboardInquiries";
import DashboardShell from "@/components/Dashboard/DashboardShell";

export default function InquiriesPage() {
  return (
    <DashboardShell activeItem="enquiries">
      <DashboardInquiries />
    </DashboardShell>
  );
}
