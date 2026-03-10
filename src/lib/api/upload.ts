import axios from "axios";
import type { UploadFilePayload, UploadFileResponseData } from "@/types";

type UploadResponse = {
  success: boolean;
  message?: string;
  data?: UploadFileResponseData;
};

export async function uploadFile(payload: UploadFilePayload) {
  const formData = new FormData();
  formData.append("file", payload.file);

  if (payload.folder) {
    formData.append("folder", payload.folder);
  }

  const response = await axios.post<UploadResponse>("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to upload file");
  }

  return response.data.data;
}
