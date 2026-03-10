import { Model, Schema, model, models } from "mongoose";
import type { AdminUser } from "@/types";

const adminUserSchema = new Schema<AdminUser>(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AdminUserModel =
  (models.AdminUser as Model<AdminUser>) ||
  model<AdminUser>("AdminUser", adminUserSchema);

export default AdminUserModel;
