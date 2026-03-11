"use client";

import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServicePricingSection from "@/components/Dashboard/Services/ServicePricingSection";
import ServiceRichTextEditor from "@/components/Dashboard/Services/ServiceRichTextEditor";
import { getAdminService, updateService } from "@/lib/api/services";
import { uploadFile } from "@/lib/api/upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ServicePricingPlan, UpdateServicePayload } from "@/types";

const serviceCategories = [
  "Development",
  "Websites",
  "Backend",
  "Database",
  "Mobile",
  "Redesign",
  "AI Content",
  "AI Automation",
  "3D Experience",
  "Marketing",
];

type DashboardServiceEditProps = {
  serviceId: string;
};

export default function DashboardServiceEdit({ serviceId }: DashboardServiceEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [imageMode, setImageMode] = useState<"upload" | "url">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service", serviceId],
    queryFn: () => getAdminService(serviceId),
  });

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("1");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [highlights, setHighlights] = useState("");
  const [pricingHeading, setPricingHeading] = useState("");
  const [pricingDescription, setPricingDescription] = useState("");
  const [pricingPlans, setPricingPlans] = useState<ServicePricingPlan[]>([]);
  const [initialized, setInitialized] = useState(false);

  if (data && !initialized) {
    setTitle(data.title || "");
    setCategory(data.category || "");
    setPriority(String(data.priority ?? 1));
    setDuration(data.duration || "");
    setDescription(data.description || "");
    setLongDescription(data.longDescription || "");
    setHighlights((data.highlights || []).join("\n"));
    setPricingHeading(data.pricingHeading || "");
    setPricingDescription(data.pricingDescription || "");
    setPricingPlans(
      data.pricingPlans?.length
        ? data.pricingPlans
        : [
            {
              name: "Starter Plan",
              price: 25,
              description: "",
              deliveryTime: "",
              features: [""],
              isRecommended: false,
            },
            {
              name: "Standard Plan",
              price: 35,
              description: "",
              deliveryTime: "",
              features: [""],
              isRecommended: true,
            },
            {
              name: "Premium Plan",
              price: 50,
              description: "",
              deliveryTime: "",
              features: [""],
              isRecommended: false,
            },
          ]
    );
    setImageUrl(data.image || "");
    setInitialized(true);
  }

  const slug = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

  const hasImage = imageMode === "upload" ? Boolean(imageFile) : Boolean(imageUrl.trim());
  const isFormValid =
    Boolean(title.trim()) &&
    Boolean(slug.trim()) &&
    Boolean(category.trim()) &&
    Boolean(duration.trim()) &&
    Boolean(description.trim()) &&
    hasImage;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
  }

  function handlePlanChange(
    index: number,
    field: "name" | "price" | "description" | "deliveryTime",
    value: string
  ) {
    setPricingPlans((currentPlans) =>
      currentPlans.map((plan, currentIndex) => {
        if (currentIndex !== index) {
          return plan;
        }

        if (field === "price") {
          return {
            ...plan,
            price: Number(value) || 0,
          };
        }

        return {
          ...plan,
          [field]: value,
        };
      })
    );
  }

  function handleFeatureChange(planIndex: number, featureIndex: number, value: string) {
    setPricingPlans((currentPlans) =>
      currentPlans.map((plan, currentIndex) => {
        if (currentIndex !== planIndex) {
          return plan;
        }

        const nextFeatures = [...plan.features];
        nextFeatures[featureIndex] = value;

        return {
          ...plan,
          features: nextFeatures,
        };
      })
    );
  }

  function handleAddFeature(planIndex: number) {
    setPricingPlans((currentPlans) =>
      currentPlans.map((plan, currentIndex) => {
        if (currentIndex !== planIndex) {
          return plan;
        }

        return {
          ...plan,
          features: [...plan.features, ""],
        };
      })
    );
  }

  function handleRemoveFeature(planIndex: number, featureIndex: number) {
    setPricingPlans((currentPlans) =>
      currentPlans.map((plan, currentIndex) => {
        if (currentIndex !== planIndex) {
          return plan;
        }

        const nextFeatures = plan.features.filter((_, currentFeatureIndex) => {
          return currentFeatureIndex !== featureIndex;
        });

        return {
          ...plan,
          features: nextFeatures.length ? nextFeatures : [""],
        };
      })
    );
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      let finalImage = imageUrl.trim();

      if (imageMode === "upload") {
        if (!imageFile) {
          throw new Error("Please upload a service image.");
        }

        const uploaded = await uploadFile({
          file: imageFile,
          folder: "services",
        });

        finalImage = uploaded.url;
      }

      if (!finalImage) {
        throw new Error("Please provide a service image.");
      }

      const payload: UpdateServicePayload = {
        id: serviceId,
        slug: slug.trim(),
        title: title.trim(),
        image: finalImage,
        category: category.trim(),
        duration: duration.trim(),
        description: description.trim(),
        longDescription: longDescription.trim() || undefined,
        highlights: highlights
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
        pricingHeading: pricingHeading.trim() || undefined,
        pricingDescription: pricingDescription.trim() || undefined,
        pricingPlans: pricingPlans
          .map((plan) => ({
            ...plan,
            features: plan.features.map((item) => item.trim()).filter(Boolean),
          }))
          .filter((plan) => plan.name.trim() && plan.description.trim()),
        showOnServicesPage: true,
        priority: Number.parseInt(priority, 10) || 1,
      };

      return updateService(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Service updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["service", serviceId] });
      router.push("/dashboard/services");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to update service.");
    },
  });

  if (isLoading || !initialized) {
    return (
      <div className="rounded-xl border border-[#0A211F]/10 bg-white p-6 text-sm text-[#0A211F]/62 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Loading service details...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-[#C24141]/15 bg-[#FFF5F5] p-6 text-sm text-[#C24141] shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Unable to load this service right now.
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Button
              asChild
              variant="outline"
              className="w-fit border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/services">
                <ArrowLeft className="size-4" />
                Back to Services
              </Link>
            </Button>

            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Edit Service
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Update service
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Edit the service details, pricing, and content that appear on the services pages.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="service-title">Service title</Label>
              <Input id="service-title" value={title} onChange={(event) => setTitle(event.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-slug">Service slug</Label>
              <Input id="service-slug" value={slug} readOnly />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-category">Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  id="service-category"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  {serviceCategories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-priority">Priority</Label>
              <Input
                id="service-priority"
                type="number"
                min="1"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="service-duration">Timeline</Label>
              <Input
                id="service-duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="service-description">Short description</Label>
              <textarea
                id="service-description"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-28 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>

            <ServiceRichTextEditor
              id="service-long-description"
              label="Long description"
              value={longDescription}
              placeholder="Write the detailed content that will appear below the hero section on the service detail page."
              onChange={setLongDescription}
            />

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="service-highlights">Service highlights</Label>
              <textarea
                id="service-highlights"
                rows={4}
                value={highlights}
                onChange={(event) => setHighlights(event.target.value)}
                className="min-h-28 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>
          </div>

          <ServicePricingSection
            pricingHeading={pricingHeading}
            pricingDescription={pricingDescription}
            pricingPlans={pricingPlans}
            onPricingHeadingChange={setPricingHeading}
            onPricingDescriptionChange={setPricingDescription}
            onPlanChange={handlePlanChange}
            onFeatureChange={handleFeatureChange}
            onAddFeature={handleAddFeature}
            onRemoveFeature={handleRemoveFeature}
          />

          <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <Label htmlFor="service-upload">Service image</Label>
                <p className="text-xs text-[#0A211F]/58">
                  Keep the current image URL or switch to upload a new image.
                </p>
              </div>

              <div className="inline-flex rounded-xl border border-[#0A211F]/10 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    imageMode === "upload"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    imageMode === "url"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Use Image URL
                </button>
              </div>
            </div>

            {imageMode === "upload" ? (
              <label
                htmlFor="service-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
              >
                <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                  <ImagePlus className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0A211F]">Upload service image</p>
                  <p className="text-xs text-[#0A211F]/58">
                    Add a new cover image for the service.
                  </p>
                  {imageFile ? (
                    <p className="text-xs font-medium text-[#0A211F]">{imageFile.name}</p>
                  ) : null}
                </div>
                <input
                  id="service-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="service-image-url">Service image URL</Label>
                <Input
                  id="service-image-url"
                  value={imageUrl}
                  onChange={(event) => setImageUrl(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-5">
            <Button
              type="button"
              disabled={isPending || !isFormValid}
              onClick={() => mutate()}
              className="rounded-xl bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <PencilLine className="size-4" />
              {isPending ? "Saving..." : "Update Service"}
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/services">Cancel</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
