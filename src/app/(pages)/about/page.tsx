import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import ClientLogos from "@/components/About/ClientLogos";
import CompanyEssentials from "@/components/About/CompanyEssentials";
import Team from "@/components/About/Team";
import WhoWeAre from "@/components/About/WhoWeAre";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import Testimonials from "@/components/Home/Testimonials";

export const metadata = buildPageMetadata({
  title: "About Us | quzex",
  description:
    "Learn about quzex, our process, and the team behind the websites, redesigns, and digital solutions we build for modern brands.",
  path: "/about",
  keywords: [
    "about quzex",
    "web development team",
    "digital solutions company",
    "website design and development agency",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <HeroSection
        heading="We build products that people love to use"
        paragraph="Quzex blends strategy, design, and development to create fast, reliable digital experiences that help brands grow with confidence."
        primaryButtonLabel="View Portfolio"
        primaryButtonHref="/portfolio"
        secondaryButtonLabel="Contact Us"
        secondaryButtonHref="/contact"
      />
      <WhoWeAre />
      <ClientLogos />
      <CompanyEssentials />
      <Testimonials />
      <Team />
      <CTA />
      <div className="md:py-10 py-4"></div>
    </Wrapper>
  );
}
