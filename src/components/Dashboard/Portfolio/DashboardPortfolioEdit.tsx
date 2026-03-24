"use client";

import Image from "next/image";
import Link from "next/link";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, ArrowUpRight, ImagePlus, PencilLine } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAdminPortfolioCard, updatePortfolioCard } from "@/lib/api/portfolio";
import { uploadFile } from "@/lib/api/upload";
import { compressImageFile } from "@/lib/compress-image";
import { PORTFOLIO_CATEGORIES } from "@/lib/portfolio";
import type { PortfolioCardCategory, UpdatePortfolioCardPayload } from "@/types";

const fallbackImage =
  "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772881618/screencapture-stragthmond-vercel-app-2026-03-07-16_07_40_jswtb3.png";

type DashboardPortfolioEditProps = {
  portfolioId: string;
};

type PortfolioDraft = {
  title?: string;
  priority?: string;
  liveLink?: string;
  tags?: string;
  homeVisibility?: "home" | "work-only";
  category?: PortfolioCardCategory;
  description?: string;
  imageMode?: "upload" | "url";
  imageUrl?: string;
};

export default function DashboardPortfolioEdit({
  portfolioId,
}: DashboardPortfolioEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState<PortfolioDraft | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["portfolio-card", portfolioId],
    queryFn: () => getAdminPortfolioCard(portfolioId),
  });

  const title = draft?.title ?? data?.title ?? "Project title preview";
  const priority = draft?.priority ?? String(data?.priority ?? 1);
  const category = draft?.category ?? data?.category ?? "Development";
  const isMarketingProject = category === "Marketing";
  const liveLink = draft?.liveLink ?? data?.href ?? "";
  const tags = draft?.tags ?? data?.tags?.join(", ") ?? "";
  const homeVisibility =
    draft?.homeVisibility ?? (data?.showOnHome ? "home" : "work-only");
  const description =
    draft?.description ??
    "Update the portfolio details and preview how the project card will look before it appears on your website.";
  const imageMode = draft?.imageMode ?? "url";
  const imageUrl = draft?.imageUrl ?? data?.image ?? "";

  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  const previewImage = useMemo(() => {
    if (imageMode === "upload" && uploadedImageUrl) {
      return uploadedImageUrl;
    }

    if (imageUrl.trim()) {
      return imageUrl.trim();
    }

    return fallbackImage;
  }, [imageMode, imageUrl, uploadedImageUrl]);

  const previewTags = useMemo(() => {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .slice(0, 4);
  }, [tags]);

  const previewPriority = useMemo(() => {
    const parsedValue = Number.parseInt(priority, 10);
    return String(Number.isNaN(parsedValue) ? 1 : Math.max(parsedValue, 1)).padStart(2, "0");
  }, [priority]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const optimizedFile = await compressImageFile(file, 500);

    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }

    setImageFile(optimizedFile);
    const objectUrl = URL.createObjectURL(optimizedFile);
    setUploadedImageUrl(objectUrl);

    if (optimizedFile.size < file.size) {
      toast.success("Portfolio image optimized before upload.");
    }
  }

  function handleDraftChange<K extends keyof PortfolioDraft>(
    field: K,
    value: PortfolioDraft[K]
  ) {
    setDraft((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      let finalImage = imageUrl.trim();

      if (imageMode === "upload") {
        if (!imageFile) {
          throw new Error("Please upload a portfolio image.");
        }

        const uploaded = await uploadFile({
          file: imageFile,
          folder: "portfolio",
        });

        finalImage = uploaded.url;
      }

      if (!finalImage) {
        throw new Error("Please provide a portfolio image.");
      }

      const payload: UpdatePortfolioCardPayload = {
        id: portfolioId,
        title: title.trim(),
        image: finalImage,
        tags: previewTags,
        category,
        href: isMarketingProject ? undefined : liveLink.trim() || undefined,
        priority: Number.parseInt(priority, 10) || 1,
        showOnHome: homeVisibility === "home",
      };

      return updatePortfolioCard(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Portfolio card updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["portfolio-cards"] });
      queryClient.invalidateQueries({ queryKey: ["portfolio-card", portfolioId] });
      router.push("/dashboard/portfolio");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to update portfolio card.");
    },
  });

  if (isLoading) {
    return (
      <div className="rounded-xl border border-[#0A211F]/10 bg-white p-6 text-sm text-[#0A211F]/62 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Loading portfolio details...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-[#C24141]/15 bg-[#FFF5F5] p-6 text-sm text-[#C24141] shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Unable to load this portfolio item right now.
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Button
              asChild
              variant="outline"
              className="w-fit border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/portfolio">
                <ArrowLeft className="size-4" />
                Back to Portfolio
              </Link>
            </Button>

            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Edit Portfolio
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Update portfolio project
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Edit the portfolio details and preview how the updated project card will look.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="portfolio-title">Project title</Label>
              <Input
                id="portfolio-title"
                name="portfolio_title"
                placeholder="Enter portfolio title"
                value={title}
                onChange={(event) => handleDraftChange("title", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolio-priority">Display priority</Label>
              <Input
                id="portfolio-priority"
                name="portfolio_priority"
                type="number"
                min="1"
                placeholder="1"
                value={priority}
                onChange={(event) => handleDraftChange("priority", event.target.value)}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-live-link">Live website link</Label>
              <Input
                id="portfolio-live-link"
                name="portfolio_live_link"
                placeholder={
                  isMarketingProject
                    ? "Not needed for marketing projects"
                    : "https://example.com"
                }
                value={liveLink}
                onChange={(event) => handleDraftChange("liveLink", event.target.value)}
                disabled={isMarketingProject}
              />
              {isMarketingProject ? (
                <p className="text-xs text-[#0A211F]/58">
                  Marketing projects can be updated without a website link.
                </p>
              ) : null}
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-tags">Portfolio tags</Label>
              <Input
                id="portfolio-tags"
                name="portfolio_tags"
                placeholder="Property Website, Responsive, Listings, Sales"
                value={tags}
                onChange={(event) => handleDraftChange("tags", event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolio-home-visibility">Homepage visibility</Label>
              <Select
                value={homeVisibility}
                onValueChange={(value) =>
                  handleDraftChange("homeVisibility", value as "home" | "work-only")
                }
              >
                <SelectTrigger
                  id="portfolio-home-visibility"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select visibility" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  <SelectItem value="work-only">Show on Work Page Only</SelectItem>
                  <SelectItem value="home">Show on Home Page</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolio-category">Project category</Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  handleDraftChange("category", value as PortfolioCardCategory)
                }
              >
                <SelectTrigger
                  id="portfolio-category"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  {PORTFOLIO_CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-description">Short project summary</Label>
              <textarea
                id="portfolio-description"
                name="portfolio_description"
                rows={5}
                placeholder="Write a short summary for this portfolio project."
                value={description}
                onChange={(event) => handleDraftChange("description", event.target.value)}
                className="min-h-32 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <Label htmlFor="portfolio-upload">Project image</Label>
                <p className="text-xs text-[#0A211F]/58">
                  Keep the current image URL or switch to upload a new image.
                </p>
              </div>

              <div className="inline-flex rounded-xl border border-[#0A211F]/10 bg-white p-1">
                <button
                  type="button"
                  onClick={() => handleDraftChange("imageMode", "upload")}
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
                  onClick={() => handleDraftChange("imageMode", "url")}
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
                htmlFor="portfolio-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
              >
                <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                  <ImagePlus className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0A211F]">Upload portfolio image</p>
                  <p className="text-xs text-[#0A211F]/58">
                    Add a new project screenshot or cover image for the portfolio card.
                  </p>
                  {imageFile ? (
                    <p className="text-xs font-medium text-[#0A211F]">{imageFile.name}</p>
                  ) : null}
                </div>
                <input
                  id="portfolio-upload"
                  name="portfolio_upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="portfolio-image-url">Project image URL</Label>
                <Input
                  id="portfolio-image-url"
                  name="portfolio_image_url"
                  placeholder="https://example.com/project-image.png"
                  value={imageUrl}
                  onChange={(event) => handleDraftChange("imageUrl", event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-5">
            <Button
              type="button"
              disabled={isPending}
              onClick={() => mutate()}
              className="rounded-xl bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <PencilLine className="size-4" />
              {isPending ? "Saving..." : "Update Portfolio"}
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/portfolio">Cancel</Link>
            </Button>
          </div>
        </div>
      </section>

      <aside className="grid gap-6 self-start">
        <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-[#081917] p-5 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.45)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D8F782]/72">
                Frontend Preview
              </p>
              <p className="mt-1 text-sm text-[#E9F3E6]/60">
                How this card can appear on your website
              </p>
            </div>
            <span className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-semibold text-[#0A211F]">
              {previewPriority}
            </span>
          </div>

          <div className="group">
            <div className="block rounded-2xl">
              <div className="relative h-[240px] overflow-hidden rounded-2xl">
                <Image
                  src={previewImage}
                  alt={title || "Portfolio preview"}
                  fill
                  sizes="360px"
                  unoptimized
                  className={`object-cover object-top transition-[object-position] duration-[5000ms] ease-linear ${!isMarketingProject ? "group-hover:object-bottom" : ""
                    }`}
                />
              </div>

              <div className="flex flex-col gap-3 px-1 pb-1 pt-5">
                <div className="inline-flex w-fit items-center gap-2 text-[#D8F782]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                    {isMarketingProject ? "Creative Preview" : "Live Preview"}
                  </span>
                  {!isMarketingProject ? <ArrowUpRight className="size-4" /> : null}
                </div>

                <p className="text-xl font-medium text-[#E9F3E6] sm:text-2xl">
                  {title || "Project title preview"}
                </p>

                <div className="inline-flex w-fit rounded-full border border-[#D8F782]/20 bg-[#0A211F]/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8F782]">
                  {category}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {(previewTags.length ? previewTags : ["Business Website", "Responsive"]).map(
                    (tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="h-7 border-white/12 bg-transparent px-3 py-1 text-sm font-normal text-[#E9F3E6]/80"
                      >
                        {tag}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}


