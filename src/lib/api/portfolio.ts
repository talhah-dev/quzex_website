import axios from "axios";
import type {
  CreatePortfolioCardPayload,
  PortfolioCardRecord,
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
