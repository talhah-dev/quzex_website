import { buildBreadcrumbSchema, buildPageMetadata, buildServicePageSchema, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import ServicesListing from "@/components/Services/ServicesListing";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Web Development Services in Pakistan | Quzex",
  description:
    "Explore Quzex web development services in Pakistan — custom websites, Next.js applications, website redesigns, API integrations, AI solutions, and social media management for businesses in Karachi, Lahore, and beyond.",
  path: "/services",
  keywords: [
    "web development services Pakistan",
    "website development services Karachi",
    "website development services Lahore",
    "Next.js development services",
    "full stack web development Pakistan",
    "website redesign service",
    "AI integration services",
    "social media management Pakistan",
    "custom website development",
    "API integration services",
  ],
});

export default function ServicesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildServicePageSchema()) }}
      />
      <HeroSection
        heading="Web Development & Design Services"
        paragraph="We provide professional web development, website redesign, and complete website builds from scratch. Every service is focused on quality, performance, and a final result that matches your business requirements."
        primaryButtonLabel="View Portfolio"
        primaryButtonHref="/portfolio"
        secondaryButtonLabel="Contact Us"
        secondaryButtonHref="/contact"
      />
      <div className="bg-[#f7f9f2]">
        <ServicesListing />
        <CTA />
        <div className="py-4 md:py-10"></div>
      </div>
    </Wrapper>
  );
}
