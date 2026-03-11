import { Model, Schema, model, models } from "mongoose";
import type { Service } from "@/types";

const servicePricingPlanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    deliveryTime: {
      type: String,
      trim: true,
    },
    features: {
      type: [String],
      default: [],
    },
    isRecommended: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const serviceSchema = new Schema<Service>(
  {
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
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
    category: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      trim: true,
    },
    overviewTitle: {
      type: String,
      trim: true,
    },
    deliveryLabel: {
      type: String,
      trim: true,
    },
    highlights: {
      type: [String],
      default: [],
    },
    nextStepTitle: {
      type: String,
      trim: true,
    },
    nextStepDescription: {
      type: String,
      trim: true,
    },
    pricingHeading: {
      type: String,
      trim: true,
    },
    pricingDescription: {
      type: String,
      trim: true,
    },
    pricingPlans: {
      type: [servicePricingPlanSchema],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    showOnServicesPage: {
      type: Boolean,
      default: true,
    },
    priority: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const ServiceModel =
  (models.Service as Model<Service>) || model<Service>("Service", serviceSchema);

export default ServiceModel;
