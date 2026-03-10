export type SiteSettings = {
  ownerName: string;
  email: string;
  phone: string;
  phoneE164?: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  facebook: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type SiteSettingsRecord = SiteSettings & {
  _id: string;
};

export type UpsertSiteSettingsPayload = Pick<
  SiteSettings,
  | "ownerName"
  | "email"
  | "phone"
  | "phoneE164"
  | "whatsapp"
  | "instagram"
  | "linkedin"
  | "facebook"
>;
