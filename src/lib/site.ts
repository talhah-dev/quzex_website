export const SITE_CONFIG = {
  name: "quzex",
  primaryDomain: "quzex.co",
  ownerName: "Muhammad Talha",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://quzex.co",
  email: "quzex@gmail.com",
  phone: "+92 315 2666263",
  phoneE164: "+923152666263",
} as const;

export const SITE_LINKS = {
  mailto: `mailto:${SITE_CONFIG.email}`,
  tel: `tel:${SITE_CONFIG.phoneE164}`,
  whatsapp: `https://wa.me/${SITE_CONFIG.phoneE164.replace("+", "")}`,
  instagram: "#",
  linkedin: "#",
  facebook: "#",
} as const;
