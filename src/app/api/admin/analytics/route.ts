import { NextRequest, NextResponse } from "next/server";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getAnalyticsClient() {
  const clientEmail = process.env.GA_CLIENT_EMAIL;
  let privateKey = process.env.GA_PRIVATE_KEY || "";

  if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey.includes("\\n")) {
    privateKey = privateKey.replace(/\\n/g, "\n");
  }

  if (!clientEmail || !privateKey) {
    return null;
  }

  return new BetaAnalyticsDataClient({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const propertyId = process.env.GA_PROPERTY_ID;
    const client = getAnalyticsClient();

    if (!propertyId || !client) {
      return NextResponse.json(
        {
          success: false,
          message: "Google Analytics credentials not configured",
        },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const rangeParam = searchParams.get("range") || "7d";
    const startDate = rangeParam === "30d" ? "30daysAgo" : "7daysAgo";

    const [summaryResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: "today" }],
      metrics: [
        { name: "activeUsers" },
        { name: "screenPageViews" },
        { name: "eventCount" },
        { name: "sessions" },
      ],
    });

    const [dailyResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "sessions" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    });

    const [sourcesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "sessionSource" }],
      metrics: [{ name: "activeUsers" }],
      limit: 4,
    });

    const [devicesResponse] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate, endDate: "today" }],
      dimensions: [{ name: "deviceCategory" }],
      metrics: [{ name: "activeUsers" }],
    });

    const summaryRow = summaryResponse.rows?.[0]?.metricValues;
    const activeUsers = parseInt(summaryRow?.[0]?.value || "0", 10);
    const pageViews = parseInt(summaryRow?.[1]?.value || "0", 10);
    const conversions = parseInt(summaryRow?.[2]?.value || "0", 10);
    const totalSessions = parseInt(summaryRow?.[3]?.value || "0", 10);

    const dailyBars = (dailyResponse.rows || []).map((row) => {
      const dateStr = row.dimensionValues?.[0]?.value || "";
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const dateObj = new Date(`${year}-${month}-${day}`);
      const label = dateObj.toLocaleDateString("en-US", { weekday: "short" });
      const value = parseInt(row.metricValues?.[0]?.value || "0", 10);
      return { label, value, rawDate: dateStr };
    });

    const maxDaily = Math.max(...dailyBars.map((b) => b.value), 1);
    const formattedDaily = dailyBars.map((b) => ({
      ...b,
      heightPercentage: Math.round((b.value / maxDaily) * 100) || 5,
    }));

    const totalSourceUsers = (sourcesResponse.rows || []).reduce((acc, row) => {
      return acc + parseInt(row.metricValues?.[0]?.value || "0", 10);
    }, 0) || 1;

    const sources = (sourcesResponse.rows || []).map((row) => {
      const name = row.dimensionValues?.[0]?.value || "Direct";
      const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const pct = Math.round((count / totalSourceUsers) * 100);
      return {
        label: name === "(direct)" ? "Direct" : name,
        value: `${pct}%`,
        count,
        width: `w-[${pct}%]`,
        pct,
      };
    });

    const totalDeviceUsers = (devicesResponse.rows || []).reduce((acc, row) => {
      return acc + parseInt(row.metricValues?.[0]?.value || "0", 10);
    }, 0) || 1;

    const devices = (devicesResponse.rows || []).map((row) => {
      const category = row.dimensionValues?.[0]?.value || "desktop";
      const count = parseInt(row.metricValues?.[0]?.value || "0", 10);
      const pct = Math.round((count / totalDeviceUsers) * 100);
      const label = category.charAt(0).toUpperCase() + category.slice(1);
      return {
        label,
        value: `${pct}%`,
        count,
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          activeUsers,
          pageViews,
          conversions,
          totalSessions,
        },
        dailyBars: formattedDaily,
        sources,
        devices,
      },
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : "Failed to fetch analytics";
    return NextResponse.json(
      {
        success: false,
        message: errMessage,
      },
      { status: 500 }
    );
  }
}
