import { buildAggregateRatingSchema, buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import Testimonials from "@/components/Home/Testimonials";
import { getTestimonialsServer } from "@/lib/server/testimonials";

export const metadata = buildPageMetadata({
  title: "Client Reviews & Ratings | quzex",
  description:
    "Read verified client reviews and feedback from businesses worldwide on quzex website development, website redesign, AI solutions, and digital projects.",
  path: "/reviews",
  keywords: [
    "quzex reviews",
    "client testimonials",
    "website development reviews",
    "digital agency reviews",
  ],
});

export default async function ReviewsPage() {
  const initialReviews = await getTestimonialsServer();
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(buildAggregateRatingSchema()) }}
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
        <Testimonials showCta={false} showIntro={false} initialReviews={initialReviews} />
      </section>
    </Wrapper>
  );
}
