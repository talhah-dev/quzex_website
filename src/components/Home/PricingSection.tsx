"use client";

import { useState } from "react";
import { Check, CheckCircle2, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DEFAULT_PRICING_PLANS, type PricingPlan } from "@/lib/pricing";
import { cn } from "@/lib/utils";

type CurrencyCode = "USD" | "EUR" | "PKR";

const currencyOptions: { value: CurrencyCode; label: string }[] = [
  { value: "USD", label: "Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "PKR", label: "PKR" },
];

const conversionRates: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  PKR: 280,
};

const priceFormatters: Record<CurrencyCode, Intl.NumberFormat> = {
  USD: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }),
  EUR: new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }),
  PKR: new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }),
};

function formatPrice(amountUsd: number, currency: CurrencyCode) {
  return priceFormatters[currency].format(amountUsd * conversionRates[currency]);
}

type PricingSectionProps = {
  className?: string;
  sectionId?: string;
  badgeLabel: string;
  heading: string;
  description: string;
  plans: PricingPlan[];
};

export default function PricingSection({
  className,
  sectionId = "pricing",
  badgeLabel,
  heading,
  description,
  plans,
}: PricingSectionProps) {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");

  return (
    <section
      id={sectionId}
      className={cn("bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8 scroll-mt-24", className)}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 flex flex-col gap-6">
          <header className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
            <Badge
              variant="outline"
              className="h-auto rounded-full border-0 bg-transparent px-3 py-1 text-sm text-[#0A211F] outline outline-[#0A211F]/12"
            >
              {badgeLabel}
            </Badge>
            <h2 className="mx-auto max-w-xs text-balance text-3xl font-medium leading-tight text-[#0A211F] sm:max-w-2xl sm:text-5xl">
              {heading}
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#0A211F]/70 md:text-lg">
              {description}
            </p>
          </header>

          <div className="flex justify-center lg:justify-end">
            <div className="flex items-center gap-3 rounded-full border border-[#0A211F]/10 bg-[#EDF6E8] px-3 py-2 text-sm font-medium text-[#0A211F]">
              <span>Currency</span>
              <Select value={currency} onValueChange={(value) => setCurrency(value as CurrencyCode)}>
                <SelectTrigger
                  aria-label="Select pricing currency"
                  className="h-9 min-w-36 rounded-full border-[#0A211F]/10 bg-[#FCFDF8] text-[#0A211F] shadow-none focus-visible:ring-[#0A211F]/15"
                >
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent className="rounded-2xl border-[#0A211F]/10 bg-[#FCFDF8] text-[#0A211F] shadow-[0_20px_45px_-30px_rgba(10,33,31,0.4)]">
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    {currencyOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.tier}
              className="relative rounded-[2rem] p-[1.5px] transition-transform duration-300 hover:-translate-y-1"
            >
              {plan.featured ? (
                <div aria-hidden className="absolute inset-0 overflow-hidden rounded-[2rem]">
                  <div className="pricing-card-ring absolute inset-[-75%] bg-[conic-gradient(from_180deg,#8AF7B7_0deg,#D8F782_110deg,#0A211F_220deg,#8AF7B7_360deg)]" />
                </div>
              ) : null}

              <div
                className={cn(
                  "relative overflow-hidden rounded-[calc(2rem-1.5px)] bg-[#FCFDF8] shadow-[0_18px_45px_-30px_rgba(10,33,31,0.35)]",
                  !plan.featured && "border border-[#0A211F]/10"
                )}
              >
                <div
                  className={cn(
                    "border-b border-[#0A211F]/10 p-7",
                    plan.featured &&
                    "bg-[linear-gradient(180deg,rgba(138,247,183,0.20)_0%,rgba(216,247,130,0.08)_58%,rgba(252,253,248,1)_100%)]"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[#0A211F]/70">{plan.tier}</p>
                      <h3 className="mt-4 text-balance text-3xl font-semibold leading-tight text-[#0A211F]">
                        {plan.title}
                      </h3>
                    </div>
                    {plan.featured ? (
                      <Badge className="rounded-full bg-[#0A211F] px-4 py-1 text-[#E9F3E6] hover:bg-[#0A211F]">
                        Popular
                      </Badge>
                    ) : null}
                  </div>

                  <p className="mt-5 text-5xl font-semibold tracking-tight text-[#0A211F]">
                    {formatPrice(plan.priceUsd, currency)}
                  </p>

                  <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#0A211F]/68">
                    {plan.summary}
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-base font-semibold text-[#0A211F]/70">
                    <div className="flex items-center gap-2">
                      <Clock3 className="size-5" />
                      <span>{plan.delivery}</span>
                    </div>
                  </div>

                  <div className="mt-8 w-full [&>a]:block">
                    <AnimatedButton href="/contact" color="dark" className="w-full justify-center">
                      Continue
                    </AnimatedButton>
                  </div>
                </div>

                <div className="p-7">
                  <p className="mb-5 text-xl font-medium text-[#0A211F]">What&apos;s included:</p>
                  <ul className="space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#0A211F]" />
                        ) : (
                          <Check
                            className="mt-0.5 size-5 shrink-0 text-[#0A211F]/30"
                            strokeWidth={3}
                          />
                        )}
                        <span
                          className={cn(
                            "text-lg leading-relaxed",
                            feature.included ? "text-[#0A211F]/75" : "text-[#0A211F]/35"
                          )}
                        >
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { DEFAULT_PRICING_PLANS };
