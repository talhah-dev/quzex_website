export type ServicePricingPlan = {
  name: string;
  price: number;
  description: string;
  deliveryTime?: string;
  features: string[];
  isRecommended?: boolean;
};

export type Service = {
  slug: string;
  title: string;
  image: string;
  category: string;
  duration: string;
  description: string;
  longDescription?: string;
  overviewTitle?: string;
  deliveryLabel?: string;
  highlights: string[];
  nextStepTitle?: string;
  nextStepDescription?: string;
  pricingHeading?: string;
  pricingDescription?: string;
  pricingPlans: ServicePricingPlan[];
  isActive?: boolean;
  showOnServicesPage?: boolean;
  priority?: number;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type ServiceRecord = Service & {
  _id: string;
};

export type CreateServicePayload = {
  slug: string;
  title: string;
  image: string;
  category: string;
  duration: string;
  description: string;
  longDescription?: string;
  highlights: string[];
  pricingHeading?: string;
  pricingDescription?: string;
  pricingPlans: ServicePricingPlan[];
  showOnServicesPage?: boolean;
  priority?: number;
};

export type UpdateServicePayload = CreateServicePayload & {
  id: string;
};
