"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Headphones, Pause, Play, Quote, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { COUNTRY_FLAG_IMAGES, COUNTRY_LABELS } from "@/lib/countries";
import { getTestimonials } from "@/lib/api/testimonials";
import { normalizeImageSrc } from "@/lib/normalize-image-src";
import { type TestimonialCategory } from "@/types";

const audioBars = [14, 26, 18, 32, 22, 28, 16, 30, 20, 24, 15, 27];

type TestimonialsProps = {
  showCta?: boolean;
  showIntro?: boolean;
};

const Testimonials = ({ showCta = true, showIntro = true }: TestimonialsProps) => {
  const [activeCategory, setActiveCategory] = useState<"All" | TestimonialCategory>("All");
  const [playingReviewId, setPlayingReviewId] = useState<string | null>(null);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});
  const {
    data: reviews = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: getTestimonials,
  });

  const categories = useMemo(
    () => ["All", ...new Set(reviews.map((item) => item.category))] as Array<"All" | TestimonialCategory>,
    [reviews]
  );

  const filteredReviews =
    activeCategory === "All" ? reviews : reviews.filter((item) => item.category === activeCategory);

  async function handleAudioToggle(reviewId: string) {
    const targetAudio = audioRefs.current[reviewId];

    if (!targetAudio) {
      return;
    }

    if (playingReviewId && playingReviewId !== reviewId) {
      const currentAudio = audioRefs.current[playingReviewId];

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    if (playingReviewId === reviewId && !targetAudio.paused) {
      targetAudio.pause();
      setPlayingReviewId(null);
      return;
    }

    try {
      await targetAudio.play();
      setPlayingReviewId(reviewId);
    } catch {
      setPlayingReviewId(null);
    }
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 xl:px-16">
        {showIntro ? (
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
        ) : null}

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

          {isLoading ? (
            <div className="rounded-[28px] border border-[#0A211F]/10 bg-[#F7F9F2] px-6 py-16 text-center text-sm text-[#0A211F]/62">
              Loading reviews...
            </div>
          ) : null}

          {isError ? (
            <div className="rounded-[28px] border border-[#e4b4b4] bg-[#fff5f5] px-6 py-16 text-center text-sm text-[#8a2d2d]">
              Unable to load reviews right now.
            </div>
          ) : null}

          {!isLoading && !isError && filteredReviews.length === 0 ? (
            <div className="rounded-[28px] border border-[#0A211F]/10 bg-[#F7F9F2] px-6 py-16 text-center text-sm text-[#0A211F]/62">
              No reviews are available for this category yet.
            </div>
          ) : null}

          {!isLoading && !isError && filteredReviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredReviews.map((review) => {
                const profileImageSrc = normalizeImageSrc(review.profileImage);
                const hasAudio = review.type === "audio" && Boolean(review.audioUrl);
                const isPlaying = playingReviewId === review._id;

                return (
                  <Card
                    key={review._id}
                    className="h-full rounded-[28px] border border-[#0A211F]/10 bg-[#F7F9F2] shadow-none"
                  >
                    <CardContent className="flex h-full flex-col px-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0A211F] text-sm font-semibold text-[#E9F3E6]">
                            {profileImageSrc ? (
                              <Image
                                src={profileImageSrc}
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
                            <p className="text-sm text-nowrap line-clamp-1 font-semibold text-[#0A211F]">{review.name}</p>
                            <p className="text-xs text-[#0A211F]/62 text-nowrap">{review.timeAgo}</p>
                          </div>
                        </div>

                        <div className="flex flex-col items-end justify-end gap-2">
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
                          <audio
                            ref={(element) => {
                              audioRefs.current[review._id] = element;
                            }}
                            src={review.audioUrl}
                            preload="none"
                            onPause={() => {
                              if (playingReviewId === review._id) {
                                setPlayingReviewId(null);
                              }
                            }}
                            onEnded={() => setPlayingReviewId(null)}
                            className="hidden"
                          />

                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => handleAudioToggle(review._id)}
                                disabled={!hasAudio}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#D8F782] text-[#0A211F] transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60"
                              >
                                {isPlaying ? (
                                  <Pause className="h-4 w-4 fill-current" />
                                ) : (
                                  <Play className="h-4 w-4 fill-current" />
                                )}
                              </button>
                              <div>
                                <p className="text-sm font-medium">Audio feedback</p>
                                <p className="text-xs text-[#E9F3E6]/60">
                                  {hasAudio
                                    ? isPlaying
                                      ? "Now playing"
                                      : "Tap to play audio"
                                    : "Audio unavailable"}
                                </p>
                              </div>
                            </div>
                            <Headphones className="h-4 w-4 text-[#D8F782]" />
                          </div>

                          <div className="mt-5 flex h-10 items-end gap-1">
                            {audioBars.map((barHeight, index) => (
                              <span
                                key={`${review._id}-${index}`}
                                className={`w-full origin-bottom rounded-full ${
                                  isPlaying ? "bg-[#D8F782]" : "bg-[#D8F782]/85"
                                }`}
                                style={{
                                  height: `${barHeight}px`,
                                  animation: isPlaying
                                    ? `testimonial-wave ${1.8 + (index % 4) * 0.18}s ease-in-out ${index * -0.12}s infinite`
                                    : undefined,
                                }}
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
                            <Star key={`${review._id}-star-${index}`} className="h-4 w-4 fill-current" />
                          ))}
                        </div>
                        <p className="text-sm font-semibold text-[#0A211F]">{review.rating}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : null}

          {showCta ? (
            <div className="flex justify-center pt-5 md:pt-10">
              <AnimatedButton href="/reviews" color="dark">
                View all reviews
              </AnimatedButton>
            </div>
          ) : null}
        </div>
      </div>
      <style jsx>{`
        @keyframes testimonial-wave {
          0%,
          100% {
            transform: scaleY(0.82);
          }

          50% {
            transform: scaleY(1.08);
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;


