"use client";

import { useState } from "react";
import { Check, ChevronDown, Clock3, RefreshCcw } from "lucide-react";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Feature = {
  label: string;
  included: boolean;
};

type PricingPlan = {
  key: string;
  tabLabel: string;
  title: string;
  price: string;
  summary: string;
  delivery: string;
  revisions: string;
  features: Feature[];
};

const plans: PricingPlan[] = [
  {
    key: "basic",
    tabLabel: "Basic",
    title: "Landing Page Starter Pack",
    price: "$25",
    summary:
      "Responsive + max section (5-6) + source codes + GitHub or Netlify free hosting + 10 days Support",
    delivery: "2-day delivery",
    revisions: "3 Revisions",
    features: [
      { label: "1 page", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: false },
    ],
  },
  {
    key: "standard",
    tabLabel: "Standard",
    title: "5-Page Silver Pack",
    price: "$35",
    summary:
      "Responsive + Animations + Google maps + GitHub or Netlify free hosting + 5 pages + 18 Days Support",
    delivery: "4-day delivery",
    revisions: "6 Revisions",
    features: [
      { label: "5 pages", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: false },
    ],
  },
  {
    key: "premium",
    tabLabel: "Premium",
    title: "8-Page Pro Pack",
    price: "$50",
    summary:
      "Responsive + Animations + Google maps + GitHub or Netlify free hosting + 8 pages + 30 Days Support",
    delivery: "6-day delivery",
    revisions: "9 Revisions",
    features: [
      { label: "8 pages", included: true },
      { label: "Design customization", included: true },
      { label: "Content upload", included: true },
      { label: "Responsive design", included: true },
      { label: "Source code", included: true },
      { label: "Detailed code comments", included: true },
    ],
  },
];

type PricingSectionProps = {
  className?: string;
};

export default function PricingSection({ className }: PricingSectionProps) {
  const [activeKey, setActiveKey] = useState<PricingPlan["key"]>("basic");
  const activePlan = plans.find((plan) => plan.key === activeKey) ?? plans[0];

  return (
    <section className={cn("bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8", className)}>
      <div className="mx-auto max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-[#0A211F]/12 bg-white shadow-[0_20px_55px_-35px_rgba(10,33,31,0.35)]">
          <div className="grid grid-cols-3 border-b border-[#0A211F]/12 bg-[#fbfbf8]">
            {plans.map((plan) => {
              const isActive = plan.key === activePlan.key;

              return (
                <button
                  key={plan.key}
                  type="button"
                  onClick={() => setActiveKey(plan.key)}
                  className={cn(
                    "relative px-4 py-5 text-center text-lg font-semibold transition-colors",
                    "border-r border-[#0A211F]/10 last:border-r-0",
                    isActive ? "text-[#0A211F]" : "text-[#0A211F]/45 hover:text-[#0A211F]/72"
                  )}
                >
                  {plan.tabLabel}
                  <span
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-1 bg-[#0A211F] transition-opacity",
                      isActive ? "opacity-100" : "opacity-0"
                    )}
                  />
                </button>
              );
            })}
          </div>

          <div className="space-y-7 p-5 md:p-7">
            <div>
              <h2 className="text-balance text-[2rem] font-semibold leading-tight text-[#0A211F]">
                {activePlan.title}
              </h2>
              <p className="mt-3 text-5xl font-semibold tracking-tight text-[#0A211F]">
                {activePlan.price}
              </p>
            </div>

            <p className="max-w-sm text-[1.05rem] leading-relaxed text-[#0A211F]/62">
              {activePlan.summary}
            </p>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-semibold text-[#0A211F]/70">
              <div className="flex items-center gap-2">
                <Clock3 className="size-5" />
                <span>{activePlan.delivery}</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="size-5" />
                <span>{activePlan.revisions}</span>
              </div>
            </div>

            <ul className="space-y-3">
              {activePlan.features.map((feature) => (
                <li key={feature.label} className="flex items-center gap-3">
                  <Check
                    className={cn(
                      "size-5 shrink-0",
                      feature.included ? "text-[#0A211F]" : "text-[#0A211F]/28"
                    )}
                    strokeWidth={3}
                  />
                  <span
                    className={cn(
                      "text-lg",
                      feature.included ? "text-[#0A211F]/74" : "text-[#0A211F]/32"
                    )}
                  >
                    {feature.label}
                  </span>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-2">
              <div className="[&>a]:block">
                <AnimatedButton href="/contact" color="dark" className="w-full justify-center">
                  Continue
                </AnimatedButton>
              </div>

              <Button
                variant="outline"
                className="h-14 w-full rounded-2xl border-[#0A211F]/12 bg-white text-lg font-semibold text-[#0A211F]/72 hover:bg-[#f5f8ef]"
              >
                Contact me
                <ChevronDown className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
