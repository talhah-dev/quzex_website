import axios from "axios";

export type AnalyticsData = {
  summary: {
    activeUsers: number;
    pageViews: number;
    conversions: number;
    totalSessions: number;
  };
  dailyBars: {
    label: string;
    value: number;
    rawDate: string;
    heightPercentage: number;
  }[];
  sources: {
    label: string;
    value: string;
    count: number;
    pct: number;
  }[];
  devices: {
    label: string;
    value: string;
    count: number;
  }[];
};

type AnalyticsResponse = {
  success: boolean;
  message?: string;
  data?: AnalyticsData;
};

export async function getAdminAnalytics(range: "7d" | "30d" = "7d"): Promise<AnalyticsData> {
  const response = await axios.get<AnalyticsResponse>(`/api/admin/analytics?range=${range}`);

  if (!response.data?.success || !response.data.data) {
    throw new Error(response.data?.message || "Failed to load Google Analytics data");
  }

  return response.data.data;
}
