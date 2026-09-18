import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import ClientLogos from "@/components/About/ClientLogos";
import CompanyEssentials from "@/components/About/CompanyEssentials";
import Team from "@/components/About/Team";
import WhoWeAre from "@/components/About/WhoWeAre";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import Testimonials from "@/components/Home/Testimonials";
import { getTestimonialsServer } from "@/lib/server/testimonials";

export const metadata = buildPageMetadata({
  title: "About Us | Web Development Agency Team | Quzex Pakistan",
  description:
    "Learn about Quzex — a web development agency based in Pakistan. Our team builds fast, modern websites and digital platforms for businesses in Karachi, Lahore, and worldwide.",
  path: "/about",
  keywords: [
    "about quzex",
    "web development team Pakistan",
    "digital agency Pakistan",
    "website design and development agency",
    "web developers Karachi",
    "web developers Lahore",
    "remote web development team",
    "website agency culture",
    "digital solutions company Pakistan",
  ],
});

export default async function AboutPage() {
  const initialReviews = await getTestimonialsServer();
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
        heading="Our Web Development Agency Team and Story"
        paragraph="Quzex blends strategy, design, and development to create fast, reliable digital experiences that help brands grow with confidence."
        primaryButtonLabel="View Portfolio"
        primaryButtonHref="/portfolio"
        secondaryButtonLabel="Contact Us"
        secondaryButtonHref="/contact"
      />
      <WhoWeAre />
      <ClientLogos />
      <CompanyEssentials />
      <Team />
      <Testimonials maxItems={6} initialReviews={initialReviews} />
      <CTA />
      <div className="py-4 md:py-10"></div>
    </Wrapper>
  );
}
