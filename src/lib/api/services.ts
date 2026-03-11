import axios from "axios";
import type { CreateServicePayload, ServiceRecord, UpdateServicePayload } from "@/types";

type CreateServiceResponse = {
  success: boolean;
  message?: string;
  data?: ServiceRecord;
};

type GetServicesResponse = {
  success: boolean;
  message?: string;
  data?: ServiceRecord[];
};

type DeleteServiceResponse = {
  success: boolean;
  message?: string;
};

export async function createService(payload: CreateServicePayload) {
  const response = await axios.post<CreateServiceResponse>("/api/admin/services", payload);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to create service");
  }

  return response.data;
}

export async function getServices() {
  const response = await axios.get<GetServicesResponse>("/api/users/services");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to load services");
  }

  return response.data.data ?? [];
}

export async function deleteService(serviceId: string) {
  const response = await axios.delete<DeleteServiceResponse>(`/api/admin/services/${serviceId}`);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to delete service");
  }

  return response.data;
}

export async function getAdminService(serviceId: string) {
  const response = await axios.get<CreateServiceResponse>(`/api/admin/services/${serviceId}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load service");
  }

  return response.data.data;
}

export async function updateService(payload: UpdateServicePayload) {
  const response = await axios.patch<CreateServiceResponse>(
    `/api/admin/services/${payload.id}`,
    {
      slug: payload.slug,
      title: payload.title,
      image: payload.image,
      category: payload.category,
      duration: payload.duration,
      description: payload.description,
      longDescription: payload.longDescription,
      highlights: payload.highlights,
      pricingHeading: payload.pricingHeading,
      pricingDescription: payload.pricingDescription,
      pricingPlans: payload.pricingPlans,
      showOnServicesPage: payload.showOnServicesPage,
      priority: payload.priority,
    }
  );

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to update service");
  }

  return response.data;
}
