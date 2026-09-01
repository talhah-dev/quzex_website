import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
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
      ? [post.seo.focusKeyword, post.category, "quzex blog"]
      : [post.category, "web development", "quzex blog"],
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
          <article className="mx-auto max-w-5xl overflow-hidden rounded-2xl">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(min-width: 1280px) 72rem, 100vw"
                className="object-cover rounded-2xl"
                priority
              />
            </div>

            <div>
              <div className="mx-auto grid gap-6 py-6 sm:py-8">
                <Badge
                  variant="outline"
                  className="w-fit rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
                >
                  {post.category}
                </Badge>

                <div className="space-y-4">
                  <h1 className="text-2xl font-semibold leading-tight text-[#0A211F] sm:text-4xl">
                    {post.title}
                  </h1>
                  <p className="text-base leading-8 text-[#0A211F]/70">{post.excerpt}</p>
                </div>

                {/* Rich text content from the editor is stored as HTML */}
                <div
                  className="prose prose-slate max-w-none text-[#0A211F]/72 leading-8"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-5">
                  <AnimatedButton href="/blog" color="dark">
                    Back to Blog
                  </AnimatedButton>
                </div>
              </div>
            </div>
          </article>

          <div className="mx-auto max-w-5xl">
            <BlogCommentsSection />
          </div>
        </div>
      </section>
    </Wrapper>
  );
}
