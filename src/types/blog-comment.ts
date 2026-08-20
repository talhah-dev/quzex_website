import { Types } from "mongoose";

export type BlogComment = {
  blogId: Types.ObjectId | string;
  name: string;
  email: string;
  comment: string;
  isActive: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type BlogCommentRecord = BlogComment & {
  _id: string;
};
