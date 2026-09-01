import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
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
  type = "website",
  publishedTime,
  modifiedTime,
}: BuildPageMetadataOptions): Metadata {
  const canonical = path === "/" ? SITE_CONFIG.siteUrl : `${SITE_CONFIG.siteUrl}${path}`;
  const absoluteImage = image.startsWith("http") ? image : `${SITE_CONFIG.siteUrl}${image}`;

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
      siteName: "Quzex",
      type: type === "article" ? "article" : "website",
      images: [
        {
          url: absoluteImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImage],
      site: "@quzex",
    },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    name: "Quzex",
    url: SITE_CONFIG.siteUrl,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.siteUrl}/quzex.png`,
      width: 512,
      height: 512,
    },
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    description:
      "Quzex builds modern business websites, redesigns outdated websites, and delivers digital solutions focused on speed, clarity, and growth.",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.ownerName,
    },
    areaServed: "Worldwide",
    serviceType: [
      "Website Development",
      "Website Redesign",
      "Next.js Development",
      "AI Integration",
      "Social Media Management",
    ],
    sameAs: [
      "https://facebook.com/quzex",
      "https://instagram.com/quzex",
      "https://linkedin.com/company/quzex",
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.siteUrl}/#website`,
    url: SITE_CONFIG.siteUrl,
    name: "Quzex",
    description:
      "Professional website development agency building fast, modern websites and digital solutions for businesses worldwide.",
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_CONFIG.siteUrl}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
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

export function buildArticleSchema({
  title,
  description,
  slug,
  image,
  publishedAt,
  updatedAt,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt?: string;
  updatedAt?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_CONFIG.siteUrl}/blog/${slug}`,
    headline: title,
    description,
    image,
    url: `${SITE_CONFIG.siteUrl}/blog/${slug}`,
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    author: {
      "@type": "Organization",
      name: "Quzex",
      url: SITE_CONFIG.siteUrl,
    },
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    inLanguage: "en",
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_CONFIG.siteUrl}/blog`,
      name: "Quzex Blog",
    },
  };
}

export function buildAggregateRatingSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    name: "Quzex",
    url: SITE_CONFIG.siteUrl,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
      ratingCount: "20",
      reviewCount: "20",
    },
  };
}

export function buildServicePageSchema() {
  const services = [
    {
      name: "Custom Website Development",
      description:
        "We build fast, modern websites from scratch using Next.js and React — tailored to your business goals and optimised for performance.",
    },
    {
      name: "Website Redesign",
      description:
        "We redesign outdated websites to improve visual design, user experience, performance, and conversion rates.",
    },
    {
      name: "AI Integration",
      description:
        "We integrate AI tools — including chatbots, content generation, and automation — into websites and business workflows.",
    },
    {
      name: "Social Media Management",
      description:
        "We manage and grow social media presence for businesses through strategic content creation and consistent posting.",
    },
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Quzex Web Development Services",
    url: `${SITE_CONFIG.siteUrl}/services`,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: {
          "@id": `${SITE_CONFIG.siteUrl}/#organization`,
        },
      },
    })),
  };
}

export function stringifyJsonLd(value: unknown) {
  return JSON.stringify(value);
}
