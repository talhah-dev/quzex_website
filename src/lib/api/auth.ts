import axios from "axios";
import type { CreateAdminPayload, LoginAdminPayload } from "@/types";

type SignupAdminResponse = {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    email: string;
    role: string;
  };
};

type LoginAdminResponse = {
  success: boolean;
  message?: string;
  data?: {
    _id: string;
    email: string;
    role: string;
  };
};

type LogoutAdminResponse = {
  success: boolean;
  message?: string;
};

export async function signupAdmin(payload: CreateAdminPayload) {
  const response = await axios.post<SignupAdminResponse>("/api/admin/auth/signup", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to create admin");
  }

  return response.data;
}

export async function loginAdmin(payload: LoginAdminPayload) {
  const response = await axios.post<LoginAdminResponse>("/api/admin/auth/login", payload);

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to login");
  }

  return response.data;
}

export async function logoutAdmin() {
  const response = await axios.post<LogoutAdminResponse>("/api/admin/auth/logout");

  if (!response.data?.success) {
    throw new Error(response.data?.message || "Failed to logout");
  }

  return response.data;
}
