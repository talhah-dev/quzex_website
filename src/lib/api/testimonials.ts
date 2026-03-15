import axios from "axios";
import type {
  CreateTestimonialPayload,
  TestimonialRecord,
  UpdateTestimonialPayload,
} from "@/types";

type TestimonialResponse = {
  success: boolean;
  message?: string;
  data?: TestimonialRecord;
};

type TestimonialListResponse = {
  success: boolean;
  message?: string;
  data?: TestimonialRecord[];
};

type DeleteTestimonialResponse = {
  success: boolean;
  message?: string;
};

export async function createTestimonial(payload: CreateTestimonialPayload) {
  const response = await axios.post<TestimonialResponse>("/api/admin/testimonials", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to create review");
  }

  return response.data;
}

export async function getTestimonials() {
  const response = await axios.get<TestimonialListResponse>("/api/users/testimonials");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load reviews");
  }

  return response.data.data ?? [];
}

export async function deleteTestimonial(testimonialId: string) {
  const response = await axios.delete<DeleteTestimonialResponse>(
    `/api/admin/testimonials/${testimonialId}`
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to delete review");
  }

  return response.data;
}

export async function getAdminTestimonial(testimonialId: string) {
  const response = await axios.get<TestimonialResponse>(`/api/admin/testimonials/${testimonialId}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load review");
  }

  return response.data.data;
}

export async function updateTestimonial(payload: UpdateTestimonialPayload) {
  const response = await axios.patch<TestimonialResponse>(
    `/api/admin/testimonials/${payload.id}`,
    {
      name: payload.name,
      country: payload.country,
      flag: payload.flag,
      category: payload.category,
      rating: payload.rating,
      timeAgo: payload.timeAgo,
      type: payload.type,
      review: payload.review,
      profileImage: payload.profileImage,
      audioUrl: payload.audioUrl,
    }
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to update review");
  }

  return response.data;
}
