import { Model, Schema, model, models } from "mongoose";
import type { Blog } from "@/types";

const blogSeoSchema = new Schema(
  {
    metaTitle: { type: String, trim: true },
    metaDescription: { type: String, trim: true },
    canonicalUrl: { type: String, trim: true },
    focusKeyword: { type: String, trim: true },
    ogTitle: { type: String, trim: true },
    ogDescription: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    twitterTitle: { type: String, trim: true },
    twitterDescription: { type: String, trim: true },
  },
  { _id: false }
);

const blogSchema = new Schema<Blog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    seo: {
      type: blogSeoSchema,
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

const BlogModel = (models.Blog as Model<Blog>) || model<Blog>("Blog", blogSchema);

export default BlogModel;
