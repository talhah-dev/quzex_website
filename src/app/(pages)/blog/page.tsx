import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText } from "lucide-react";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import type { BlogRecord } from "@/types";
import { buildBreadcrumbSchema, buildPageMetadata, stringifyJsonLd } from "@/lib/seo";

export const dynamic = "force-dynamic";

function formatPublishedDate(date?: Date | string) {
  if (!date) return null;
  const parsed = new Date(date);
  if (isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export const metadata = buildPageMetadata({
  title: "Web Development Blog & Insights | Quzex Pakistan",
  description:
    "Read articles and insights from Quzex on website planning, Next.js development, redesign strategies, SEO performance, and digital solutions for growing businesses in Pakistan and beyond.",
  path: "/blog",
  keywords: [
    "quzex blog",
    "web development blog Pakistan",
    "website development articles",
    "Next.js tutorials",
    "website redesign strategies",
    "SEO guides Pakistan",
    "website planning guides",
    "digital marketing blog Pakistan",
    "web design tips",
  ],
});

async function getPublicBlogs(): Promise<BlogRecord[]> {
  try {
    await connectToDatabase();
    const blogs = await BlogModel.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return blogs.map((blog) => ({
      ...blog,
      _id: blog._id.toString(),
    })) as BlogRecord[];
  } catch {
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublicBlogs();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  return (
    <Wrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(breadcrumbSchema) }}
      />
      <HeroSection
        heading="Web Development Blog & Insights"
        paragraph="Insights about website planning, design decisions, development process, and the practical things that help businesses build better websites."
        primaryButtonLabel="Contact Us"
        primaryButtonHref="/contact"
        secondaryButtonLabel="View Services"
        secondaryButtonHref="/services"
      />

      <section className="bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-[#0A211F]/12 bg-white py-24 text-center">
              <div className="inline-flex rounded-2xl bg-[#EDF6E8] p-5">
                <FileText className="size-8 text-[#0A211F]/40" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-semibold text-[#0A211F]">No blog posts yet</p>
                <p className="max-w-sm text-sm leading-relaxed text-[#0A211F]/58">
                  We&rsquo;re working on new content. Check back soon or reach out to us in the meantime.
                </p>
              </div>
              <Button
                asChild
                className="mt-2 rounded-xl bg-[#0A211F] px-6 text-[#E9F3E6] hover:bg-[#143531]"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="overflow-hidden rounded-2xl border border-[#0A211F]/10 bg-white shadow-[0_18px_45px_-35px_rgba(10,33,31,0.28)]"
                  >
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="space-y-4 p-6">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-xs font-medium text-[#0A211F]"
                        >
                          {post.category}
                        </Badge>

                        {post.createdAt && (
                          <div className="flex items-center gap-1.5 text-xs font-medium text-[#0A211F]/55">
                            <Calendar className="size-3.5 text-[#0A211F]/45" />
                            <span>{formatPublishedDate(post.createdAt)}</span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <h2 className="line-clamp-2 text-xl sm:text-2xl font-semibold leading-snug text-[#0A211F]">
                          {post.title}
                        </h2>
                        <p className="line-clamp-2 text-sm leading-relaxed text-[#0A211F]/68">
                          {post.excerpt}
                        </p>
                      </div>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
                      >
                        <Link href={`/blog/${post.slug}`}>Read Post</Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  asChild
                  className="rounded-xl bg-[#0A211F] px-6 text-[#E9F3E6] hover:bg-[#143531]"
                >
                  <Link href="/contact">Need a website instead?</Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </section>
    </Wrapper>
  );
}
