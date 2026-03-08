import { Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const inquiries = [
  {
    id: "ENQ-001",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    service: "Website Redesign",
    date: "March 08, 2026",
    status: "New",
    message:
      "We need a modern redesign for our company website with better performance, clearer service pages, and a stronger conversion flow.",
  },
  {
    id: "ENQ-002",
    name: "Daniel Ross",
    email: "daniel.ross@example.com",
    phone: "+1 415 555 0187",
    service: "Full Stack Development",
    date: "March 06, 2026",
    status: "Reviewed",
    message:
      "Looking for a complete web platform with admin panel, API integration, and a custom dashboard for our internal operations team.",
  },
] as const;

export default function DashboardInquiries() {
  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Enquiries
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Received enquiries
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Review the latest website enquiries submitted through the contact flow. This page
                  is static for now and can later be connected to live form submissions.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                Total enquiries
              </p>
              <p className="mt-2 text-lg font-semibold text-[#0A211F]">
                {String(inquiries.length).padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
              Enquiry List
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#0A211F]">
              Recent client enquiries
            </h2>
          </div>
        </div>

        <div className="grid gap-4">
          {inquiries.map((inquiry) => {
            const isReviewed = inquiry.status === "Reviewed";

            return (
              <article
                key={inquiry.id}
                className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5"
              >
                <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                        {inquiry.id}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          inquiry.status === "New"
                            ? "bg-[#D8F782] text-[#0A211F]"
                            : "bg-white text-[#0A211F]/65"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#0A211F]">{inquiry.name}</h3>
                      <p className="mt-1 text-sm text-[#0A211F]/60">
                        {inquiry.service} {" | "} {inquiry.date}
                      </p>
                    </div>

                    <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68">
                      {inquiry.message}
                    </p>
                  </div>

                  <div className="grid gap-3 rounded-xl border border-[#0A211F]/10 bg-white px-4 py-4 text-sm text-[#0A211F]/72 xl:min-w-[260px]">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/40">
                        Email
                      </p>
                      <p className="mt-1 font-medium text-[#0A211F]">{inquiry.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/40">
                        Phone
                      </p>
                      <p className="mt-1 font-medium text-[#0A211F]">{inquiry.phone}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 border-t border-[#0A211F]/10 pt-3">
                      <button
                        type="button"
                        className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                          isReviewed
                            ? "border border-[#0A211F]/10 bg-white text-[#0A211F]/62"
                            : "border border-[#0A211F]/10 bg-[#EDF6E8] text-[#0A211F] hover:bg-[#DDEED5]"
                        }`}
                      >
                        <Eye className="size-3.5" />
                        <span>{isReviewed ? "Already Read" : "Read"}</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#C24141]/15 bg-[#FFF5F5] px-3 py-2 text-xs font-medium text-[#C24141] transition-colors hover:bg-[#FEEBEB]"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
