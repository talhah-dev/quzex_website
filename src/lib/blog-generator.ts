import { GoogleGenerativeAI } from "@google/generative-ai";
import connectToDatabase from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import type { BlogSeo } from "@/types";

// Curated pool of high-converting web agency & tech topics for automatic rotation
const TOPIC_POOL = [
  {
    topic: "Why Next.js is the Ultimate Framework for High-Performing Web Applications in 2025",
    category: "Web Development",
    query: "modern web development code nextjs",
  },
  {
    topic: "Core Web Vitals Optimization: How to Score 100 on Google PageSpeed Insights",
    category: "SEO & Performance",
    query: "website speed performance analytics dashboard",
  },
  {
    topic: "The Power of Custom Web Design vs Template Websites for Scaling Businesses",
    category: "UI/UX Design",
    query: "creative website design workspace designer",
  },
  {
    topic: "Mastering Technical SEO: Architectural Best Practices for Fast Organic Growth",
    category: "SEO & Performance",
    query: "seo search engine optimization marketing graph",
  },
  {
    topic: "How Modern Full-Stack Development Drives Higher E-Commerce Conversion Rates",
    category: "Web Development",
    query: "ecommerce online shopping digital store checkout",
  },
  {
    topic: "Micro-Interactions and Motion Design: Transforming Good UI into Unforgettable UX",
    category: "UI/UX Design",
    query: "ui ux design digital interface abstract creative",
  },
  {
    topic: "Why Businesses in Pakistan and Global Markets are Investing in Custom Software & Web Apps",
    category: "Digital Strategy",
    query: "business technology team laptop modern office",
  },
  {
    topic: "Building Secure, Scalable MERN & Next.js Web Architectures for Enterprise",
    category: "Web Development",
    query: "cybersecurity cloud server architecture technology",
  },
];

// Fallback high-resolution Unsplash images if Unsplash API key is not yet set
const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1600&q=80",
];

export interface GenerateBlogOptions {
  topic?: string;
  category?: string;
  publishImmediately?: boolean;
}

export interface GeneratedBlogResponse {
  success: boolean;
  message: string;
  data?: {
    id: string;
    title: string;
    slug: string;
    category: string;
    image: string;
    excerpt: string;
    isActive: boolean;
    seo?: BlogSeo;
  };
}

/**
 * Fetch a royalty-free image from Unsplash matching the topic keywords
 */
async function fetchUnsplashImage(query: string): Promise<string> {
  const accessKey = process.env.UNSPLASH_ACCESS_KEY;

  if (accessKey) {
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
          // Short cache or no-store to get random fresh images
          cache: "no-store",
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (data && data.urls && (data.urls.regular || data.urls.full)) {
          return data.urls.regular || data.urls.full;
        }
      } else {
        console.warn("Unsplash API returned non-OK status:", res.status, await res.text());
      }
    } catch (err) {
      console.error("Failed to fetch image from Unsplash API:", err);
    }
  }

  // Graceful fallback to random curated high-res tech image
  const randomIndex = Math.floor(Math.random() * FALLBACK_IMAGES.length);
  return FALLBACK_IMAGES[randomIndex];
}

/**
 * Generate a complete, SEO-optimized blog post using Google Gemini API
 */
