import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/app/Wrapper";
import HeroSection from "@/components/common/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog";

export default function BlogPage() {
  return (
    <Wrapper>
      <HeroSection
        heading="Blog Posts"
        paragraph="Insights about website planning, design decisions, development process, and the practical things that help businesses build better websites."
        primaryButtonLabel="Contact Us"
        primaryButtonHref="/contact"
        secondaryButtonLabel="View Services"
        secondaryButtonHref="/services"
      />

      <section className="bg-[#f7f9f2] px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
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
                  <Badge
                    variant="outline"
                    className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
                  >
                    {post.category}
                  </Badge>

                  <div className="space-y-3">
                    <h2 className="text-2xl font-semibold line-clamp-2 leading-tight text-[#0A211F]">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-7 line-clamp-2 text-[#0A211F]/68">{post.excerpt}</p>
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
        </div>
      </section>
    </Wrapper>
  );
}
