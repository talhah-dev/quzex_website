import Link from "next/link";
import { Briefcase, FolderKanban, Images, Mail, Plus, Settings, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICE_ITEMS } from "@/lib/services";
import { Button } from "@/components/ui/button";
import DashboardAnalyticsPanel from "@/components/Dashboard/Overview/DashboardAnalyticsPanel";

const statCards = [
  {
    label: "Portfolio Projects",
    value: "12",
    detail: "Total portfolio projects currently uploaded in the dashboard.",
    icon: FolderKanban,
  },
  {
    label: "Client Logos",
    value: "24",
    detail: "Brand and client logos currently added to the website.",
    icon: Sparkles,
  },
  {
    label: "Received Enquiries",
    value: "18",
    detail: "Contact and project enquiries received through the website.",
    icon: Mail,
  },
  {
    label: "Blog Posts",
    value: "07",
    detail: "Published blog posts available for content and SEO growth.",
    icon: Briefcase,
  },
  {
    label: "Active Services",
    value: String(SERVICE_ITEMS.length).padStart(2, "0"),
    detail: "Service items currently visible in your services page.",
    icon: Settings,
  },
] as const;

export default function DashboardOverview() {
  return (
    <div className="grid gap-6">
      <section className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div className="space-y-3">
              <Badge
                variant="outline"
                className="rounded-full border-[#0A211F]/12 bg-[#EDF6E8] px-3 py-1 text-[#0A211F]"
              >
                Dashboard
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Admin dashboard
                </h1>
              </div>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 grid-cols-1 xl:grid-cols-3">
            {statCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.label}
                  className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-[#0A211F]/52">{card.label}</p>
                      <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                        {card.value}
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#0A211F] p-3 text-[#E9F3E6]">
                      <Icon className="size-5" />
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">{card.detail}</p>
                </article>
              );
            })}
          </div>

          <DashboardAnalyticsPanel />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-[#0A211F]/10 bg-[#EDF6E8] p-5">
              <div className="flex h-full flex-col gap-4 md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                    Quick Action
                  </p>
                  <h2 className="text-xl font-semibold text-[#0A211F]">
                    Add a new portfolio project
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#0A211F]/65">
                    Create a new portfolio item for the frontend work section and homepage
                    showcase.
                  </p>
                </div>

                <Button
                  asChild
                  type="button"
                  className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
                >
                  <Link href="/dashboard/portfolio/new">
                    <Plus className="size-4" />
                    <span>Create Portfolio</span>
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#0A211F]/10 bg-[#EDF6E8] p-5">
              <div className="flex h-full flex-col gap-4 md:justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#0A211F]/45">
                    Quick Action
                  </p>
                  <h2 className="text-xl font-semibold text-[#0A211F]">
                    Upload a new client logo
                  </h2>
                  <p className="max-w-2xl text-sm leading-relaxed text-[#0A211F]/65">
                    Open the client logos page and add a new brand logo to your website logo
                    library.
                  </p>
                </div>

                <Button
                  asChild
                  type="button"
                  className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
                >
                  <Link href="/dashboard/client-logos">
                    <Images className="size-4" />
                    <span>Upload Client Logo</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
