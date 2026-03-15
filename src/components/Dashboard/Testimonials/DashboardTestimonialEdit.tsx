"use client";

import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, type ChangeEvent } from "react";
import { ArrowLeft, Headphones, ImagePlus, PencilLine, Quote, Star } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COUNTRY_FLAG_IMAGES,
  COUNTRY_LABELS,
  COUNTRY_OPTIONS,
  type CountryCode,
} from "@/lib/countries";
import { getAdminTestimonial, updateTestimonial } from "@/lib/api/testimonials";
import { uploadFile } from "@/lib/api/upload";
import { normalizeImageSrc } from "@/lib/normalize-image-src";
import { type TestimonialCategory, type UpdateTestimonialPayload } from "@/types";

const reviewCategories: TestimonialCategory[] = ["Development", "Redesign", "AI", "Marketing"];

type DashboardTestimonialEditProps = {
  testimonialId: string;
};

export default function DashboardTestimonialEdit({
  testimonialId,
}: DashboardTestimonialEditProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [timeAgo, setTimeAgo] = useState("");
  const [country, setCountry] = useState<CountryCode>("US");
  const [category, setCategory] = useState<TestimonialCategory>("Development");
  const [rating, setRating] = useState("5.0");
  const [reviewType, setReviewType] = useState<"text" | "audio">("text");
  const [reviewText, setReviewText] = useState("");
  const [imageMode, setImageMode] = useState<"upload" | "url">("url");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [currentAudioUrl, setCurrentAudioUrl] = useState("");
  const [initialized, setInitialized] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["testimonial", testimonialId],
    queryFn: () => getAdminTestimonial(testimonialId),
  });

  if (data && !initialized) {
    setName(data.name || "");
    setTimeAgo(data.timeAgo || "");
    setCountry(data.flag || "US");
    setCategory(data.category || "Development");
    setRating(data.rating || "5.0");
    setReviewType(data.type || "text");
    setReviewText(data.review || "");
    setImageUrl(data.profileImage || "");
    setCurrentAudioUrl(data.audioUrl || "");
    setInitialized(true);
  }
  const hasAudio = reviewType === "audio" ? Boolean(audioFile || currentAudioUrl) : true;
  const isFormValid =
    Boolean(name.trim()) &&
    Boolean(timeAgo.trim()) &&
    Boolean(rating.trim()) &&
    Boolean(reviewText.trim()) &&
    hasAudio;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setImageFile(file);
  }

  function handleAudioFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setAudioFile(file);
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      let finalProfileImage = imageUrl.trim();
      let finalAudioUrl = currentAudioUrl.trim();

      if (imageMode === "upload" && imageFile) {
        const uploadedImage = await uploadFile({
          file: imageFile,
          folder: "testimonials/profile-images",
        });

        finalProfileImage = uploadedImage.url;
      }

      if (reviewType === "audio" && audioFile) {
        const uploadedAudio = await uploadFile({
          file: audioFile,
          folder: "testimonials/audio",
        });

        finalAudioUrl = uploadedAudio.url;
      }

      if (reviewType === "audio" && !finalAudioUrl) {
        throw new Error("Please upload an audio file.");
      }

      const payload: UpdateTestimonialPayload = {
        id: testimonialId,
        name: name.trim(),
        country: COUNTRY_LABELS[country],
        flag: country,
        category,
        rating: rating.trim(),
        timeAgo: timeAgo.trim(),
        type: reviewType,
        review: reviewText.trim(),
        profileImage: finalProfileImage || undefined,
        audioUrl: reviewType === "audio" ? finalAudioUrl : undefined,
      };

      return updateTestimonial(payload);
    },
    onSuccess: (response) => {
      toast.success(response.message || "Review updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonial", testimonialId] });
      router.push("/dashboard/testimonials");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Unable to update review.");
    },
  });

  if (isLoading || !initialized) {
    return (
      <div className="rounded-xl border border-[#0A211F]/10 bg-white p-6 text-sm text-[#0A211F]/62 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Loading review details...
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-[#C24141]/15 bg-[#FFF5F5] p-6 text-sm text-[#C24141] shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        Unable to load this review right now.
      </div>
    );
  }

  const previewImageSrc = normalizeImageSrc(imageMode === "url" ? imageUrl : "");

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <Button
              asChild
              variant="outline"
              className="w-fit border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/testimonials">
                <ArrowLeft className="size-4" />
                Back to Testimonials
              </Link>
            </Button>

            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Edit Review
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Update testimonial
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Edit the reviewer details, media, and content that appear in your testimonials.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="reviewer-name">Client name</Label>
              <Input id="reviewer-name" value={name} onChange={(event) => setName(event.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="review-time">Review time</Label>
              <Input id="review-time" value={timeAgo} onChange={(event) => setTimeAgo(event.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="review-rating">Rating</Label>
              <Input id="review-rating" value={rating} onChange={(event) => setRating(event.target.value)} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="review-country">Country</Label>
              <Select value={country} onValueChange={(value) => setCountry(value as CountryCode)}>
                <SelectTrigger
                  id="review-country"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  {COUNTRY_OPTIONS.map((item) => (
                    <SelectItem key={item.code} value={item.code}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="review-category">Category</Label>
              <Select value={category} onValueChange={(value) => setCategory(value as TestimonialCategory)}>
                <SelectTrigger
                  id="review-category"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  {reviewCategories.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <Label htmlFor="review-upload">Profile image</Label>
                <p className="text-xs text-[#0A211F]/58">
                  Keep the current profile image URL or switch to upload a new one.
                </p>
              </div>

              <div className="inline-flex rounded-xl border border-[#0A211F]/10 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    imageMode === "upload"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Upload Image
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                    imageMode === "url"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Use Image URL
                </button>
              </div>
            </div>

            {imageMode === "upload" ? (
              <label
                htmlFor="review-upload"
                className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-white px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
              >
                <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                  <ImagePlus className="size-5" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-[#0A211F]">Upload profile image</p>
                  <p className="text-xs text-[#0A211F]/58">
                    Add a new client profile image if you want to replace the current one.
                  </p>
                  {imageFile ? <p className="text-xs font-medium text-[#0A211F]">{imageFile.name}</p> : null}
                </div>
                <input
                  id="review-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="review-image-url">Profile image URL</Label>
                <Input id="review-image-url" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
              </div>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="review-type">Review type</Label>
              <Select value={reviewType} onValueChange={(value) => setReviewType(value as "text" | "audio")}>
                <SelectTrigger
                  id="review-type"
                  className="h-11 w-full rounded-xl border-[#0A211F]/12 bg-white text-[#0A211F]"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent className="border-[#0A211F]/10 bg-white">
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {reviewType === "audio" ? (
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="review-audio-upload">Audio file</Label>
                <label
                  htmlFor="review-audio-upload"
                  className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-[#0A211F]/18 bg-[#f7f9f2] px-4 py-10 text-center transition-colors hover:border-[#0A211F]/28 hover:bg-[#EDF6E8]"
                >
                  <div className="inline-flex rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                    <Headphones className="size-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#0A211F]">Upload the audio here</p>
                    <p className="text-xs text-[#0A211F]/58">
                      Add a new audio file if you want to replace the current review audio.
                    </p>
                    {audioFile ? (
                      <p className="text-xs font-medium text-[#0A211F]">{audioFile.name}</p>
                    ) : currentAudioUrl ? (
                      <p className="text-xs font-medium text-[#0A211F]">Current audio is already connected</p>
                    ) : null}
                  </div>
                  <input
                    id="review-audio-upload"
                    type="file"
                    accept="audio/*"
                    className="hidden"
                    onChange={handleAudioFileChange}
                  />
                </label>
              </div>
            ) : null}

            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="review-text">Review content</Label>
              <textarea
                id="review-text"
                rows={6}
                value={reviewText}
                onChange={(event) => setReviewText(event.target.value)}
                className="min-h-32 rounded-xl border border-[#0A211F]/12 bg-white px-3 py-3 text-sm text-[#0A211F] outline-none transition-[border-color,box-shadow] placeholder:text-[#0A211F]/40 focus:border-[#0A211F]/28 focus:ring-4 focus:ring-[#0A211F]/6"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 border-t border-[#0A211F]/10 pt-5">
            <Button
              type="button"
              disabled={isPending || !isFormValid}
              onClick={() => mutate()}
              className="rounded-xl bg-[#0A211F] px-5 text-[#E9F3E6] hover:bg-[#143531] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <PencilLine className="size-4" />
              {isPending ? "Saving..." : "Update Review"}
            </Button>
            <Button
              asChild
              type="button"
              variant="outline"
              className="rounded-xl border-[#0A211F]/12 text-[#0A211F] hover:bg-[#EDF6E8]"
            >
              <Link href="/dashboard/testimonials">Cancel</Link>
            </Button>
          </div>
        </div>
      </section>

      <aside className="grid gap-6 self-start">
        <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-[#081917] p-5 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.45)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D8F782]/72">
                Review Preview
              </p>
              <p className="mt-1 text-sm text-[#E9F3E6]/60">How this testimonial can appear on your website</p>
            </div>
            <div className="flex items-center gap-1 text-[#F4B400]">
              <Star className="size-4 fill-current" />
              <span className="text-sm font-semibold text-[#E9F3E6]">{rating || "5.0"}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0F2422] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-[#0A211F]">
                  {previewImageSrc ? (
                    <Image src={previewImageSrc} alt={name} fill sizes="48px" className="object-cover" unoptimized />
                  ) : imageFile ? (
                    <div className="flex h-full w-full items-center justify-center text-[10px] font-medium text-[#E9F3E6]">
                      IMG
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-[#E9F3E6]">
                      {name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#E9F3E6]">{name}</p>
                  <p className="text-sm text-[#E9F3E6]/62">{timeAgo}</p>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#0A211F] px-3 py-1 text-xs font-medium text-[#E9F3E6]">
                <Image
                  src={COUNTRY_FLAG_IMAGES[country]}
                  alt={`${COUNTRY_LABELS[country]} flag`}
                  width={20}
                  height={14}
                  className="h-[14px] w-5 rounded-[2px] object-cover"
                />
                <span>{COUNTRY_LABELS[country]}</span>
              </div>
            </div>

            <div className="mt-4 inline-flex rounded-full bg-[#D8F782] px-3 py-1 text-xs font-medium text-[#0A211F]">
              {category}
            </div>

            {reviewType === "audio" ? (
              <div className="mt-4 rounded-2xl bg-[#0A211F] p-4 text-[#E9F3E6]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8F782] text-[#0A211F]">
                      <Headphones className="size-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Audio review</p>
                      <p className="text-xs text-[#E9F3E6]/60">
                        {audioFile
                          ? audioFile.name
                          : currentAudioUrl
                            ? "Current audio file is connected"
                            : "Audio file will appear here"}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-[#E9F3E6]/78">{reviewText}</p>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl bg-[#EDF6E8] p-4">
                <Quote className="h-5 w-5 text-[#0A211F]/40" />
                <p className="mt-3 text-sm leading-7 text-[#0A211F]/72">{reviewText}</p>
              </div>
            )}
          </div>
        </section>
      </aside>
    </div>
  );
}

