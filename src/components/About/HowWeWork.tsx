import Link from "next/link";
import { Code2, Compass, PenTool, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    id: "1",
    title: "Requirements",
    duration: "~ 1-2 days",
    description:
      "We start with your business goals and requirements. If needed, we schedule a short meeting; otherwise you can share details directly and we handle the research.",
    icon: Compass,
  },
  {
    id: "2",
    title: "Design and Build",
    duration: "~ 4-5 days",
    description:
      "We design the structure and build your website with a clean, modern layout focused on speed, usability, and your brand style.",
    icon: PenTool,
  },
  {
    id: "3",
    title: "Review and Approval",
    duration: "~ 1 day",
    description:
      "We share the completed version for your review, collect feedback, and apply final updates so everything is approved before going live.",
    icon: Code2,
  },
  {
    id: "4",
    title: "Launch and Hosting",
    duration: "~ 1 day",
    description:
      "After approval, we deploy and host your website so it is live, stable, and ready for your audience.",
    icon: Rocket,
  },
];

export default function HowWeWork() {
  return (
    <section className="w-full text-[#0A211F]">
      <div className="mx-auto mt-14 max-w-6xl px-5 md:mt-20 md:px-10">
        <div className="flex flex-col items-start gap-2">
          <Badge variant="outline" className="rounded-full border-[#0A211F]/20 ">
            How we work
          </Badge>
          <h2 className="text-3xl font-semibold md:text-4xl">
            A simple, proven process
          </h2>
          <p className="max-w-2xl text-[#0A211F]/70">
            Clear steps, predictable timelines, and tight feedback loops keep projects moving
            without surprises.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.id}
                className="rounded-2xl border border-[#0A211F]/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8F782] text-sm font-semibold text-[#0A211F]">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-[#0A211F]" />
                      <h3 className="text-base font-semibold">{step.title}</h3>
                      <Badge
                        variant="outline"
                        className="ml-auto border-[#0A211F]/20 bg-[#f7f9f2] text-[#0A211F]/80"
                      >
                        {step.duration}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-[#0A211F]/70">{step.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
