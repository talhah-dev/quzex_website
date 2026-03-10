import { Model, Schema, model, models } from "mongoose";
import type { SiteSettings } from "@/types";

const siteSettingsSchema = new Schema<SiteSettings>(
  {
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    phoneE164: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      required: true,
      trim: true,
    },
    instagram: {
      type: String,
      required: true,
      trim: true,
    },
    linkedin: {
      type: String,
      required: true,
      trim: true,
    },
    facebook: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const SiteSettingsModel =
  (models.SiteSettings as Model<SiteSettings>) ||
  model<SiteSettings>("SiteSettings", siteSettingsSchema);

export default SiteSettingsModel;
