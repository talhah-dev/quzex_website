import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICE_ITEMS } from "@/lib/services";
import { cn } from "@/lib/utils";

type ServicesListingProps = {
  className?: string;
};

export default function ServicesListing({ className }: ServicesListingProps) {
  return (
    <section className={cn("px-4 py-16 md:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ITEMS.map((service) => (
            <Card
              key={service.id}
              className="group relative flex flex-col gap-2 bg-transparent overflow-hidden border-[#0A211F]/10 pt-0 shadow-none"
            >
              <div className="relative h-56 overflow-hidden sm:h-70">
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
                  <Badge variant="outline" className="border-[#0A211F]/20 bg-[#f7f9f2] text-[#0A211F]">
                    {service.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-[#0A211F]">
                    <Star className="size-4 fill-current" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>
                <CardTitle className="text-balance text-xl font-semibold text-[#0A211F]">
                  {service.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="line-clamp-3 text-sm text-[#0A211F]/70">{service.description}</p>
              </CardContent>

              <CardFooter className="flex-col items-start space-y-4 pt-4">
                <span className="text-sm text-[#0A211F]/70">{service.duration}</span>
                <Button
                  asChild
                  className="w-full cursor-pointer bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
                >
                  <Link href="/contact" className="inline-flex items-center justify-center">
                    Get Started
                    <ArrowRight className="ms-2 size-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
