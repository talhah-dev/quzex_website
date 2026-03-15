import { Model, Schema, model, models } from "mongoose";
import type { Testimonial } from "@/types";

const testimonialSchema = new Schema<Testimonial>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    flag: {
      type: String,
      required: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: String,
      enum: ["Development", "Redesign", "AI", "Marketing"],
      required: true,
    },
    rating: {
      type: String,
      required: true,
      trim: true,
    },
    timeAgo: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["text", "audio"],
      required: true,
    },
    review: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    audioUrl: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const TestimonialModel =
  (models.Testimonial as Model<Testimonial>) || model<Testimonial>("Testimonial", testimonialSchema);

export default TestimonialModel;
