"use client";

import Link from "next/link";
import { useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, PenSquare, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServiceRichTextEditor from "@/components/Dashboard/Services/ServiceRichTextEditor";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function DashboardBlogCreate() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");

  const slug = useMemo(() => slugify(title), [title]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
          >
            New Blog
          </Badge>
          <div className="space-y-2">
            <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
              Create a new blog post
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
              Prepare the full blog structure here with image options, content formatting, and SEO fields before we connect the real blog API.
            </p>
          </div>
        </div>

        <Button
          asChild
          variant="outline"
          className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
        >
          <Link href="/dashboard/blog">
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <label className="grid gap-2 text-sm text-[#0A211F]/75">
            <span className="font-medium text-[#0A211F]">Blog title</span>
            <Input
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Write a strong blog title"
            />
          </label>

          <label className="grid gap-2 text-sm text-[#0A211F]/75">
            <span className="font-medium text-[#0A211F]">Slug</span>
            <Input type="text" value={slug} readOnly placeholder="blog-post-slug" />
          </label>

          <label className="grid gap-2 text-sm text-[#0A211F]/75">
            <span className="font-medium text-[#0A211F]">Category</span>
            <Input
              type="text"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              placeholder="Development"
            />
          </label>

          <label className="grid gap-2 text-sm text-[#0A211F]/75">
            <span className="font-medium text-[#0A211F]">Focus keyword</span>
            <Input
              type="text"
              value={focusKeyword}
              onChange={(event) => setFocusKeyword(event.target.value)}
              placeholder="website planning"
            />
          </label>
        </div>

        <label className="grid gap-2 text-sm text-[#0A211F]/75">
          <span className="font-medium text-[#0A211F]">Excerpt</span>
          <textarea
            rows={4}
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            placeholder="Short summary shown on the blog listing page"
            className="rounded-xl border border-[#0A211F]/12 bg-[#f7f9f2] px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25"
          />
        </label>

        <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Label htmlFor="blog-upload">Cover image</Label>
              <p className="text-xs text-[#0A211F]/58">
                Choose whether you want to upload a blog cover image or paste an image URL.
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
              htmlFor="blog-upload"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
            >
              <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                <ImagePlus className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#0A211F]">Upload blog cover image</p>
                <p className="text-xs text-[#0A211F]/58">
                  Add the main image that will appear on the blog listing and blog detail page.
                </p>
                {imageFile ? <p className="text-xs font-medium text-[#0A211F]">{imageFile.name}</p> : null}
              </div>
              <input
                id="blog-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="blog-image-url">Blog image URL</Label>
              <Input
                id="blog-image-url"
                type="text"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/blog-cover.jpg"
              />
            </div>
          )}
        </div>

        <ServiceRichTextEditor
          id="blog-content"
          label="Blog content"
          value={content}
          placeholder="Write the full blog post here. Use headings, paragraph text, highlight important lines, add lists, links, and tables where needed."
          onChange={setContent}
        />

        <div className="grid gap-6 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#0A211F]">SEO options</h2>
            <p className="text-sm text-[#0A211F]/62">
              These static fields are ready for advanced SEO setup later, including metadata and social sharing values.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Meta title</span>
              <Input
                type="text"
                value={metaTitle}
                onChange={(event) => setMetaTitle(event.target.value)}
                placeholder="Meta title for search engines"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Canonical URL</span>
              <Input
                type="text"
                value={canonicalUrl}
                onChange={(event) => setCanonicalUrl(event.target.value)}
                placeholder="https://quzex.co/blog/your-post-slug"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-2">
              <span className="font-medium text-[#0A211F]">Meta description</span>
              <textarea
                rows={4}
                value={metaDescription}
                onChange={(event) => setMetaDescription(event.target.value)}
                placeholder="Short search description for Google"
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Open Graph title</span>
              <Input
                type="text"
                value={ogTitle}
                onChange={(event) => setOgTitle(event.target.value)}
                placeholder="Title used for social shares"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Open Graph image</span>
              <Input
                type="text"
                value={ogImage}
                onChange={(event) => setOgImage(event.target.value)}
                placeholder="https://quzex.co/og-images/blog-post.jpg"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-2">
              <span className="font-medium text-[#0A211F]">Open Graph description</span>
              <textarea
                rows={4}
                value={ogDescription}
                onChange={(event) => setOgDescription(event.target.value)}
                placeholder="Description used for Facebook, LinkedIn, and WhatsApp previews"
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Twitter title</span>
              <Input
                type="text"
                value={twitterTitle}
                onChange={(event) => setTwitterTitle(event.target.value)}
                placeholder="Title used for X/Twitter cards"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-1">
              <span className="font-medium text-[#0A211F]">Twitter description</span>
              <textarea
                rows={4}
                value={twitterDescription}
                onChange={(event) => setTwitterDescription(event.target.value)}
                placeholder="Description used for X/Twitter cards"
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#0A211F]/10 pt-5">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Save className="size-4" />
            Save Draft
          </Button>
          <Button
            asChild
            type="button"
            variant="outline"
            className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            <Link href="/dashboard/blog">Cancel</Link>
          </Button>
          <Button
            type="button"
            className="rounded-xl bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
          >
            <PenSquare className="size-4" />
            Publish Blog
          </Button>
        </div>
      </div>
    </section>
  );
}
