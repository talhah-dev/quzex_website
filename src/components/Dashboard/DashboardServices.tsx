 "use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Plus } from "lucide-react";
import DeleteServiceDialog from "@/components/Dashboard/Services/DeleteServiceDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getServices } from "@/lib/api/services";

export default function DashboardServices() {
  const { data: services = [], isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });

  const categoriesCount = new Set(services.map((service) => service.category)).size;

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

            <Button
              asChild
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <Link href="/dashboard/services/new">
                <Plus className="size-4" />
                <span>Add New Service</span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Active Services</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(services.length).padStart(2, "0")}
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

        {isLoading ? (
          <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5 text-sm text-[#0A211F]/62">
            Loading services...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-[#d9485f]/18 bg-[#fff5f5] p-5 text-sm text-[#8a1c2f]">
            Unable to load services right now.
          </div>
        ) : null}

        {!isLoading && !isError && services.length === 0 ? (
          <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5 text-sm text-[#0A211F]/62">
            No services have been added yet.
          </div>
        ) : null}

        {!isLoading && !isError && services.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service, index) => (
            <article
              key={service._id}
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
                        {String(service.priority ?? index + 1).padStart(2, "0")}
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
                    <Button
                      asChild
                      variant="outline"
                      className="h-8 rounded-full border-[#0A211F]/10 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
                    >
                      <Link href={`/dashboard/services/${service._id}/edit`}>
                        <Pencil className="size-3.5" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteServiceDialog
                      serviceId={service._id}
                      serviceTitle={service.title}
                    />
                  </div>
                </div>
              </div>
            </article>
            ))}
          </div>
        ) : null}
      </section>
    </div>
  );
}
