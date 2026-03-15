import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import Testimonials from "@/components/Home/Testimonials";

export default function ReviewsPage() {
  return (
    <Wrapper>
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

