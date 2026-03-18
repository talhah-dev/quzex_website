import Wrapper from "@/app/Wrapper";
import HowWeWork from "@/components/About/HowWeWork";
import CTA from "@/components/Global/CTA";
import AboutSection from "@/components/Home/AboutSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import PricingSection from "@/components/Home/PricingSection";
import PortfolioSection from "@/components/Home/PortfolioSection";
import SuccessInNumbers from "@/components/Home/SuccessInNumbers";
import Testimonials from "@/components/Home/Testimonials";
import TrustedMarquee from "@/components/Home/TrustedMarquee";
import { DEFAULT_PRICING_PLANS } from "@/lib/pricing";

type HomePageContentProps = {
  selectedCategory?: string;
};

export default function HomePageContent({ selectedCategory }: HomePageContentProps) {
  return (
    <div className="">
      <Wrapper>
        <HeroSection />
        <div className="bg-[#f7f9f2]">
          <TrustedMarquee />
          <AboutSection />
          <PortfolioSection selectedCategory={selectedCategory} />
          <SuccessInNumbers />
          <HowWeWork />
          <div className="md:py-5 py-2"></div>
          <PricingSection
            badgeLabel="Pricing plans"
            heading="Affordable pricing"
            description="Choose the package that fits your website needs, from a simple landing page to a full multi-page business website."
            plans={DEFAULT_PRICING_PLANS}
          />
          <div className="md:py-4 py-2"></div>
          <Testimonials />
          <Faq />
          <CTA />
          <div className="md:py-10 py-4"></div>
        </div>
      </Wrapper>
    </div>
  );
}
