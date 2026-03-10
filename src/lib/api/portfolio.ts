import axios from "axios";
import type {
  CreatePortfolioCardPayload,
  PortfolioCardRecord,
  UpdatePortfolioCardPayload,
} from "@/types";

type PortfolioCardResponse = {
  success: boolean;
  message?: string;
  data?: PortfolioCardRecord;
};

type PortfolioCardListResponse = {
  success: boolean;
  message?: string;
  data?: {
    items: PortfolioCardRecord[];
    categories: string[];
  };
};

export async function createPortfolioCard(payload: CreatePortfolioCardPayload) {
  const response = await axios.post<PortfolioCardResponse>("/api/admin/portfolio", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to create portfolio card");
  }

  return response.data;
}

export async function deletePortfolioCard(id: string) {
  const response = await axios.delete<PortfolioCardResponse>(`/api/admin/portfolio/${id}`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to delete portfolio card");
  }

  return response.data;
}

export async function getAdminPortfolioCard(id: string) {
  const response = await axios.get<PortfolioCardResponse>(`/api/admin/portfolio/${id}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load portfolio card");
  }

  return response.data.data;
}

export async function updatePortfolioCard(payload: UpdatePortfolioCardPayload) {
  const response = await axios.patch<PortfolioCardResponse>(
    `/api/admin/portfolio/${payload.id}`,
    {
      title: payload.title,
      image: payload.image,
      tags: payload.tags,
      category: payload.category,
      href: payload.href,
      priority: payload.priority,
      showOnHome: payload.showOnHome,
    }
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to update portfolio card");
  }

  return response.data;
}

export async function getPortfolioCards(category?: string) {
  const response = await axios.get<PortfolioCardListResponse>(
    category
      ? `/api/users/portfolio/${encodeURIComponent(category)}`
      : "/api/users/portfolio"
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load portfolio cards");
  }

  return response.data.data ?? {
    items: [],
    categories: [],
  };
}
