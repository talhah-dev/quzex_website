"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FileText, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { BlogRecord } from "@/types";
import { deleteBlog, getAdminBlogs } from "@/lib/api/blogs";

export default function DashboardBlogs() {
  const [blogs, setBlogs] = useState<BlogRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadBlogs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await getAdminBlogs();
      setBlogs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load blog posts.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBlogs();
  }, [loadBlogs]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this blog post? This cannot be undone.")) {
      return;
    }

    setDeletingId(id);

    try {
      await deleteBlog(id);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete blog post.");
    } finally {
      setDeletingId(null);
    }
  }

  const categoriesCount = new Set(blogs.map((post) => post.category)).size;
  const activeCount = blogs.filter((post) => post.isActive).length;

  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Blog
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Blog dashboard
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Manage all your blog posts from one place. Create, edit, and delete posts — changes reflect immediately on the public blog page.
                </p>
              </div>
            </div>

            <Button
              asChild
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <Link href="/dashboard/blog/new">
                <Plus className="size-4" />
                <span>Create New Blog</span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Published Posts</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {isLoading ? "—" : String(activeCount).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Active blog posts currently visible on the public blog page.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Categories</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {isLoading ? "—" : String(categoriesCount).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Unique blog categories across all your current posts.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Content Status</p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-[#0A211F]">
                <FileText className="size-5" />
                {isLoading ? "Loading…" : "Live & Active"}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Blog posts are stored in the database and served dynamically to your visitors.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
            Blog List
          </p>
          <h2 className="text-2xl font-semibold text-[#0A211F]">
            All blog posts
          </h2>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="size-7 animate-spin text-[#0A211F]/40" />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/12 bg-[#f7f9f2] py-16 text-center">
            <FileText className="size-10 text-[#0A211F]/25" />
            <p className="text-sm font-medium text-[#0A211F]/52">No blog posts yet</p>
            <p className="text-xs text-[#0A211F]/40">
              Click &ldquo;Create New Blog&rdquo; above to write your first post.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogs.map((post) => (
              <article
                key={post._id}
                className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2]"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-4 p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="rounded-full bg-[#D8F782] text-[#0A211F] hover:bg-[#D8F782]">
                      {post.category}
                    </Badge>
                    <span className="rounded-full border border-[#0A211F]/10 bg-white px-3 py-1 text-xs font-medium text-[#0A211F]/62">
                      /blog/{post.slug}
                    </span>
                    {!post.isActive ? (
                      <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                        Draft
                      </span>
                    ) : null}
                  </div>

                  <div className="space-y-2">
                    <h3 className="line-clamp-2 text-xl font-semibold text-[#0A211F]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 text-sm leading-7 text-[#0A211F]/68">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      asChild
                      className="h-9 rounded-full border-[#0A211F]/10 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
                    >
                      <Link href={`/dashboard/blog/${post._id}/edit`}>
                        <Pencil className="size-3.5" />
                        Edit
                      </Link>
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={deletingId === post._id}
                      onClick={() => handleDelete(post._id)}
                      className="h-9 rounded-full border-[#0A211F]/10 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#FFF5F5] hover:text-red-600 disabled:opacity-60"
                    >
                      {deletingId === post._id ? (
                        <Loader2 className="size-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="size-3.5" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
