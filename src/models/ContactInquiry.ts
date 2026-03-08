import { Model, Schema, model, models } from "mongoose";
import type { ContactInquiry } from "@/types";

const contactInquirySchema = new Schema<ContactInquiry>(
  {
    name: {
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
    service: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "reviewed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

const ContactInquiryModel =
  (models.ContactInquiry as Model<ContactInquiry>) ||
  model<ContactInquiry>("ContactInquiry", contactInquirySchema);

export default ContactInquiryModel;
