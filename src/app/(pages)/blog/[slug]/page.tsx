import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar } from "lucide-react";
import Wrapper from "@/app/Wrapper";
import BlogCommentsSection from "@/components/Blog/BlogCommentsSection";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Badge } from "@/components/ui/badge";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
  buildPageMetadata,
  stringifyJsonLd,
} from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamic = "force-dynamic";

function formatPublishedDate(date?: Date | string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatBlogContent(rawContent: string): string {
  if (!rawContent) return "";

  // If the content already contains HTML block tags
  if (/<(p|h1|h2|h3|h4|h5|h6|ul|ol|blockquote|pre|div)[^>]*>/i.test(rawContent)) {
    return rawContent;
  }

  // Convert plain text or markdown-style paragraphs to structured HTML
  return rawContent
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("### ")) {
        return `<h3>${trimmed.replace(/^###\s+/, "")}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2>${trimmed.replace(/^##\s+/, "")}</h2>`;
      }
      if (trimmed.startsWith("# ")) {
        return `<h1>${trimmed.replace(/^#\s+/, "")}</h1>`;
      }
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

async function getBlogBySlug(slug: string) {
  try {
    await connectToDatabase();
    const blog = await BlogModel.findOne({ slug, isActive: true }).lean();

    if (!blog) return null;

    return {
      ...blog,
      _id: blog._id.toString(),
    };
  } catch {
    return null;
  }
}

// ─── Per-post dynamic metadata ────────────────────────────────────────────────
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post does not exist or has been removed.",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;
  const image = post.seo?.ogImage || post.image;

  return buildPageMetadata({
    title,
    description,
    path: `/blog/${slug}`,
    image,
    type: "article",
    publishedTime: post.createdAt ? new Date(post.createdAt as Date).toISOString() : undefined,
    modifiedTime: post.updatedAt ? new Date(post.updatedAt as Date).toISOString() : undefined,
    keywords: post.seo?.focusKeyword
      ? [post.seo.focusKeyword, post.category, "quzex blog", "web development Pakistan"]
      : [post.category, "web development blog Pakistan", "website tips", "quzex blog"],
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);

  const articleSchema = buildArticleSchema({
    title: post.title,
    description: post.excerpt,
    slug,
    image: post.seo?.ogImage || post.image,
    publishedAt: post.createdAt ? new Date(post.createdAt as Date).toISOString() : undefined,
    updatedAt: post.updatedAt ? new Date(post.updatedAt as Date).toISOString() : undefined,
  });

  const publishedDateStr = formatPublishedDate(post.createdAt);
  const formattedContent = formatBlogContent(post.content);

  return (
    <Wrapper forceNavbarBackground>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(articleSchema) }}
      />
      <section className="bg-[#f7f9f2]">
        <div className="px-4 pb-16 pt-26 md:px-6 md:pt-28 lg:px-8">
          <article className="mx-auto max-w-4xl overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9] shadow-lg rounded-2xl overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1280px) 64rem, 100vw"
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            <div>
              <div className="mx-auto grid gap-6 py-6 sm:py-8">
                <div className="flex flex-wrap items-center gap-3.5">
                  <Badge
                    variant="outline"
                    className="w-fit rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3.5 py-1 text-xs sm:text-sm font-medium text-[#0A211F]"
                  >
                    {post.category}
                  </Badge>

                  {publishedDateStr && (
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#0A211F]/60">
                      <Calendar className="size-3.5 sm:size-4 text-[#0A211F]/45" />
                      <span>{publishedDateStr}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h1 className="text-2xl font-bold leading-tight text-[#0A211F] sm:text-4xl md:text-5xl tracking-tight">
                    {post.title}
                  </h1>
                  <p className="text-base sm:text-lg leading-relaxed text-[#0A211F]/70 font-normal border-l-2 border-[#8AF7B7] pl-4 py-1">
                    {post.excerpt}
                  </p>
                </div>

                {/* Rich styled blog content */}
                <div
                  className="blog-content prose max-w-none pt-2"
                  dangerouslySetInnerHTML={{ __html: formattedContent }}
                />

                <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-6 mt-4">
                  <AnimatedButton href="/blog" color="dark">
                    Back to Blog
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </Wrapper>
  );
}
