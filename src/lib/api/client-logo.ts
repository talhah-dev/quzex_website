import axios from "axios";
import type {
  ClientLogoListItem,
  ClientLogoRecord,
  CreateClientLogoPayload,
  UpdateClientLogoPayload,
} from "@/types";

type ClientLogoResponse = {
  success: boolean;
  message?: string;
  data?: ClientLogoRecord;
};

type ClientLogoListResponse = {
  success: boolean;
  message?: string;
  data?: ClientLogoRecord[];
};

type PublicClientLogoListResponse = {
  success: boolean;
  message?: string;
  data?: ClientLogoListItem[];
};

export async function createClientLogo(payload: CreateClientLogoPayload) {
  const response = await axios.post<ClientLogoResponse>("/api/admin/client-logos", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to create client logo");
  }

  return response.data;
}

export async function updateClientLogo(payload: UpdateClientLogoPayload) {
  const response = await axios.patch<ClientLogoResponse>(
    `/api/admin/client-logos/${payload.id}`,
    {
      name: payload.name,
      url: payload.url,
    }
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to update client logo");
  }

  return response.data;
}

export async function deleteClientLogo(id: string) {
  const response = await axios.delete<ClientLogoResponse>(`/api/admin/client-logos/${id}`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to delete client logo");
  }

  return response.data;
}

export async function getAdminClientLogos() {
  const response = await axios.get<ClientLogoListResponse>("/api/admin/client-logos");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load client logos");
  }

  return response.data.data ?? [];
}

export async function getClientLogos() {
  const response = await axios.get<PublicClientLogoListResponse>("/api/users/client-logos");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load client logos");
  }

  return response.data.data ?? [];
}
