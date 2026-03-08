import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { SERVICE_ITEMS } from "@/lib/services";

const categoriesCount = new Set(SERVICE_ITEMS.map((service) => service.category)).size;

export default function DashboardServices() {
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
                Services
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Services dashboard
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Review how many services are currently published and which offers are visible on
                  the frontend services page.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Active Services</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(SERVICE_ITEMS.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Total services currently listed on the website.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Service Categories</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(categoriesCount).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Distinct service categories currently represented in the dashboard.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Frontend Status</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">Live</p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                These services are currently available on the public services section.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
            Service List
          </p>
          <h2 className="text-2xl font-semibold text-[#0A211F]">
            Services currently shown on the frontend
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {SERVICE_ITEMS.map((service) => (
            <article
              key={service.id}
              className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-3"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-36 w-full overflow-hidden rounded-lg sm:w-44">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="(min-width: 768px) 176px, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                        {String(service.id).padStart(2, "0")}
                      </span>
                      <span className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-medium text-[#0A211F]">
                        {service.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#0A211F]">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-[#0A211F]/62">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <span className="rounded-full border border-[#0A211F]/10 bg-white px-3 py-1 text-xs font-medium text-[#0A211F]/62">
                      {service.duration}
                    </span>
                    <span className="rounded-full border border-[#0A211F]/10 bg-white px-3 py-1 text-xs font-medium text-[#0A211F]/62">
                      {service.rating.toFixed(1)} rating
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
