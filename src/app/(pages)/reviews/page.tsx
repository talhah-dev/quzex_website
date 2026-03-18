import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import Testimonials from "@/components/Home/Testimonials";

export const metadata = buildPageMetadata({
  title: "Client Reviews | quzex",
  description:
    "Read client reviews from different countries and project types to see how quzex delivers website development, redesign, AI, and marketing work.",
  path: "/reviews",
  keywords: [
    "quzex reviews",
    "client testimonials",
    "website development reviews",
    "digital agency reviews",
  ],
});

export default function ReviewsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Reviews", path: "/reviews" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <HeroSection
        heading="Client Reviews From Different Markets"
        paragraph="Read feedback from clients across development, redesign, AI, and marketing projects. This page brings together the reviews that reflect how Quzex work is experienced across different countries and business needs."
        primaryButtonLabel="Contact Us"
        primaryButtonHref="/contact"
        secondaryButtonLabel="View Services"
        secondaryButtonHref="/services"
      />

      <section className="bg-[#f7f9f2]">
        <Testimonials showCta={false} showIntro={false} />
      </section>
    </Wrapper>
  );
}
