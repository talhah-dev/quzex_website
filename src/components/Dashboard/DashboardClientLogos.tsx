"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import DashboardClientLogosSkeleton from "@/components/Dashboard/ClientLogo/DashboardClientLogosSkeleton";
import EditClientLogoDialog from "@/components/Dashboard/ClientLogo/EditClientLogoDialog";
import ClientLogoUploadDialog from "@/components/Dashboard/ClientLogo/ClientLogoUploadDialog";
import DeleteClientLogoDialog from "@/components/Dashboard/ClientLogo/DeleteClientLogoDialog";
import { getAdminClientLogos } from "@/lib/api/client-logo";

export default function DashboardClientLogos() {
  const { data: logos = [], isLoading } = useQuery({
    queryKey: ["admin-client-logos"],
    queryFn: getAdminClientLogos,
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
                Client Logos
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Client logos dashboard
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Manage the logos shown in your client partnerships section from one clean admin
                  area.
                </p>
              </div>
            </div>

            <ClientLogoUploadDialog />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Total Client Logos</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(logos.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Total logos currently available in the client section.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Visible Logos</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(logos.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Logos currently organized and ready inside your client logo library.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
            Logo Library
          </p>
          <h2 className="text-2xl font-semibold text-[#0A211F]">Current client logos library</h2>
        </div>

        {isLoading ? (
          <DashboardClientLogosSkeleton />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {logos.length === 0 ? (
              <article className="rounded-xl border border-dashed border-[#0A211F]/14 bg-[#f7f9f2] p-6 text-sm text-[#0A211F]/62 md:col-span-2 xl:col-span-3">
                No client logos found yet. Upload a logo to see it here.
              </article>
            ) : null}

            {logos.map((logo, index) => (
              <article
                key={logo._id}
                className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-medium text-[#0A211F]">
                      Uploaded
                    </span>
                  </div>

                  <div className="flex h-28 items-center justify-center rounded-xl border border-[#0A211F]/10 bg-white px-4">
                    <Image
                      src={logo.src}
                      alt={logo.name}
                      width={120}
                      height={40}
                      unoptimized
                      className="h-20 md:h-30 w-auto object-contain grayscale brightness-80 opacity-65"
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="font-semibold text-[#0A211F]">{logo.name}</p>
                    <p className="text-sm text-[#0A211F]/58">{logo.src}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <EditClientLogoDialog logo={logo} />
                    <DeleteClientLogoDialog logoId={logo._id} logoName={logo.name} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
