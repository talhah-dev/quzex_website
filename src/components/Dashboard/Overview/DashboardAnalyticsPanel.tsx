"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BarChart3,
  Globe,
  Loader2,
  MousePointerClick,
  RefreshCw,
  Search,
  Share2,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnalyticsData, getAdminAnalytics } from "@/lib/api/analytics";

function getSourceIcon(label: string) {
  const lower = label.toLowerCase();
  if (lower.includes("google") || lower.includes("search") || lower.includes("organic")) {
    return Search;
  }
  if (lower.includes("social") || lower.includes("facebook") || lower.includes("instagram")) {
    return Share2;
  }
  if (lower.includes("referral")) {
    return TrendingUp;
  }
  return Globe;
}

export default function DashboardAnalyticsPanel() {
  const [range, setRange] = useState<"7d" | "30d">("7d");
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalytics = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getAdminAnalytics(range);
      setAnalytics(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to connect to Google Analytics API");
    } finally {
      setIsLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  const activeUsers = analytics?.summary.activeUsers ?? 0;
  const pageViews = analytics?.summary.pageViews ?? 0;
  const conversions = analytics?.summary.conversions ?? 0;
  const totalSessions = analytics?.summary.totalSessions ?? 0;

  const summaryStats = [
    {
      label: "Active Users",
      value: isLoading ? "..." : activeUsers.toLocaleString(),
      detail: `Real-time users (${range === "7d" ? "7 days" : "30 days"})`,
      icon: Users,
    },
    {
      label: "Page Views",
      value: isLoading ? "..." : pageViews.toLocaleString(),
      detail: "Total pages viewed",
      icon: BarChart3,
    },
    {
      label: "Conversions",
      value: isLoading ? "..." : conversions.toLocaleString(),
      detail: "Goal events completed",
      icon: MousePointerClick,
    },
  ];

  const dailyBars = analytics?.dailyBars || [];
  const sources = analytics?.sources || [];
  const devices = analytics?.devices || [];

  return (
    <section className="grid gap-4 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,0.95fr)]">
      <article className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Live Analytics
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#0A211F]">Traffic and engagement</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-[#0A211F]/62">
                  Live data connected directly to Google Analytics (GA4 Property ID: {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-EP5DQXL4LN"})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fetchAnalytics}
                disabled={isLoading}
                className="inline-flex items-center justify-center rounded-full border border-[#0A211F]/10 bg-[#f7f9f2] p-2 text-[#0A211F]/62 hover:bg-[#EDF6E8] disabled:opacity-50"
                title="Refresh Analytics"
              >
                <RefreshCw className={`size-3.5 ${isLoading ? "animate-spin" : ""}`} />
              </button>

              <div className="inline-flex rounded-full border border-[#0A211F]/10 bg-[#f7f9f2] p-1">
                <button
                  type="button"
                  onClick={() => setRange("7d")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    range === "7d"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Last 7 days
                </button>
                <button
                  type="button"
                  onClick={() => setRange("30d")}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    range === "30d"
                      ? "bg-[#0A211F] text-[#E9F3E6]"
                      : "text-[#0A211F]/62 hover:bg-[#EDF6E8]"
                  }`}
                >
                  Last 30 days
                </button>
              </div>
            </div>
          </div>

          {error ? (
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-800">
              <p className="font-semibold">Notice: {error}</p>
              <p className="mt-1 opacity-80">
                Data will start accumulating as soon as users visit your website with the GA Measurement ID (G-EP5DQXL4LN).
              </p>
            </div>
          ) : null}

          <div className="grid gap-4 md:grid-cols-3">
            {summaryStats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-[#0A211F]/52">{stat.label}</p>
                      <p className="mt-3 text-3xl font-semibold tracking-tight text-[#0A211F]">
                        {stat.value}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                      <Icon className="size-4.5" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-[#0A211F]/62">{stat.detail}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[#0A211F]/10 bg-[#081917] p-5 text-[#E9F3E6]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#D8F782]/72">
                  Sessions Trend
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {isLoading ? "..." : totalSessions.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-[#D8F782] px-3 py-1 text-xs font-semibold text-[#0A211F]">
                <Smartphone className="size-3.5" />
                Live GA4 Data
              </div>
            </div>

            {isLoading ? (
              <div className="flex h-56 items-center justify-center">
                <Loader2 className="size-8 animate-spin text-[#D8F782]" />
              </div>
            ) : dailyBars.length === 0 ? (
              <div className="flex h-56 items-center justify-center text-sm text-[#E9F3E6]/60">
                No session activity recorded yet in GA4
              </div>
            ) : (
              <div className="mt-8 grid h-56 grid-cols-7 items-end gap-3">
                {dailyBars.map((item, idx) => (
                  <div key={item.rawDate || idx} className="flex h-full flex-col items-center justify-end gap-3">
                    <div className="flex h-full items-end w-full justify-center">
                      <div
                        className="w-full max-w-[2.5rem] rounded-t-xl bg-gradient-to-t from-[#D8F782] via-[#8AF7B7] to-[#E9F3E6] transition-transform duration-300 hover:-translate-y-1"
                        style={{ height: `${Math.max(item.heightPercentage, 8)}%` }}
                        title={`${item.label}: ${item.value} sessions`}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#E9F3E6]/70">{item.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <article className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
              Acquisition
            </p>
            <h2 className="text-2xl font-semibold text-[#0A211F]">Traffic sources</h2>
          </div>

          <div className="grid gap-4">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="size-6 animate-spin text-[#0A211F]/40" />
              </div>
            ) : sources.length === 0 ? (
              <div className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4 text-center text-xs text-[#0A211F]/60">
                No traffic sources reported yet
              </div>
            ) : (
              sources.map((source) => {
                const Icon = getSourceIcon(source.label);

                return (
                  <div
                    key={source.label}
                    className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="rounded-xl bg-[#0A211F] p-2.5 text-[#E9F3E6]">
                          <Icon className="size-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#0A211F]">{source.label}</p>
                          <p className="text-xs text-[#0A211F]/52">{source.count} active users</p>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-[#0A211F]">{source.value}</p>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white">
                      <div
                        className="h-2 rounded-full bg-[#0A211F] transition-all duration-500"
                        style={{ width: `${Math.max(source.pct, 4)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="rounded-2xl border border-[#0A211F]/10 bg-[#EDF6E8] p-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
              Devices
            </p>
            <div className="mt-4 grid gap-3">
              {isLoading ? (
                <div className="flex justify-center py-4">
                  <Loader2 className="size-5 animate-spin text-[#0A211F]/40" />
                </div>
              ) : devices.length === 0 ? (
                <div className="text-xs text-[#0A211F]/60 text-center py-2">
                  No device data yet
                </div>
              ) : (
                devices.map((device) => (
                  <div
                    key={device.label}
                    className="flex items-center justify-between rounded-xl border border-[#0A211F]/10 bg-white px-4 py-3"
                  >
                    <p className="text-sm font-medium text-[#0A211F]">{device.label}</p>
                    <p className="text-sm font-semibold text-[#0A211F]">{device.value}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
