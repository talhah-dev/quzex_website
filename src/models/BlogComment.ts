import { Model, Schema, model, models } from "mongoose";
import type { BlogComment } from "@/types";

const blogCommentSchema = new Schema<BlogComment>(
  {
    blogId: {
      type: Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
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
    comment: {
      type: String,
      required: true,
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

const BlogCommentModel =
  (models.BlogComment as Model<BlogComment>) ||
  model<BlogComment>("BlogComment", blogCommentSchema);

export default BlogCommentModel;
