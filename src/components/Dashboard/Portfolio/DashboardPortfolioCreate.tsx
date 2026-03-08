"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, ArrowUpRight, ImagePlus, Plus } from "lucide-react";
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

const fallbackImage =
  "https://res.cloudinary.com/deo5ex1zo/image/upload/v1772881618/screencapture-stragthmond-vercel-app-2026-03-07-16_07_40_jswtb3.png";

export default function DashboardPortfolioCreate() {
  const [title, setTitle] = useState("Project title preview");
  const [priority, setPriority] = useState("1");
  const [liveLink, setLiveLink] = useState("https://example.com");
  const [tags, setTags] = useState("Business Website, Responsive, Modern UI, Custom Build");
  const [homeVisibility, setHomeVisibility] = useState<"home" | "work-only">("work-only");
  const [category, setCategory] = useState("Business Website");
  const [description, setDescription] = useState(
    "A short project summary will appear here as you prepare the portfolio item."
  );
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (uploadedImageUrl) {
        URL.revokeObjectURL(uploadedImageUrl);
      }
    };
  }, [uploadedImageUrl]);

  const previewImage = useMemo(() => {
    if (imageMode === "url" && imageUrl.trim()) {
      return imageUrl.trim();
    }

    if (imageMode === "upload" && uploadedImageUrl) {
      return uploadedImageUrl;
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

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setUploadedImageUrl(objectUrl);
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
                New Portfolio
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Add new portfolio project
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Fill in the portfolio details and preview how the project card will look before
                  it appears on your website.
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
                onChange={(event) => setTitle(event.target.value)}
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
                onChange={(event) => setPriority(event.target.value)}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-live-link">Live website link</Label>
              <Input
                id="portfolio-live-link"
                name="portfolio_live_link"
                placeholder="https://example.com"
                value={liveLink}
                onChange={(event) => setLiveLink(event.target.value)}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-tags">Portfolio tags</Label>
              <Input
                id="portfolio-tags"
                name="portfolio_tags"
                placeholder="Property Website, Responsive, Listings, Sales"
                value={tags}
                onChange={(event) => setTags(event.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="portfolio-home-visibility">Homepage visibility</Label>
              <Select value={homeVisibility} onValueChange={(value) => setHomeVisibility(value as "home" | "work-only")}>
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
              <Input
                id="portfolio-category"
                name="portfolio_category"
                placeholder="Business Website"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="portfolio-description">Short project summary</Label>
              <textarea
                id="portfolio-description"
                name="portfolio_description"
                rows={5}
                placeholder="Write a short summary for this portfolio project."
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="min-h-32 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <Label htmlFor="portfolio-upload">Project image</Label>
                <p className="text-xs text-[#0A211F]/58">
                  Upload an image by default. If you already have a URL, switch and paste it
                  there.
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
                htmlFor="portfolio-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
              >
                <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                  <ImagePlus className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0A211F]">Upload portfolio image</p>
                  <p className="text-xs text-[#0A211F]/58">
                    Add a project screenshot or cover image for the portfolio card.
                  </p>
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
                  onChange={(event) => setImageUrl(event.target.value)}
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-5">
            <Button
              type="button"
              className="rounded-xl bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <Plus className="size-4" />
              Save Portfolio
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
              <p className="mt-1 text-sm text-[#E9F3E6]/60">How this card can appear on your website</p>
            </div>
            <span className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-semibold text-[#0A211F]">
              {previewPriority}
            </span>
          </div>

          <div className="group">
            <a
              href={liveLink || "#"}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl"
            >
              <div className="relative h-[240px] overflow-hidden rounded-2xl">
                <Image
                  src={previewImage}
                  alt={title || "Portfolio preview"}
                  fill
                  sizes="360px"
                  unoptimized
                  className="object-cover object-top transition-[object-position] duration-[5000ms] ease-linear group-hover:object-bottom"
                />
              </div>

              <div className="flex flex-col gap-3 px-1 pb-1 pt-5">
                <div className="inline-flex w-fit items-center gap-2 text-[#D8F782]">
                  <span className="text-[11px] font-medium uppercase tracking-[0.22em]">
                    Live Preview
                  </span>
                  <ArrowUpRight className="size-4" />
                </div>

                <p className="text-xl font-medium text-[#E9F3E6] sm:text-2xl">
                  {title || "Project title preview"}
                </p>

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
            </a>
          </div>
        </section>
      </aside>
    </div>
  );
}
