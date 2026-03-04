import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";

export default function ServicesPage() {
  return (
    <Wrapper>
      <HeroSection
        heading="Our Services"
        paragraph="We provide professional web development, website redesign, and complete website builds from scratch. Every service is focused on quality, performance, and a final result that matches your business requirements."
        primaryButtonLabel="View Portfolio"
        primaryButtonHref="/portfolio"
        secondaryButtonLabel="Contact Us"
        secondaryButtonHref="/contact"
      />
    </Wrapper>
  );
}
