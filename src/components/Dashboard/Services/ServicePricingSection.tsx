"use client";

import { Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ServicePricingPlan } from "@/types";

const defaultPlans = [
  { id: "starter", label: "Starter Plan", featured: false },
  { id: "standard", label: "Standard Plan", featured: true },
  { id: "premium", label: "Premium Plan", featured: false },
];

type ServicePricingSectionProps = {
  pricingHeading: string;
  pricingDescription: string;
  pricingPlans: ServicePricingPlan[];
  onPricingHeadingChange: (value: string) => void;
  onPricingDescriptionChange: (value: string) => void;
  onPlanChange: (
    index: number,
    field: "name" | "price" | "description" | "deliveryTime",
    value: string
  ) => void;
  onFeatureChange: (planIndex: number, featureIndex: number, value: string) => void;
  onAddFeature: (planIndex: number) => void;
  onRemoveFeature: (planIndex: number, featureIndex: number) => void;
};

export default function ServicePricingSection({
  pricingHeading,
  pricingDescription,
  pricingPlans,
  onPricingHeadingChange,
  onPricingDescriptionChange,
  onPlanChange,
  onFeatureChange,
  onAddFeature,
  onRemoveFeature,
}: ServicePricingSectionProps) {
  return (
    <section className="grid gap-5 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
          >
            Pricing
          </Badge>
          <p className="text-xs text-[#0A211F]/58">Static pricing section for the service page</p>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="service-pricing-heading">Pricing heading</Label>
          <Input
            id="service-pricing-heading"
            placeholder="Choose the right plan for this service"
            value={pricingHeading}
            onChange={(event) => onPricingHeadingChange(event.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="service-pricing-description">Pricing description</Label>
          <textarea
            id="service-pricing-description"
            rows={4}
            placeholder="Write the short pricing introduction that will appear above the pricing cards."
            value={pricingDescription}
            onChange={(event) => onPricingDescriptionChange(event.target.value)}
            className="min-h-28 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
          />
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {defaultPlans.map((plan, index) => (
          <div
            key={plan.id}
            className={`grid gap-4 rounded-2xl border p-4 ${
              plan.featured
                ? "border-[#0A211F]/18 bg-white shadow-[0_18px_45px_-35px_rgba(10,33,31,0.35)]"
                : "border-[#0A211F]/10 bg-white"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-base font-medium text-[#0A211F]">{plan.label}</h3>
              {plan.featured ? (
                <span className="rounded-full bg-[#D8F782] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0A211F]">
                  Featured
                </span>
              ) : null}
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${plan.id}-name`}>Plan title</Label>
              <Input
                id={`${plan.id}-name`}
                placeholder={plan.label}
                value={pricingPlans[index]?.name || ""}
                onChange={(event) => onPlanChange(index, "name", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${plan.id}-price`}>Price</Label>
              <Input
                id={`${plan.id}-price`}
                placeholder="25"
                value={String(pricingPlans[index]?.price || "")}
                onChange={(event) => onPlanChange(index, "price", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${plan.id}-delivery`}>Delivery time</Label>
              <Input
                id={`${plan.id}-delivery`}
                placeholder="4-5 days"
                value={pricingPlans[index]?.deliveryTime || ""}
                onChange={(event) => onPlanChange(index, "deliveryTime", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${plan.id}-description`}>Plan description</Label>
              <textarea
                id={`${plan.id}-description`}
                rows={4}
                placeholder="Write the short description for this plan."
                value={pricingPlans[index]?.description || ""}
                onChange={(event) => onPlanChange(index, "description", event.target.value)}
                className="min-h-24 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor={`${plan.id}-features`}>Plan features</Label>
              <div className="grid gap-3">
                {(pricingPlans[index]?.features?.length
                  ? pricingPlans[index].features
                  : [""]).map((feature, featureIndex) => (
                  <div key={`${plan.id}-feature-${featureIndex}`} className="flex gap-2">
                    <Input
                      id={featureIndex === 0 ? `${plan.id}-features` : undefined}
                      placeholder="Add a feature"
                      value={feature}
                      onChange={(event) =>
                        onFeatureChange(index, featureIndex, event.target.value)
                      }
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => onRemoveFeature(index, featureIndex)}
                      className="h-10 border-[#d9485f]/18 px-3 text-[#d9485f] hover:bg-[#fff5f5]"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onAddFeature(index)}
                  className="w-fit border-[#0A211F]/12 bg-white text-[#0A211F] hover:bg-[#EDF6E8]"
                >
                  <Plus className="size-4" />
                  Add Feature
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
