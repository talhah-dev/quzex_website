import Image from "next/image";
import { notFound } from "next/navigation";
import Wrapper from "@/app/Wrapper";
import BlogCommentsSection from "@/components/Blog/BlogCommentsSection";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Badge } from "@/components/ui/badge";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/blog";

type BlogDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <Wrapper forceNavbarBackground>
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
              />
            </div>

            <div className="">
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

                <div className="space-y-5">
                  {post.content.map((paragraph) => (
                    <p key={paragraph} className="text-base leading-8 text-[#0A211F]/72">
                      {paragraph}
                    </p>
                  ))}
                </div>

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
