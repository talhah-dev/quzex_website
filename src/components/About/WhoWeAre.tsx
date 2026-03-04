import Link from "next/link";
import { Layers3, MonitorSmartphone, Paintbrush, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "../ui/AnimatedButton";

const services = [
  {
    title: "Website Development",
    description:
      "We build modern, responsive websites for businesses that need speed, clarity, and strong first impressions.",
    icon: MonitorSmartphone,
  },
  {
    title: "Website Redesign",
    description:
      "We transform outdated websites into clean, high-performing experiences that better reflect your brand.",
    icon: Paintbrush,
  },
  {
    title: "From-Scratch Builds",
    description:
      "From planning to launch, we create websites from zero around your exact requirements and goals.",
    icon: Layers3,
  },
  {
    title: "Launch-Ready Execution",
    description:
      "Small team, direct communication, and practical delivery that keeps your project smooth and on time.",
    icon: Rocket,
  },
];

export default function WhoWeAre() {
  return (
    <section className="w-full text-[#0A211F]">
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-10 md:py-16">
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <div>
            <Badge variant="outline" className="rounded-full border-[#0A211F]/20 ">
              Who we are
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              A focused team building websites that match your vision
            </h2>

            <p className="mt-4 text-[#0A211F]/75">
              We are a small team of 2-3 specialists in web development and design. We study your
              requirements deeply, understand your goals, and turn your ideas into practical website
              solutions.
            </p>

            <p className="mt-4 text-[#0A211F]/75">
              With 6+ years of experience, we deliver high-quality websites, redesign existing
              platforms, and build complete websites from scratch for different industries.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-xl border border-[#0A211F]/10  px-4 py-2 text-sm">
                2-3 member team
              </div>
              <div className="rounded-xl border border-[#0A211F]/10  px-4 py-2 text-sm">
                6+ years experience
              </div>
              <div className="rounded-xl border border-[#0A211F]/10  px-4 py-2 text-sm">
                Website-first services
              </div>
            </div>

            <div className="mt-8">
              <AnimatedButton href="/contact" color="dark">
                Let&apos;s discuss your website
              </AnimatedButton>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  className="rounded-2xl border border-[#0A211F]/10  p-5"
                >
                  <Icon className="h-5 w-5 text-[#0A211F]" />
                  <h3 className="mt-4 text-base font-semibold">{service.title}</h3>
                  <p className="mt-2 text-sm text-[#0A211F]/70">{service.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
