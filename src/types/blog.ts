export type BlogSeo = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeyword?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
};

export type Blog = {
  title: string;
  slug: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  isActive: boolean;
  seo?: BlogSeo;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type BlogRecord = Blog & {
  _id: string;
};

export type CreateBlogPayload = Pick<
  Blog,
  "title" | "slug" | "category" | "image" | "excerpt" | "content"
> & {
  isActive?: boolean;
  seo?: BlogSeo;
};

export type UpdateBlogPayload = CreateBlogPayload & {
  id: string;
};