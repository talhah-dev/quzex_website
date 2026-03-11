import axios from "axios";
import type { SiteSettingsRecord, UpsertSiteSettingsPayload } from "@/types";

type SiteSettingsResponse = {
  success: boolean;
  message?: string;
  data?: SiteSettingsRecord | UpsertSiteSettingsPayload | null;
};

export async function getAdminSettings() {
  const response = await axios.get<SiteSettingsResponse>("/api/admin/settings");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load website settings");
  }

  return response.data.data ?? null;
}

export async function updateAdminSettings(payload: UpsertSiteSettingsPayload) {
  const response = await axios.put<SiteSettingsResponse>("/api/admin/settings", payload);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to update website settings");
  }

  return response.data;
}

export async function getPublicSettings() {
  const response = await axios.get<SiteSettingsResponse>("/api/users/settings");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load website settings");
  }

  return response.data.data ?? null;
}
