import { Model, Schema, model, models } from "mongoose";
import type { ClientLogo } from "@/types";

const clientLogoSchema = new Schema<ClientLogo>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    src: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ClientLogoModel =
  (models.ClientLogo as Model<ClientLogo>) ||
  model<ClientLogo>("ClientLogo", clientLogoSchema);

export default ClientLogoModel;
