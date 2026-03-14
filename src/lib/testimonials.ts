import type { CountryCode } from "@/lib/countries";

export type ReviewCategory = "Development" | "Redesign" | "AI" | "Marketing";

type ReviewBase = {
  id: number;
  name: string;
  country: string;
  flag: CountryCode;
  category: ReviewCategory;
  rating: string;
  timeAgo: string;
  profileImage?: string;
};

export type TextReview = ReviewBase & {
  type: "text";
  review: string;
};

export type AudioReview = ReviewBase & {
  type: "audio";
  review: string;
  duration: string;
  waveform: number[];
};

export type ReviewItem = TextReview | AudioReview;

export const REVIEW_ITEMS: ReviewItem[] = [
  {
    id: 1,
    type: "text",
    name: "James Turner",
    country: "United States",
    flag: "US",
    category: "Development",
    rating: "5.0",
    timeAgo: "2 weeks ago",
    profileImage:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    review:
      "Quzex handled the full website build with clear updates, fast turnaround, and a structure our team could manage after launch.",
  },
  {
    id: 2,
    type: "audio",
    name: "Aisha Rahman",
    country: "United Arab Emirates",
    flag: "AE",
    category: "Marketing",
    rating: "4.9",
    timeAgo: "1 month ago",
    profileImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=80",
    duration: "01:12",
    waveform: [14, 26, 18, 32, 22, 28, 16, 30, 20, 24, 15, 27],
    review:
      "We needed campaign-ready landing pages and visual assets that felt polished. The team delivered quickly and kept the brand consistent across every page.",
  },
  {
    id: 3,
    type: "text",
    name: "Sarah Mitchell",
    country: "Canada",
    flag: "CA",
    category: "Redesign",
    rating: "5.0",
    timeAgo: "3 weeks ago",
    review:
      "Our old site looked dated. After the redesign, the brand finally feels premium, modern, and much easier for clients to navigate.",
  },
  {
    id: 4,
    type: "audio",
    name: "Daniel Brooks",
    country: "United Kingdom",
    flag: "GB",
    category: "AI",
    rating: "4.9",
    timeAgo: "6 days ago",
    profileImage:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&auto=format&fit=crop&q=80",
    duration: "00:48",
    waveform: [18, 22, 30, 17, 26, 34, 20, 28, 16, 24, 29, 21],
    review:
      "The team translated our AI service into a website that feels clear, professional, and easy for new visitors to understand.",
  },
  {
    id: 5,
    type: "text",
    name: "Mason Clarke",
    country: "Australia",
    flag: "AU",
    category: "Development",
    rating: "5.0",
    timeAgo: "5 weeks ago",
    profileImage:
      "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=300&auto=format&fit=crop&q=80",
    review:
      "From layout to launch, everything was organized. The site performs well, looks sharp on mobile, and supports our bookings smoothly.",
  },
  {
    id: 6,
    type: "text",
    name: "Hassan Kareem",
    country: "Saudi Arabia",
    flag: "SA",
    category: "Marketing",
    rating: "4.8",
    timeAgo: "2 months ago",
    review:
      "We wanted fast campaign pages and a cleaner online presence. Quzex delivered both with strong communication and good attention to detail.",
  },
];