export async function generateAndSaveBlogPost(
  options: GenerateBlogOptions = {}
): Promise<GeneratedBlogResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      success: false,
      message:
        "GEMINI_API_KEY environment variable is not configured. Please add it to your .env file or Vercel Environment Variables.",
    };
  }

  // Pick a topic from options or rotate from TOPIC_POOL
  const chosenTopicInfo =
    options.topic
      ? {
          topic: options.topic,
          category: options.category || "Web Development",
          query: options.topic,
        }
      : TOPIC_POOL[Math.floor(Math.random() * TOPIC_POOL.length)];

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash-lite",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.7,
      },
    });

    const prompt = `You are a real human writer, experienced web engineer, and digital strategist writing for the Quzex blog (a high-end web design and software agency).

Write an insightful, engaging, and in-depth article about this topic:
Topic: "${chosenTopicInfo.topic}"
Category: "${chosenTopicInfo.category}"

CRITICAL WRITING STYLE & TONE GUIDELINES:
1. Write 100% like a real human: warm, practical, conversational, authoritative, and direct.
2. DO NOT SOUND LIKE AN AI OR ROBOT:
   - NEVER use robotic clichés like "In today's fast-paced digital world", "delve into", "tapestry", "revolutionize", "beacon", "testament to", "furthermore", "it is crucial to", "realm of".
   - DO NOT use excessive hyphens or em-dashes (—). Keep punctuation natural, simple, and clean.
   - Use simple, clear, everyday English so that any business owner, startup founder, or non-technical reader can easily understand and take away value.
3. Content length: 900 to 1400 words.
4. Formatting: Use semantic HTML inside the content string (<h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>, <blockquote>, <code>). DO NOT include <html>, <head>, or <body> tags.
5. Provide real actionable advice, practical examples, and explain why modern frameworks (Next.js, React, TypeScript) and custom design by agency experts (like Quzex) give businesses a competitive edge.
6. Provide strong SEO metadata (metaTitle, metaDescription under 160 characters, focusKeyword, ogTitle, ogDescription).
7. Suggest an image search query (2-4 words) for Unsplash.

Return a valid JSON object matching this exact schema:
{
  "title": "Natural, punchy, human-written article title",
  "slug": "url-friendly-slug",
  "category": "${chosenTopicInfo.category}",
  "excerpt": "A clear, natural 2-sentence summary explaining what the reader will learn (under 180 characters).",
  "content": "<p>A relatable, engaging opening hook...</p><h2>First Section Heading</h2><p>Valuable real-world breakdown...</p>",
  "unsplashQuery": "minimalist modern workspace tech",
  "seo": {
    "metaTitle": "Title | Quzex",
    "metaDescription": "Concise natural meta description under 160 characters.",
    "focusKeyword": "primary focus keyword",
    "ogTitle": "OpenGraph Title",
    "ogDescription": "OpenGraph Description"
  }
}`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    
    let generatedData: {
      title: string;
      slug: string;
      category: string;
      excerpt: string;
      content: string;
      unsplashQuery?: string;
      seo?: BlogSeo;
    };

    try {
      generatedData = JSON.parse(responseText);
    } catch (parseErr) {
      console.error("Failed to parse Gemini JSON response:", responseText, parseErr);
      return {
        success: false,
        message: "Gemini response was not in expected JSON format. Please try again.",
      };
    }

    if (!generatedData.title || !generatedData.content) {
      return {
        success: false,
        message: "Gemini generated incomplete blog content.",
      };
    }

    // Format Slug
    let baseSlug = (generatedData.slug || generatedData.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    if (!baseSlug) {
      baseSlug = `blog-${Date.now()}`;
    }

    // Connect to database
    await connectToDatabase();

    // Check slug uniqueness
    let finalSlug = baseSlug;
    const existing = await BlogModel.findOne({ slug: finalSlug });
    if (existing) {
      finalSlug = `${baseSlug}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    // Fetch Unsplash image
    const imageQuery = generatedData.unsplashQuery || chosenTopicInfo.query || "web development";
    const imageUrl = await fetchUnsplashImage(imageQuery);

    // Prepare SEO Object
    const seoData: BlogSeo = {
      metaTitle: generatedData.seo?.metaTitle || `${generatedData.title} | Quzex`,
      metaDescription: generatedData.seo?.metaDescription || generatedData.excerpt,
      focusKeyword: generatedData.seo?.focusKeyword || chosenTopicInfo.category,
      ogTitle: generatedData.seo?.ogTitle || generatedData.title,
      ogDescription: generatedData.seo?.ogDescription || generatedData.excerpt,
      ogImage: imageUrl,
      twitterTitle: generatedData.seo?.ogTitle || generatedData.title,
      twitterDescription: generatedData.seo?.ogDescription || generatedData.excerpt,
    };

    const publishImmediately = options.publishImmediately !== undefined ? options.publishImmediately : true;

    // Create Blog Post in MongoDB
    const createdBlog = await BlogModel.create({
      title: generatedData.title,
      slug: finalSlug,
      category: generatedData.category || chosenTopicInfo.category,
      image: imageUrl,
      excerpt: generatedData.excerpt,
      content: generatedData.content,
      isActive: publishImmediately,
      seo: seoData,
    });

    return {
      success: true,
      message: `Blog post "${createdBlog.title}" successfully generated and saved!`,
      data: {
        id: createdBlog._id.toString(),
        title: createdBlog.title,
        slug: createdBlog.slug,
        category: createdBlog.category,
        image: createdBlog.image,
        excerpt: createdBlog.excerpt,
        isActive: createdBlog.isActive,
        seo: createdBlog.seo,
      },
    };
  } catch (err: any) {
    console.error("Error generating blog post with Gemini:", err);
    return {
      success: false,
      message: err?.message || "Failed to generate blog post with Gemini AI.",
    };
  }
}
