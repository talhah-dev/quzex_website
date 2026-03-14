"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Headphones, Play, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { COUNTRY_FLAG_IMAGES, COUNTRY_LABELS } from "@/lib/countries";
import { REVIEW_ITEMS, type ReviewCategory } from "@/lib/testimonials";

const Testimonials = () => {
  const [activeCategory, setActiveCategory] = useState<"All" | ReviewCategory>("All");

  const categories = useMemo(
    () => ["All", ...new Set(REVIEW_ITEMS.map((item) => item.category))] as Array<"All" | ReviewCategory>,
    []
  );

  const filteredReviews =
    activeCategory === "All"
      ? REVIEW_ITEMS
      : REVIEW_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 xl:px-16">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="h-7 px-3 py-1 text-sm font-normal">
            Testimonials
          </Badge>
          <h2 className="mt-4 text-3xl font-medium leading-tight text-[#0A211F] sm:text-5xl">
            Client reviews from teams across multiple countries
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#0A211F]/70">
            We work with clients in different markets, so this section highlights how website
            development, redesign, AI, and campaign work are received across regions.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const isActive = category === activeCategory;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={[
                      "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "border-[#0A211F] bg-[#0A211F] text-[#E9F3E6]"
                        : "border-[#0A211F]/12 bg-[#EDF6E8] text-[#0A211F] hover:bg-[#E4F2DD]",
                    ].join(" ")}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="h-full rounded-[28px] border border-[#0A211F]/10 bg-[#F7F9F2] shadow-none"
              >
                <CardContent className="flex h-full flex-col px-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0A211F] text-sm font-semibold text-[#E9F3E6]">
                        {review.profileImage ? (
                          <Image
                            src={review.profileImage}
                            alt={review.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        ) : (
                          <span>{review.name.charAt(0).toUpperCase()}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#0A211F]">{review.name}</p>
                        <p className="text-sm text-[#0A211F]/62">{review.timeAgo}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-end gap-2">
                      <Badge className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-medium text-[#0A211F] hover:bg-[#D8F782]">
                        {review.category}
                      </Badge>
                      <div className="inline-flex items-center gap-2 rounded-full border border-[#0A211F]/10 bg-[#F7F9F2] px-3 py-1 text-xs font-medium text-[#0A211F]">
                        <Image
                          src={COUNTRY_FLAG_IMAGES[review.flag]}
                          alt={`${review.country} flag`}
                          width={20}
                          height={14}
                          className="h-[14px] w-5 rounded-[2px] object-cover"
                        />
                        <span>{COUNTRY_LABELS[review.flag]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-sm text-[#0A211F]/62">
                    <span className="capitalize">{review.type} review</span>
                  </div>

                  {review.type === "audio" ? (
                    <div className="mt-5 rounded-[24px] bg-[#0A211F] p-5 text-[#E9F3E6]">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8F782] text-[#0A211F]">
                            <Play className="h-4 w-4 fill-current" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Audio feedback</p>
                            <p className="text-xs text-[#E9F3E6]/60">{review.duration} voice review</p>
                          </div>
                        </div>
                        <Headphones className="h-4 w-4 text-[#D8F782]" />
                      </div>

                      <div className="mt-5 flex h-10 items-end gap-1">
                        {review.waveform.map((barHeight, index) => (
                          <span
                            key={`${review.id}-${index}`}
                            className="w-full rounded-full bg-[#D8F782]/85"
                            style={{ height: `${barHeight}px` }}
                          />
                        ))}
                      </div>

                      <p className="mt-4 text-sm leading-7 text-[#E9F3E6]/78">{review.review}</p>
                    </div>
                  ) : (
                    <div className="mt-5 flex flex-1 flex-col rounded-[24px] bg-[#EDF6E8] px-5 py-5">
                      <Quote className="h-5 w-5 text-[#0A211F]/40" />
                      <p className="mt-4 flex-1 text-base leading-8 text-[#0A211F]/78">{review.review}</p>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#F4B400]">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={`${review.id}-star-${index}`} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm font-semibold text-[#0A211F]">{review.rating}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center pt-5 md:pt-10">
            <AnimatedButton href="/reviews" color="dark">
              View all reviews
            </AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
