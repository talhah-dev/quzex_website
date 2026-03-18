import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

type BreadcrumbItem = {
  name: string;
  path: string;
};

const DEFAULT_SOCIAL_IMAGE = "/22.png";

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_SOCIAL_IMAGE,
  keywords = [],
}: BuildPageMetadataOptions): Metadata {
  const canonical = path === "/" ? SITE_CONFIG.siteUrl : `${SITE_CONFIG.siteUrl}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [
        {
          url: image,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/quzex.png`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path === "/" ? SITE_CONFIG.siteUrl : `${SITE_CONFIG.siteUrl}${item.path}`,
    })),
  };
}

export function stringifyJsonLd(value: unknown) {
  return JSON.stringify(value);
}
