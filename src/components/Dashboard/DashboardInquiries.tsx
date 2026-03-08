"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getAdminInquiries } from "@/lib/api/contact";
import DashboardInquiriesSkeleton from "@/components/Dashboard/Inquiries/DashboardInquiriesSkeleton";

function formatInquiryDate(date?: string) {
  if (!date) {
    return "No date available";
  }

  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

function formatStatus(status?: string) {
  if (!status) {
    return "New";
  }

  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default function DashboardInquiries() {
  const { data: inquiries = [], isLoading, isError } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: getAdminInquiries,
  });

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
                  Review the latest website enquiries submitted through the contact form.
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
              Submitted contact emails
            </h2>
          </div>
        </div>

        {isLoading ? <DashboardInquiriesSkeleton /> : null}

        {isError ? (
          <div className="rounded-xl border border-[#C24141]/15 bg-[#FFF5F5] p-5 text-sm text-[#C24141]">
            Unable to load enquiries right now.
          </div>
        ) : null}

        {!isLoading && !isError && inquiries.length === 0 ? (
          <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5 text-sm text-[#0A211F]/62">
            No enquiries have been submitted yet.
          </div>
        ) : null}

        {!isLoading && !isError && inquiries.length > 0 ? (
          <div className="grid gap-4">
            {inquiries.map((inquiry, index) => {
              const status = formatStatus(inquiry.status);
              const isReviewed = status === "Reviewed";

              return (
                <article
                  key={inquiry._id}
                  className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5"
                >
                  <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                          ENQ-{String(index + 1).padStart(3, "0")}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            status === "New"
                              ? "bg-[#D8F782] text-[#0A211F]"
                              : "bg-white text-[#0A211F]/65"
                          }`}
                        >
                          {status}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-[#0A211F]">{inquiry.name}</h3>
                        <p className="mt-1 text-sm text-[#0A211F]/60">
                          {inquiry.service} {" | "} {formatInquiryDate(inquiry.createdAt)}
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
                        <p className="mt-1 break-all font-medium text-[#0A211F]">
                          {inquiry.email}
                        </p>
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
        ) : null}
      </section>
    </div>
  );
}
