import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import PricingSection from "@/components/Home/PricingSection";
import { Button } from "@/components/ui/button";
import connectToDatabase from "@/lib/dbConnect";
import type { PricingPlan } from "@/lib/pricing";
import ServiceModel from "@/models/Service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type ServiceDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatLongDescription(content?: string) {
  const value = String(content || "").trim();

  if (!value) {
    return "";
  }

  const withoutScripts = value.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "");

  if (/<[a-z][\s\S]*>/i.test(withoutScripts)) {
    return withoutScripts;
  }

  return withoutScripts
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => `<p>${escapeHtml(line)}</p>`)
    .join("");
}

function buildPricingPlans(service: {
  pricingPlans?: Array<{
    name: string;
    price: number;
    description: string;
    deliveryTime?: string;
    features?: string[];
    isRecommended?: boolean;
  }>;
}): PricingPlan[] {
  return Array.isArray(service.pricingPlans)
    ? service.pricingPlans.map((plan) => ({
        tier: plan.isRecommended ? "Standard" : plan.name,
        title: plan.name,
        priceUsd: plan.price,
        summary: plan.description,
        delivery: plan.deliveryTime || "Custom timeline",
        featured: Boolean(plan.isRecommended),
        features: Array.isArray(plan.features)
          ? plan.features.map((feature) => ({
              label: feature,
              included: true,
            }))
          : [],
      }))
    : [];
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;

  await connectToDatabase();

  const service = await ServiceModel.findOne({
    slug,
    isActive: true,
    showOnServicesPage: true,
  }).lean();

  if (!service) {
    notFound();
  }

  const pricingPlans = buildPricingPlans(service);
  const formattedLongDescription = formatLongDescription(service.longDescription || service.description);

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
                  {service.overviewTitle || "Service Overview"}
                </p>
                <h2 className="mt-2 text-3xl font-semibold text-[#0A211F]">
                  Built for quality, speed, and long-term use
                </h2>
              </div>

              <div
                className="space-y-3 text-base leading-8 text-[#0A211F]/70 [&_a]:font-medium [&_a]:text-[#0A211F] [&_a]:underline [&_em]:italic [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:text-[#0A211F] [&_h2]:mt-2 [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:leading-tight [&_h3]:text-[#0A211F] [&_h3]:mt-2 [&_p]:mb-4 [&_strong]:font-semibold [&_u]:underline"
                dangerouslySetInnerHTML={{ __html: formattedLongDescription }}
              />

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
                  <p className="mt-2 text-lg font-semibold text-[#0A211F]">
                    {service.deliveryLabel || "Custom Scope"}
                  </p>
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
                {(service.highlights || []).map((highlight, index) => (
                  <li
                    key={`${highlight}-${index}`}
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
                {service.nextStepTitle || "Discuss your requirements for this service"}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#0A211F]/68">
                {service.nextStepDescription ||
                  "If this service matches your project, we can discuss scope, timeline, and the best way to deliver it for your website or platform."}
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

      {pricingPlans.length > 0 ? (
        <PricingSection
          badgeLabel="Pricing plans"
          heading={service.pricingHeading || `Pricing for ${service.title}`}
          description={
            service.pricingDescription ||
            `Choose the package that fits your ${service.title.toLowerCase()} requirements, timeline, and business goals.`
          }
          plans={pricingPlans}
        />
      ) : null}

      <div className="bg-[#f7f9f2]">
        <CTA />
        <div className="py-4 md:py-10" />
      </div>
    </Wrapper>
  );
}
