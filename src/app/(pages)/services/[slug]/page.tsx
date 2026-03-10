import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import PricingSection from "@/components/Home/PricingSection";
import { Button } from "@/components/ui/button";
import { DEFAULT_PRICING_PLANS } from "@/lib/pricing";
import { SERVICE_ITEMS, getServiceBySlug } from "@/lib/services";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getServiceHighlights(serviceTitle: string) {
  return [
    `${serviceTitle} planned around your exact business requirements`,
    "Clean implementation with performance and responsive behavior in mind",
    "Structured delivery process with clear communication and review support",
  ];
}

export async function generateStaticParams() {
  return SERVICE_ITEMS.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const highlights = getServiceHighlights(service.title);

  return (
    <Wrapper>
      <HeroSection
        heading={service.title}
        paragraph={service.description}
        primaryButtonLabel="Start This Service"
        primaryButtonHref="/contact"
        secondaryButtonLabel="Back to Services"
        secondaryButtonHref="/services"
      />

      <section className="bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden rounded-2xl border border-[#0A211F]/10 bg-white">
            <div className="relative h-72 sm:h-96">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="grid gap-6 p-6 sm:p-8">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                  Service Overview
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[#0A211F]">
                  Built for quality, speed, and long-term use
                </h2>
              </div>

              <p className="text-base leading-8 text-[#0A211F]/70">
                {service.description} This service is delivered with a practical process focused on
                business goals, clean design, and dependable development quality.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                    Category
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0A211F]">{service.category}</p>
                </div>
                <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                    Timeline
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0A211F]">{service.duration}</p>
                </div>
                <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                    Delivery
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0A211F]">Custom Scope</p>
                </div>
              </div>
            </div>
          </article>

          <aside className="grid gap-6">
            <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                What You Get
              </p>
              <ul className="mt-5 grid gap-4">
                {highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] px-4 py-4 text-sm leading-7 text-[#0A211F]/72"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[#0A211F]/10 bg-white p-6 sm:p-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                Next Step
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[#0A211F]">
                Discuss your requirements for this service
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#0A211F]/68">
                If this service matches your project, we can discuss scope, timeline, and the best
                way to deliver it for your website or platform.
              </p>

              <div className="mt-6 grid gap-3">
                <Button
                  asChild
                  className="w-full bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
                >
                  <Link href="/services">View All Services</Link>
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <PricingSection
        badgeLabel="Pricing plans"
        heading={`Pricing for ${service.title}`}
        description={`Choose the package that fits your ${service.title.toLowerCase()} requirements, timeline, and business goals.`}
        plans={DEFAULT_PRICING_PLANS}
      />

      <div className="bg-[#f7f9f2]">
        <CTA />
        <div className="py-4 md:py-10" />
      </div>
    </Wrapper>
  );
}
