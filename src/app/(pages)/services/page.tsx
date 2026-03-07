import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import ServicesListing from "@/components/Services/ServicesListing";

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
      <div className="bg-[#f7f9f2]">
        <ServicesListing />
        <CTA />
        <div className="md:py-10 py-4"></div>
      </div>
    </Wrapper>
  );
}
