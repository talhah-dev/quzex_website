import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import connectToDatabase from "@/lib/dbConnect";
import ServiceModel from "@/models/Service";
import { cn } from "@/lib/utils";
import type { ServiceRecord } from "@/types";

type ServicesListingProps = {
  className?: string;
};

async function getPublishedServices(): Promise<ServiceRecord[]> {
  await connectToDatabase();

  const services = await ServiceModel.find({
    isActive: true,
    showOnServicesPage: true,
  })
    .sort({ priority: 1, createdAt: -1 })
    .lean();

  return services.map((service) => ({
    ...service,
    _id: service._id.toString(),
  })) as ServiceRecord[];
}

export default async function ServicesListing({ className }: ServicesListingProps) {
  let services: ServiceRecord[] = [];
  let hasError = false;

  try {
    services = await getPublishedServices();
  } catch (error) {
    hasError = true;
    console.error("Unable to load services listing:", error);
  }

  return (
    <section className={cn("px-4 py-16 md:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        {hasError ? (
          <div className="rounded-2xl border border-[#d9485f]/15 bg-[#fff5f5] p-6 text-sm text-[#8a1c2f]">
            Unable to load services right now.
          </div>
        ) : null}

        {!hasError && services.length === 0 ? (
          <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 text-sm text-[#0A211F]/70">
            No services are available right now.
          </div>
        ) : null}

        {!hasError && services.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                key={service._id}
                className="group relative flex flex-col gap-2 overflow-hidden border-[#0A211F]/10 bg-transparent pt-0 shadow-none"
              >
                <Link href={`/services/${service.slug}`} className="block">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={`${service.title} - ${service.category}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  <CardHeader className="flex-1 pt-4">
                    <div className="mb-3 flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className="border-[#0A211F]/20 bg-[#f7f9f2] text-[#0A211F]"
                      >
                        {service.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-balance text-xl font-semibold text-[#0A211F]">
                      {service.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    <p className="line-clamp-3 text-sm text-[#0A211F]/70">{service.description}</p>
                  </CardContent>
                </Link>

                <CardFooter className="flex-col items-start space-y-4 pt-4">
                  <span className="text-sm text-[#0A211F]/70">{service.duration}</span>
                  <Button
                    asChild
                    className="w-full cursor-pointer bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center justify-center"
                    >
                      View Details
                      <ArrowRight className="ms-2 size-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
