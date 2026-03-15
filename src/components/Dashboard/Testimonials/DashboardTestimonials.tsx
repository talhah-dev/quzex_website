"use client";

import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Pencil, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { COUNTRY_FLAG_IMAGES, COUNTRY_LABELS } from "@/lib/countries";
import { getTestimonials } from "@/lib/api/testimonials";
import { normalizeImageSrc } from "@/lib/normalize-image-src";
import DeleteTestimonialDialog from "@/components/Dashboard/Testimonials/DeleteTestimonialDialog";

export default function DashboardTestimonials() {
  const {
    data: reviews = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const textReviews = reviews.filter((review) => review.type === "text").length;
  const audioReviews = reviews.filter((review) => review.type === "audio").length;
  const countries = new Set(reviews.map((review) => review.country)).size;

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
                Testimonials
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Testimonials dashboard
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Review the client testimonials currently prepared for the homepage and future reviews page.
                </p>
              </div>
            </div>

            <Button
              asChild
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <Link href="/dashboard/testimonials/new">
                <Plus className="size-4" />
                <span>Add New Review</span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Total Testimonials</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(reviews.length).padStart(2, "0")}
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Countries</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(countries).padStart(2, "0")}
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Text Reviews</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(textReviews).padStart(2, "0")}
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Audio Reviews</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(audioReviews).padStart(2, "0")}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
            Testimonial List
          </p>
          <h2 className="text-2xl font-semibold text-[#0A211F]">All client testimonials</h2>
        </div>

        {isLoading ? (
          <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] px-4 py-12 text-center text-sm text-[#0A211F]/62">
            Loading reviews...
          </div>
        ) : null}

        {isError ? (
          <div className="rounded-xl border border-[#e4b4b4] bg-[#fff5f5] px-4 py-12 text-center text-sm text-[#8a2d2d]">
            {error instanceof Error ? error.message : "Unable to load reviews right now."}
          </div>
        ) : null}

        {!isLoading && !isError && reviews.length === 0 ? (
          <div className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] px-4 py-12 text-center text-sm text-[#0A211F]/62">
            No testimonials have been uploaded yet.
          </div>
        ) : null}

        {!isLoading && !isError && reviews.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {reviews.map((review) => {
              const profileImageSrc = normalizeImageSrc(review.profileImage);

              return (
                <article
                  key={review._id}
                  className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
                >
                  <div className="flex h-full flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#0A211F]">
                          {profileImageSrc ? (
                            <Image
                              src={profileImageSrc}
                              alt={review.name}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#E9F3E6]">
                              {review.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>

                        <div>
                          <h3 className="text-base font-semibold text-[#0A211F]">{review.name}</h3>
                          <p className="text-sm text-[#0A211F]/62">{review.timeAgo}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge className="rounded-full bg-[#D8F782] text-[#0A211F] hover:bg-[#D8F782]">
                          {review.category}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="rounded-full border-[#0A211F]/10 bg-white text-[#0A211F]"
                        >
                          {review.type === "audio" ? <Headphones className="mr-1 size-3.5" /> : null}
                          {review.type}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Image
                        src={COUNTRY_FLAG_IMAGES[review.flag]}
                        alt={`${review.country} flag`}
                        width={20}
                        height={14}
                        className="h-[14px] w-5 rounded-[2px] object-cover"
                      />
                      <span className="text-sm font-medium text-[#0A211F]">{COUNTRY_LABELS[review.flag]}</span>
                      <span className="text-sm text-[#0A211F]/45">.</span>
                      <div className="flex items-center gap-1 text-[#F4B400]">
                        <Star className="size-4 fill-current" />
                        <span className="text-sm font-semibold text-[#0A211F]">{review.rating}</span>
                      </div>
                    </div>

                    <p className="text-sm leading-7 text-[#0A211F]/72">{review.review}</p>

                    <div className="mt-auto flex flex-wrap gap-2 pt-2">
                      <Button
                        asChild
                        type="button"
                        variant="outline"
                        className="border-[#0A211F]/10 bg-white text-[#0A211F] hover:bg-[#EDF6E8]"
                      >
                        <Link href={`/dashboard/testimonials/${review._id}/edit`}>
                          <Pencil className="size-4" />
                          Edit
                        </Link>
                      </Button>
                      <DeleteTestimonialDialog
                        testimonialId={review._id}
                        testimonialName={review.name}
                      />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </section>
    </div>
  );
}
