export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  content: string[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-plan-a-website-that-matches-your-business-goals",
    title: "How to Plan a Website That Matches Your Business Goals",
    category: "Website Strategy",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=60",
    excerpt:
      "A clear plan before development helps you avoid design mistakes, scope confusion, and wasted time during the build.",
    content: [
      "A strong website usually starts with clarity. Before design or development begins, define what the website needs to do for your business, what actions visitors should take, and which pages actually matter.",
      "When goals are clear, the structure of the website becomes easier to plan. You can decide whether you need a landing page, a company site, service pages, or a more advanced build with custom features and integrations.",
      "This early planning stage saves time later. It reduces revisions, improves messaging, and helps the final website feel more aligned with the business instead of looking like a generic template.",
    ],
  },
  {
    slug: "when-to-choose-a-static-website-vs-a-dynamic-website",
    title: "When to Choose a Static Website vs a Dynamic Website",
    category: "Development",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&auto=format&fit=crop&q=60",
    excerpt:
      "Static and dynamic websites solve different problems. Choosing the right structure early keeps your project faster and more cost-effective.",
    content: [
      "A static website is usually the right choice when the content does not change often and the goal is speed, reliability, and simplicity. Business websites, landing pages, and portfolio sites often fit this model well.",
      "A dynamic website is more suitable when content, user data, dashboards, or backend logic need to change frequently. It gives more flexibility, but it also requires stronger planning around database structure and functionality.",
      "Choosing between them is not only a technical decision. It also affects budget, delivery time, future maintenance, and how the website will grow with the business.",
    ],
  },
  {
    slug: "what-makes-a-modern-business-website-feel-professional",
    title: "What Makes a Modern Business Website Feel Professional",
    category: "Design",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=60",
    excerpt:
      "Strong layout, fast loading, clear messaging, and polished visual details are usually what separate an average website from a professional one.",
    content: [
      "Professional websites usually feel clear before they feel impressive. The structure is easy to understand, the typography is readable, and the design supports the message instead of distracting from it.",
      "Performance also matters. A clean interface loses value quickly if the website feels slow, broken on mobile, or inconsistent between sections. Professional quality comes from both appearance and execution.",
      "Details make the difference. Consistent spacing, good color balance, meaningful calls to action, and responsive layouts help create trust and make the business feel more established online.",
    ],
  },
];

export function getBlogPostBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
