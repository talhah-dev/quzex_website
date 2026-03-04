import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Service {
  id: number;
  title: string;
  duration: string;
  rating: number;
  image: string;
  category: string;
  description: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Full Stack Development",
    duration: "2-5 weeks",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&auto=format&fit=crop&q=60",
    category: "Development",
    description:
      "Complete web solutions from frontend to backend with clean architecture, strong performance, and scalable code.",
  },
  {
    id: 2,
    title: "Static Website Development",
    duration: "3-7 days",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=900&auto=format&fit=crop&q=60",
    category: "Websites",
    description:
      "Fast, lightweight static websites that are SEO-friendly, secure, and ideal for business presence and landing pages.",
  },
  {
    id: 3,
    title: "Frontend Development",
    duration: "1-3 weeks",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&auto=format&fit=crop&q=60",
    category: "Frontend",
    description:
      "Modern user interfaces with smooth interactions, responsive layouts, and accessible design for all devices.",
  },
  {
    id: 4,
    title: "Backend Development",
    duration: "1-4 weeks",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60",
    category: "Backend",
    description:
      "Reliable server-side systems, APIs, and business logic built for speed, security, and long-term stability.",
  },
  {
    id: 5,
    title: "Database Design and Integration",
    duration: "3-10 days",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&auto=format&fit=crop&q=60",
    category: "Database",
    description:
      "Structured database planning, optimization, and integration to ensure your data is organized, fast, and dependable.",
  },
  {
    id: 6,
    title: "Mobile App Development",
    duration: "4-8 weeks",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=60",
    category: "Mobile",
    description:
      "Cross-platform mobile apps with clean UI, strong performance, and smooth integration with your web systems.",
  },
  {
    id: 7,
    title: "Website Redesign",
    duration: "1-3 weeks",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&auto=format&fit=crop&q=60",
    category: "Redesign",
    description:
      "Upgrade your existing website with a modern look, improved user flow, and better technical performance.",
  },
];

type ServicesListingProps = {
  className?: string;
};

export default function ServicesListing({ className }: ServicesListingProps) {
  return (
    <section className={cn("px-4 py-16 md:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-[#0A211F] md:text-4xl">
            Website Services We Provide
          </h2>
          <p className="mt-4 text-[#0A211F]/70">
            High-quality services focused on performance, design, and business goals
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative flex flex-col gap-2 overflow-hidden border-[#0A211F]/10 pt-0 shadow-none"
            >
              <div className="relative aspect-video overflow-hidden">
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
