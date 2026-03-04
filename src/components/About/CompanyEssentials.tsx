import {
  Check,
  Code2,
  Headphones,
  MonitorSmartphone,
  Paintbrush,
  Search,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const items = [
  {
    title: "Full-stack Development",
    description:
      "Modern stacks (Next.js, TypeScript) with clean architecture and maintainable code.",
    icon: Code2,
  },
  {
    title: "Web and Mobile Experiences",
    description:
      "Responsive, accessible interfaces that load fast and feel great on every device.",
    icon: MonitorSmartphone,
  },
  {
    title: "Design and Brand Systems",
    description:
      "Thoughtful UI/UX and component libraries that help teams move faster.",
    icon: Paintbrush,
  },
  {
    title: "Performance and SEO",
    description:
      "Core Web Vitals, semantic markup, and search best practices from day one.",
    icon: Search,
  },
  {
    title: "Quality and Security",
    description:
      "Code reviews, testing, and secure-by-default setups to protect your users.",
    icon: Shield,
  },
  {
    title: "Partnership and Support",
    description:
      "Clear communication, roadmap guidance, and reliable support after launch.",
    icon: Headphones,
  },
];

export default function CompanyEssentials() {
  return (
    <section className="w-full text-[#0A211F]">
      <div className="mx-auto max-w-6xl px-5 pt-10 pb-8 md:pt-20 md:px-10">
        <div className="grid items-start gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Badge variant="outline" className="rounded-full border-[#0A211F]/20">
              Company Essentials
            </Badge>

            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              What QUZEX is about
            </h2>

            <p className="mt-3 text-[#0A211F]/70">
              We are a focused studio building fast, accessible products. Strategy first, design
              that feels effortless, and engineering that scales.
            </p>

            <div className="mt-6 grid grid-cols-3 items-center rounded-2xl border border-[#0A211F]/10 p-4 text-center">
              <div>
                <div className="text-xl font-semibold">100%</div>
                <div className="text-xs text-[#0A211F]/65">In-house work</div>
              </div>
              <div>
                <div className="text-xl font-semibold">4-8 day</div>
                <div className="text-xs text-[#0A211F]/65">Typical build</div>
              </div>
              <div>
                <div className="text-xl font-semibold">Global</div>
                <div className="text-xs text-[#0A211F]/65">UK / CA / US</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {items.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-[#0A211F]/10 p-5 transition-colors hover:border-[#0A211F]/25"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="mt-0.5 h-5 w-5 text-[#0A211F]" />
                      <div>
                        <h3 className="text-base font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-[#0A211F]/70">{item.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
