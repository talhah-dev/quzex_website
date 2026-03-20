import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import ServicesListing from "@/components/Services/ServicesListing";

export const dynamic = "force-dynamic";

export const metadata = buildPageMetadata({
  title: "Services | quzex",
  description:
    "Browse quzex services including static websites, dynamic websites, redesigns, AI solutions, social media management, and custom digital work for businesses.",
  path: "/services",
  keywords: [
    "website development services",
    "dynamic website development",
    "static website development",
    "AI services",
    "social media management",
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
      <HeroSection
        heading="Our Services"
        paragraph="We provide professional web development, website redesign, and complete website builds from scratch. Every service is focused on quality, performance, and a final result that matches your business requirements."
        primaryButtonLabel="View Portfolio"
        primaryButtonHref="/portfolio"
        secondaryButtonLabel="Contact Us"
        secondaryButtonHref="/contact"
      />
      <div className="bg-[#f7f9f2]">
        <ServicesListing />
        <CTA />
        <div className="md:py-10 py-4"></div>
      </div>
    </Wrapper>
  );
}
