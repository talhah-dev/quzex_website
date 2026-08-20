"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState, type ChangeEvent } from "react";
import { ArrowLeft, ImagePlus, Loader2, PenSquare, Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServiceRichTextEditor from "@/components/Dashboard/Services/ServiceRichTextEditor";
import { uploadFile } from "@/lib/api/upload";
import { getAdminBlogById, updateBlog } from "@/lib/api/blogs";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

type Props = {
  id: string;
};

export default function DashboardBlogEdit({ id }: Props) {
  const router = useRouter();

  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [titleEdited, setTitleEdited] = useState(false);
  const [manualSlug, setManualSlug] = useState("");
  const [category, setCategory] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isActive, setIsActive] = useState(true);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [focusKeyword, setFocusKeyword] = useState("");
  const [ogTitle, setOgTitle] = useState("");
  const [ogDescription, setOgDescription] = useState("");
  const [ogImage, setOgImage] = useState("");
  const [twitterTitle, setTwitterTitle] = useState("");
  const [twitterDescription, setTwitterDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-generate slug only if title hasn't been manually changed from initial load
  const slug = useMemo(
    () => (titleEdited ? slugify(title) : manualSlug),
    [title, titleEdited, manualSlug]
  );

  const loadBlog = useCallback(async () => {
    setIsLoadingPost(true);
    setLoadError(null);

    try {
      const blog = await getAdminBlogById(id);
      setTitle(blog.title);
      setManualSlug(blog.slug);
      setCategory(blog.category);
      setExcerpt(blog.excerpt);
      setContent(blog.content);
      setImageUrl(blog.image);
      setIsActive(blog.isActive);
      setMetaTitle(blog.seo?.metaTitle ?? "");
      setMetaDescription(blog.seo?.metaDescription ?? "");
      setCanonicalUrl(blog.seo?.canonicalUrl ?? "");
      setFocusKeyword(blog.seo?.focusKeyword ?? "");
      setOgTitle(blog.seo?.ogTitle ?? "");
      setOgDescription(blog.seo?.ogDescription ?? "");
      setOgImage(blog.seo?.ogImage ?? "");
      setTwitterTitle(blog.seo?.twitterTitle ?? "");
      setTwitterDescription(blog.seo?.twitterDescription ?? "");
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Failed to load blog post.");
    } finally {
      setIsLoadingPost(false);
    }
  }, [id]);

  useEffect(() => {
    loadBlog();
  }, [loadBlog]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setImageFile(file);
  }

  function handleTitleChange(value: string) {
    setTitle(value);
    setTitleEdited(true);
  }

  async function handleSubmit(publishStatus: boolean) {
    setSubmitError(null);

    if (!title.trim() || !category.trim() || !excerpt.trim() || !content.trim()) {
      setSubmitError("Title, category, excerpt, and content are required.");
      return;
    }

    if (imageMode === "upload" && !imageFile && !imageUrl) {
      setSubmitError("Please upload a cover image or switch to URL mode.");
      return;
    }

    if (imageMode === "url" && !imageUrl.trim()) {
      setSubmitError("Please enter a cover image URL or switch to upload mode.");
      return;
    }

    setIsSubmitting(true);

    try {
      let finalImageUrl = imageUrl.trim();

      if (imageMode === "upload" && imageFile) {
        const uploaded = await uploadFile({ file: imageFile, folder: "blogs" });
        finalImageUrl = uploaded.url;
      }

      const finalSlug = titleEdited ? slugify(title) : manualSlug;

      await updateBlog({
        id,
        title: title.trim(),
        slug: finalSlug,
        category: category.trim(),
        image: finalImageUrl,
        excerpt: excerpt.trim(),
        content,
        isActive: publishStatus,
        seo: {
          metaTitle: metaTitle.trim() || undefined,
          metaDescription: metaDescription.trim() || undefined,
          canonicalUrl: canonicalUrl.trim() || undefined,
          focusKeyword: focusKeyword.trim() || undefined,
          ogTitle: ogTitle.trim() || undefined,
          ogDescription: ogDescription.trim() || undefined,
          ogImage: ogImage.trim() || undefined,
          twitterTitle: twitterTitle.trim() || undefined,
          twitterDescription: twitterDescription.trim() || undefined,
        },
      });

      router.push("/dashboard/blog");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isLoadingPost) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="size-8 animate-spin text-[#0A211F]/40" />
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-6 py-8 text-center">
        <p className="text-sm font-medium text-red-600">{loadError}</p>
        <Button
          type="button"
          variant="outline"
          onClick={loadBlog}
          className="mt-4 rounded-xl border-[#0A211F]/12 text-[#0A211F]"
        >
          Try again
        </Button>
      </div>
    );
  }

  return (
    <section className="grid gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="space-y-3">
          <Badge
            variant="outline"
            className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
          >
            Edit Blog
          </Badge>
          <div className="space-y-2">
            <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
              Edit blog post
            </h1>
            <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
              Update the blog content, image, or SEO fields. Saving as draft will hide the post from the public page.
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
              onChange={(event) => handleTitleChange(event.target.value)}
              placeholder="Write a strong blog title"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </label>

          <label className="grid gap-2 text-sm text-[#0A211F]/75">
            <span className="font-medium text-[#0A211F]">Focus keyword</span>
            <Input
              type="text"
              value={focusKeyword}
              onChange={(event) => setFocusKeyword(event.target.value)}
              placeholder="website planning"
              disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="rounded-xl border border-[#0A211F]/12 bg-[#f7f9f2] px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25 disabled:opacity-60"
          />
        </label>

        <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Label htmlFor="blog-upload-edit">Cover image</Label>
              <p className="text-xs text-[#0A211F]/58">
                Upload a new image or keep the existing URL below.
              </p>
            </div>

            <div className="inline-flex rounded-xl border border-[#0A211F]/10 bg-white p-1">
              <button
                type="button"
                onClick={() => setImageMode("upload")}
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
              htmlFor="blog-upload-edit"
              className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
            >
              <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                <ImagePlus className="size-5" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-[#0A211F]">Upload new cover image</p>
                <p className="text-xs text-[#0A211F]/58">
                  Leave empty to keep the existing cover image.
                </p>
                {imageFile ? <p className="text-xs font-medium text-[#0A211F]">{imageFile.name}</p> : null}
              </div>
              <input
                id="blog-upload-edit"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isSubmitting}
              />
            </label>
          ) : (
            <div className="grid gap-2">
              <Label htmlFor="blog-image-url-edit">Blog image URL</Label>
              <Input
                id="blog-image-url-edit"
                type="text"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                placeholder="https://example.com/blog-cover.jpg"
                disabled={isSubmitting}
              />
            </div>
          )}
        </div>

        <ServiceRichTextEditor
          id="blog-content-edit"
          label="Blog content"
          value={content}
          placeholder="Write the full blog post here."
          onChange={setContent}
        />

        <div className="grid gap-6 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#0A211F]">SEO options</h2>
            <p className="text-sm text-[#0A211F]/62">
              All SEO fields are optional. They improve how your post appears in search results and social previews.
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
                disabled={isSubmitting}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Canonical URL</span>
              <Input
                type="text"
                value={canonicalUrl}
                onChange={(event) => setCanonicalUrl(event.target.value)}
                placeholder="https://quzex.co/blog/your-post-slug"
                disabled={isSubmitting}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-2">
              <span className="font-medium text-[#0A211F]">Meta description</span>
              <textarea
                rows={4}
                value={metaDescription}
                onChange={(event) => setMetaDescription(event.target.value)}
                placeholder="Short search description for Google"
                disabled={isSubmitting}
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25 disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Open Graph title</span>
              <Input
                type="text"
                value={ogTitle}
                onChange={(event) => setOgTitle(event.target.value)}
                placeholder="Title used for social shares"
                disabled={isSubmitting}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Open Graph image</span>
              <Input
                type="text"
                value={ogImage}
                onChange={(event) => setOgImage(event.target.value)}
                placeholder="https://quzex.co/og-images/blog-post.jpg"
                disabled={isSubmitting}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-2">
              <span className="font-medium text-[#0A211F]">Open Graph description</span>
              <textarea
                rows={4}
                value={ogDescription}
                onChange={(event) => setOgDescription(event.target.value)}
                placeholder="Description used for Facebook, LinkedIn, and WhatsApp previews"
                disabled={isSubmitting}
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25 disabled:opacity-60"
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75">
              <span className="font-medium text-[#0A211F]">Twitter title</span>
              <Input
                type="text"
                value={twitterTitle}
                onChange={(event) => setTwitterTitle(event.target.value)}
                placeholder="Title used for X/Twitter cards"
                disabled={isSubmitting}
              />
            </label>

            <label className="grid gap-2 text-sm text-[#0A211F]/75 lg:col-span-1">
              <span className="font-medium text-[#0A211F]">Twitter description</span>
              <textarea
                rows={4}
                value={twitterDescription}
                onChange={(event) => setTwitterDescription(event.target.value)}
                placeholder="Description used for X/Twitter cards"
                disabled={isSubmitting}
                className="rounded-xl border border-[#0A211F]/12 bg-white px-4 py-3 outline-none transition-colors focus:border-[#0A211F]/25 disabled:opacity-60"
              />
            </label>
          </div>
        </div>

        {submitError ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {submitError}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#0A211F]/10 pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => handleSubmit(false)}
            className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
            Save as Draft
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
            disabled={isSubmitting}
            onClick={() => handleSubmit(true)}
            className="rounded-xl bg-[#0A211F] text-[#E9F3E6] hover:bg-[#143531]"
          >
            {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <PenSquare className="size-4" />}
            Update & Publish
          </Button>
        </div>
      </div>
    </section>
  );
}
