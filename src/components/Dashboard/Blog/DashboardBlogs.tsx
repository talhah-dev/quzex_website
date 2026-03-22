import Image from "next/image";
import Link from "next/link";
import { FileText, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog";

export default function DashboardBlogs() {
  const categoriesCount = new Set(BLOG_POSTS.map((post) => post.category)).size;

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
                  Review the blog posts currently prepared for your public blog page and manage future content from one place.
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
                {String(BLOG_POSTS.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Total static blog posts currently available on the public blog page.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Categories</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(categoriesCount).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Unique blog categories represented in your current static blog content.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Content Status</p>
              <p className="mt-3 inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-[#0A211F]">
                <FileText className="size-5" />
                Static Ready
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                This dashboard is set up for static blog management right now, ready for API integration later.
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
            All current blog posts
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
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
                    className="h-9 rounded-full border-[#0A211F]/10 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#EDF6E8]"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="h-9 rounded-full border-[#0A211F]/10 bg-white px-3 text-xs font-medium text-[#0A211F] hover:bg-[#FFF5F5]"
                  >
                    <Trash2 className="size-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
