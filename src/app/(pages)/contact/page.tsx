import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import ContactFormSection from "@/components/Contact/ContactFormSection";

export const metadata = buildPageMetadata({
  title: "Hire a Web Developer in Pakistan | Contact Quzex",
  description:
    "Contact Quzex to hire a web developer in Pakistan. Discuss your website project, website redesign, or digital solution with our team in Karachi, Lahore, and across Pakistan.",
  path: "/contact",
  keywords: [
    "hire web developer Pakistan",
    "hire web developer Karachi",
    "hire web developer Lahore",
    "contact quzex",
    "website project quote Pakistan",
    "get website estimate",
    "web development contact Pakistan",
    "freelance web development Pakistan",
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
