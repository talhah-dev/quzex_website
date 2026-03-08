import Image from "next/image";
import { PencilLine, Trash2, UploadCloud } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CLIENT_LOGOS } from "@/lib/client-logos";
import ClientLogoUploadDialog from "@/components/Dashboard/ClientLogo/ClientLogoUploadDialog";

export default function DashboardClientLogos() {
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
                {String(CLIENT_LOGOS.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Total logos currently available in the client section.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Visible Logos</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(CLIENT_LOGOS.length).padStart(2, "0")}
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {CLIENT_LOGOS.map((logo) => (
            <article
              key={logo.id}
              className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                    {String(logo.id).padStart(2, "0")}
                  </span>
                  <span className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-medium text-[#0A211F]">
                    Logo
                  </span>
                </div>

                <div className="flex h-28 items-center justify-center rounded-xl border border-[#0A211F]/10 bg-white px-4">
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>

                <div className="space-y-2">
                  <p className="font-semibold text-[#0A211F]">{logo.name}</p>
                  <p className="text-sm text-[#0A211F]/58">{logo.src}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-[#0A211F]/10 bg-white px-3 py-2 text-xs font-medium text-[#0A211F] transition-colors hover:bg-[#EDF6E8]"
                  >
                    <PencilLine className="size-3.5" />
                    <span>Edit</span>
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
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
