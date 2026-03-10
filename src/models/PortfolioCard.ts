import { Model, Schema, model, models } from "mongoose";
import type { PortfolioCard } from "@/types";

const portfolioCardSchema = new Schema<PortfolioCard>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    category: {
      type: String,
      enum: ["Development", "Designing", "AI", "Marketing"],
      required: true,
    },
    href: {
      type: String,
      trim: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
    showOnHome: {
      type: Boolean,
      default: false,
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

const PortfolioCardModel =
  (models.PortfolioCard as Model<PortfolioCard>) ||
  model<PortfolioCard>("PortfolioCard", portfolioCardSchema);

export default PortfolioCardModel;
