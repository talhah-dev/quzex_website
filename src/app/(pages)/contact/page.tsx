import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import ContactFormSection from "@/components/Contact/ContactFormSection";

export const metadata = buildPageMetadata({
  title: "Contact Us & Project Enquiry | quzex",
  description:
    "Contact quzex to discuss your website project, website redesign, or digital solutions. Share your requirements and request a consultation today.",
  path: "/contact",
  keywords: [
    "contact quzex",
    "website project enquiry",
    "web development contact",
    "request website quote",
  ],
});

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <HeroSection
        heading="Let's discuss your website project"
        paragraph="Share your requirements and we will help you plan, design, and build a high-quality website that fits your goals."
        primaryButtonLabel="View Services"
        primaryButtonHref="/services"
        secondaryButtonLabel="View Portfolio"
        secondaryButtonHref="/portfolio"
      />
      <div className="bg-[#f7f9f2]">
        <ContactFormSection />
      </div>
    </Wrapper>
  );
}
