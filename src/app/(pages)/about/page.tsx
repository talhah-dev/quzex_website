import Wrapper from "@/app/Wrapper";
import ClientLogos from "@/components/About/ClientLogos";
import CompanyEssentials from "@/components/About/CompanyEssentials";
import Team from "@/components/About/Team";
import WhoWeAre from "@/components/About/WhoWeAre";
import HeroSection from "@/components/common/HeroSection";
import CTA from "@/components/Global/CTA";
import Testimonials from "@/components/Home/Testimonials";

export default function AboutPage() {
    return (
        <Wrapper>
            <HeroSection
                heading="We build products that people love to use"
                paragraph="Quzex blends strategy, design, and development to create fast, reliable digital experiences that help brands grow with confidence."
                primaryButtonLabel="View Portfolio"
                primaryButtonHref="/portfolio"
                secondaryButtonLabel="Contact Us"
                secondaryButtonHref="/contact"
            />
            <WhoWeAre />
            <CompanyEssentials />
            <ClientLogos />
            <Testimonials />
            <Team />
            <CTA />
            <div className="md:py-10 py-4"></div>
        </Wrapper>
    );
}
