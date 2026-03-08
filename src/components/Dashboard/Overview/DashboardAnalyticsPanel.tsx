import {
  BarChart3,
  Globe,
  MousePointerClick,
  Search,
  Share2,
  Smartphone,
  TrendingUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const summaryStats = [
  {
    label: "Active Users",
    value: "14.8K",
    detail: "+8.4% this week",
    icon: Users,
  },
  {
    label: "Page Views",
    value: "32.4K",
    detail: "Avg. 4.7 pages/session",
    icon: BarChart3,
  },
  {
    label: "CTR",
    value: "4.9%",
    detail: "Landing pages performing well",
    icon: MousePointerClick,
  },
] as const;

const trafficBars = [
  { label: "Mon", value: 38 },
  { label: "Tue", value: 52 },
  { label: "Wed", value: 47 },
  { label: "Thu", value: 66 },
  { label: "Fri", value: 72 },
  { label: "Sat", value: 58 },
  { label: "Sun", value: 44 },
] as const;

const trafficSources = [
  { label: "Organic Search", value: "46%", width: "w-[46%]", icon: Search },
  { label: "Direct", value: "24%", width: "w-[24%]", icon: Globe },
  { label: "Social", value: "18%", width: "w-[18%]", icon: Share2 },
  { label: "Referral", value: "12%", width: "w-[12%]", icon: TrendingUp },
] as const;

const deviceMetrics = [
  { label: "Desktop", value: "61%" },
  { label: "Mobile", value: "31%" },
  { label: "Tablet", value: "8%" },
] as const;

export default function DashboardAnalyticsPanel() {
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
                Analytics
              </Badge>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-[#0A211F]">Traffic and engagement</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-[#0A211F]/62">
                  Static analytics preview styled like a website reporting panel for traffic,
                  engagement, and growth trends.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#0A211F]/10 bg-[#f7f9f2] px-3 py-2 text-xs font-medium text-[#0A211F]/62">
              <Smartphone className="size-3.5" />
              Last 7 days
            </div>
          </div>

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
                <p className="mt-2 text-3xl font-semibold tracking-tight">24,680</p>
              </div>
              <div className="rounded-full bg-[#D8F782] px-3 py-1 text-xs font-semibold text-[#0A211F]">
                +12.6%
              </div>
            </div>

            <div className="mt-8 grid h-75 grid-cols-7 items-end gap-3">
              {trafficBars.map((item) => (
                <div key={item.label} className="flex h-full flex-col items-center justify-end gap-3">
                  <div className="flex h-full items-end">
                    <div
                      className="w-18 rounded-t-xl bg-gradient-to-t from-[#D8F782] via-[#8AF7B7] to-[#E9F3E6] transition-transform duration-300 hover:-translate-y-1"
                      style={{ height: `${item.value}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-[#E9F3E6]/70">{item.label}</span>
                </div>
              ))}
            </div>
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
            {trafficSources.map((source) => {
              const Icon = source.icon;

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
                        <p className="text-xs text-[#0A211F]/52">Static reporting sample</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-[#0A211F]">{source.value}</p>
                  </div>
                  <div className="mt-4 h-2 rounded-full bg-white">
                    <div className={`h-2 rounded-full bg-[#0A211F] ${source.width}`} />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-[#0A211F]/10 bg-[#EDF6E8] p-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
              Devices
            </p>
            <div className="mt-4 grid gap-3">
              {deviceMetrics.map((device) => (
                <div
                  key={device.label}
                  className="flex items-center justify-between rounded-xl border border-[#0A211F]/10 bg-white px-4 py-3"
                >
                  <p className="text-sm font-medium text-[#0A211F]">{device.label}</p>
                  <p className="text-sm font-semibold text-[#0A211F]">{device.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
