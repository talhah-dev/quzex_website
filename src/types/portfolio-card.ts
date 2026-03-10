export type PortfolioCardCategory = "Development" | "Designing" | "AI" | "Marketing";

export type PortfolioCard = {
  title: string;
  image: string;
  tags: string[];
  category: PortfolioCardCategory;
  href?: string;
  priority?: number;
  showOnHome?: boolean;
  isActive?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type PortfolioCardRecord = PortfolioCard & {
  _id: string;
};

export type CreatePortfolioCardPayload = Pick<
  PortfolioCard,
  "title" | "image" | "tags" | "category" | "href" | "priority" | "showOnHome"
>;

export type UpdatePortfolioCardPayload = CreatePortfolioCardPayload & {
  id: string;
};
