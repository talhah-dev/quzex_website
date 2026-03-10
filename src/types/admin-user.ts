export type AdminUserRole = "admin";

export type AdminUser = {
  email: string;
  passwordHash: string;
  role: AdminUserRole;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type AdminUserRecord = AdminUser & {
  _id: string;
};

export type CreateAdminPayload = {
  email: string;
  password: string;
  role?: AdminUserRole;
};

export type LoginAdminPayload = {
  email: string;
  password: string;
};
