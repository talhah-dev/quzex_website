import type { CountryCode } from "@/lib/countries";

export type TestimonialCategory = "Development" | "Redesign" | "AI" | "Marketing";

export type TestimonialType = "text" | "audio";

export type Testimonial = {
  name: string;
  country: string;
  flag: CountryCode;
  category: TestimonialCategory;
  rating: string;
  timeAgo: string;
  type: TestimonialType;
  review: string;
  profileImage?: string;
  audioUrl?: string;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type TestimonialRecord = Testimonial & {
  _id: string;
};

export type CreateTestimonialPayload = Pick<
  Testimonial,
  "name" | "country" | "flag" | "category" | "rating" | "timeAgo" | "type" | "review" | "profileImage" | "audioUrl"
>;

export type UpdateTestimonialPayload = CreateTestimonialPayload & {
  id: string;
};
