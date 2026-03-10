import axios from "axios";
import type {
  ContactInquiryRecord,
  ContactInquiryStatus,
  CreateContactInquiryPayload,
} from "@/types";

type CreateContactResponse = {
    success: boolean;
    message?: string;
    data?: {
        id: string;
        status: string;
    };
};

type GetInquiriesResponse = {
    success: boolean;
    message?: string;
    data?: ContactInquiryRecord[];
};

export async function createContact(payload: CreateContactInquiryPayload) {
    const res = await axios.post<CreateContactResponse>("/api/users/contact", payload);

    if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to create contact");
    }

    return res.data;
}

export async function getAdminInquiries() {
    const res = await axios.get<GetInquiriesResponse>("/api/admin/inquiries");

    if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to load enquiries");
    }

    return res.data.data ?? [];
}

export async function updateInquiryStatus(id: string, status: ContactInquiryStatus) {
    const res = await axios.patch<CreateContactResponse>(`/api/admin/inquiries/${id}`, {
        status,
    });

    if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to update inquiry");
    }

    return res.data;
}

export async function deleteInquiry(id: string) {
    const res = await axios.delete<CreateContactResponse>(`/api/admin/inquiries/${id}`);

    if (!res.data?.success) {
        throw new Error(res.data?.message || "Failed to delete inquiry");
    }

    return res.data;
}
