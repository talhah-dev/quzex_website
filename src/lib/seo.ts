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
  const absoluteImage = image.startsWith("http") ? image : `${SITE_CONFIG.siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

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
    alternateName: "Quzex Web Development Agency",
    url: SITE_CONFIG.siteUrl,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_CONFIG.siteUrl}/#logo`,
      url: `${SITE_CONFIG.siteUrl}/quzex.png`,
      caption: "Quzex Logo",
      width: 512,
      height: 512,
    },
    image: `${SITE_CONFIG.siteUrl}/22.png`,
    email: SITE_CONFIG.email,
    telephone: SITE_CONFIG.phone,
    priceRange: "$$",
    currenciesAccepted: "USD, PKR",
    paymentAccepted: "Wire Transfer, Credit Card, Online",
    foundingDate: "2024",
    description:
      "Quzex is a premier web development and software engineering agency in Pakistan, serving businesses in Karachi, Lahore, and worldwide with modern Next.js websites, full-stack applications, website redesigns, and AI integrations.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "PK",
      addressRegion: "Sindh",
      addressLocality: "Karachi",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: SITE_CONFIG.phone,
        contactType: "customer service",
        email: SITE_CONFIG.email,
        availableLanguage: ["English", "Urdu"],
      },
    ],
    founder: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.siteUrl}/#founder`,
      name: SITE_CONFIG.ownerName,
      jobTitle: "Founder & Lead Engineer",
      url: `${SITE_CONFIG.siteUrl}/about`,
      sameAs: [
        "https://www.linkedin.com/in/quzex-agency-7632aa407/",
      ],
      worksFor: {
        "@id": `${SITE_CONFIG.siteUrl}/#organization`,
      },
    },
    areaServed: [
      { "@type": "City", name: "Karachi" },
      { "@type": "City", name: "Lahore" },
      { "@type": "Country", name: "Pakistan" },
      { "@type": "AdministrativeArea", name: "Worldwide" },
    ],
    knowsAbout: [
      "Website Development",
      "Next.js App Router",
      "React.js",
      "Full-Stack Web Development",
      "Website Redesign",
      "Search Engine Optimization (SEO)",
      "Generative Engine Optimization (GEO)",
      "Answer Engine Optimization (AEO)",
      "AI Integration & Automation",
      "TypeScript",
      "Tailwind CSS",
      "Core Web Vitals Optimization",
    ],
    serviceType: [
      "Website Development",
      "Website Redesign",
      "Next.js Development",
      "AI Integration",
      "Social Media Management",
    ],
    sameAs: [
      "https://www.instagram.com/quzex.co/",
      "https://www.linkedin.com/in/quzex-agency-7632aa407/",
      "https://www.youtube.com/@quzex-official",
      "https://www.facebook.com/quzex",
      "https://x.com/quzex",
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
  category,
}: {
  title: string;
  description: string;
  slug: string;
  image: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
}) {
  const postUrl = `${SITE_CONFIG.siteUrl}/blog/${slug}`;
  const absoluteImage = image.startsWith("http")
    ? image
    : `${SITE_CONFIG.siteUrl}${image.startsWith("/") ? image : `/${image}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${postUrl}#article`,
    headline: title,
    description,
    image: absoluteImage,
    url: postUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
    },
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": `${SITE_CONFIG.siteUrl}/#founder`,
      name: SITE_CONFIG.ownerName,
      jobTitle: "Founder & Lead Engineer",
      url: `${SITE_CONFIG.siteUrl}/about`,
    },
    publisher: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    ...(category ? { articleSection: category } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(updatedAt ? { dateModified: updatedAt } : {}),
    isPartOf: {
      "@type": "Blog",
      "@id": `${SITE_CONFIG.siteUrl}/blog`,
      name: "Quzex Blog",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".blog-content p:first-of-type"],
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

export function buildIndividualServiceSchema(service: {
  title: string;
  description: string;
  slug: string;
  image?: string;
  category?: string;
  pricingPlans?: Array<{
    name: string;
    price: number;
    description: string;
    deliveryTime?: string;
    features?: string[];
  }>;
}) {
  const serviceUrl = `${SITE_CONFIG.siteUrl}/services/${service.slug}`;
  const absoluteImage = service.image
    ? service.image.startsWith("http")
      ? service.image
      : `${SITE_CONFIG.siteUrl}${service.image.startsWith("/") ? service.image : `/${service.image}`}`
    : `${SITE_CONFIG.siteUrl}/22.png`;

  const offers = (service.pricingPlans || []).map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    description: plan.description,
    price: plan.price,
    priceCurrency: "USD",
    url: serviceUrl,
    availability: "https://schema.org/InStock",
    eligibleRegion: {
      "@type": "AdministrativeArea",
      name: "Worldwide",
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    name: service.title,
    description: service.description,
    url: serviceUrl,
    image: absoluteImage,
    category: service.category || "Web Development",
    provider: {
      "@id": `${SITE_CONFIG.siteUrl}/#organization`,
    },
    serviceType: service.title,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Worldwide",
    },
    ...(offers.length > 0
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.title} Pricing Plans`,
            itemListElement: offers,
          },
        }
      : {}),
  };
}

export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
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
