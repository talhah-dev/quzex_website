import Wrapper from "@/app/Wrapper";
import HowWeWork from "@/components/About/HowWeWork";
import Team from "@/components/About/Team";
import CTA from "@/components/Global/CTA";
import AboutSection from "@/components/Home/AboutSection";
import Faq from "@/components/Home/Faq";
import HeroSection from "@/components/Home/HeroSection";
import PortfolioSection from "@/components/Home/PortfolioSection";
import SuccessInNumbers from "@/components/Home/SuccessInNumbers";
import Testimonials from "@/components/Home/Testimonials";
import TrustedMarquee from "@/components/Home/TrustedMarquee";


export default function HomePage() {
    return (
        <div className="">
            <Wrapper>
                <HeroSection />
                <div className="bg-[#f7f9f2]">
                    <TrustedMarquee />
                    <AboutSection />
                    <PortfolioSection />
                    <SuccessInNumbers />
                    <HowWeWork />
                    <Testimonials />
                    <Faq />
                    <CTA />
                    <div className="md:py-10 py-4"></div>
                </div>
            </Wrapper>
        </div>
    )
}
