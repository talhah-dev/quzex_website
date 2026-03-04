import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import ContactFormSection from "@/components/Contact/ContactFormSection";

export default function ContactPage() {
  return (
    <Wrapper>
      <HeroSection
        heading="Let&apos;s discuss your website project"
        paragraph="Share your requirements and we will help you plan, design, and build a high-quality website that fits your goals."
        primaryButtonLabel="View Services"
        primaryButtonHref="/services"
        secondaryButtonLabel="View Portfolio"
        secondaryButtonHref="/portfolio"
      />
      <ContactFormSection />
    </Wrapper>
  );
}
