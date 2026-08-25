import Wrapper from "@/app/Wrapper";
import HowWeWork from "@/components/About/HowWeWork";
import CTA from "@/components/Global/CTA";
import AboutSection from "@/components/Home/AboutSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import PortfolioSection from "@/components/Home/PortfolioSection";
import SuccessInNumbers from "@/components/Home/SuccessInNumbers";
import Testimonials from "@/components/Home/Testimonials";
import TrustedMarquee from "@/components/Home/TrustedMarquee";
import type { TestimonialRecord } from "@/types";

type HomePageContentProps = {
  selectedCategory?: string;
  initialReviews?: TestimonialRecord[];
};

export default function HomePageContent({ selectedCategory, initialReviews = [] }: HomePageContentProps) {
  return (
    <div>
      <Wrapper>
        <HeroSection />
        <div className="bg-[#f7f9f2]">
          <TrustedMarquee />
          <AboutSection />
          <PortfolioSection selectedCategory={selectedCategory} />
          <SuccessInNumbers />
          <HowWeWork />
          <div className="py-2 md:py-5"></div>
          <div className="py-2 md:py-4"></div>
          <Testimonials maxItems={6} initialReviews={initialReviews} />
          <Faq />
          <CTA />
          <div className="py-4 md:py-10"></div>
        </div>
      </Wrapper>
    </div>
  );
}
