import axios from "axios";
import type { BlogRecord, CreateBlogPayload, UpdateBlogPayload } from "@/types";

type BlogResponse = {
  success: boolean;
  message?: string;
  data?: BlogRecord;
};

type BlogListResponse = {
  success: boolean;
  message?: string;
  data?: BlogRecord[];
};

type DeleteBlogResponse = {
  success: boolean;
  message?: string;
};

// ─── Public (frontend) ────────────────────────────────────────────────────────

export async function getPublicBlogs() {
  const response = await axios.get<BlogListResponse>("/api/users/blogs");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load blog posts");
  }

  return response.data.data ?? [];
}

export async function getPublicBlogBySlug(slug: string) {
  const response = await axios.get<BlogResponse>(`/api/users/blogs/${slug}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load blog post");
  }

  return response.data.data;
}

// ─── Admin (dashboard) ────────────────────────────────────────────────────────

export async function getAdminBlogs() {
  const response = await axios.get<BlogListResponse>("/api/admin/blogs");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load blog posts");
  }

  return response.data.data ?? [];
}

export async function getAdminBlogById(id: string) {
  const response = await axios.get<BlogResponse>(`/api/admin/blogs/${id}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load blog post");
  }

  return response.data.data;
}

export async function createBlog(payload: CreateBlogPayload) {
  const response = await axios.post<BlogResponse>("/api/admin/blogs", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to create blog post");
  }

  return response.data;
}

export async function updateBlog(payload: UpdateBlogPayload) {
  const response = await axios.patch<BlogResponse>(`/api/admin/blogs/${payload.id}`, {
    title: payload.title,
    slug: payload.slug,
    category: payload.category,
    image: payload.image,
    excerpt: payload.excerpt,
    content: payload.content,
    isActive: payload.isActive,
    seo: payload.seo,
  });

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to update blog post");
  }

  return response.data;
}

export async function deleteBlog(id: string) {
  const response = await axios.delete<DeleteBlogResponse>(`/api/admin/blogs/${id}`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to delete blog post");
  }

  return response.data;
}
