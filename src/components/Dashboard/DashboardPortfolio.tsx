import Link from "next/link";
import Image from "next/image";
import { PencilLine, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HOME_PORTFOLIO_ITEMS, PORTFOLIO_ITEMS } from "@/lib/portfolio";

export default function DashboardPortfolio() {
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
                Portfolio
              </Badge>
              <div className="space-y-2">
                <h1 className="text-2xl font-medium leading-tight text-[#0A211F] sm:text-4xl">
                  Portfolio dashboard
                </h1>
                <p className="max-w-3xl text-sm leading-relaxed text-[#0A211F]/68 sm:text-base">
                  Review how many portfolio projects are currently available and which ones are
                  visible on the frontend.
                </p>
              </div>
            </div>

            <Button
              asChild
              type="button"
              className="inline-flex items-center gap-2 self-start rounded-xl bg-[#0A211F] px-4 py-2 text-[#E9F3E6] hover:bg-[#143531]"
            >
              <Link href="/dashboard/portfolio/new">
                <Plus className="size-4" />
                <span>Add New Portfolio</span>
              </Link>
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Total Portfolio Items</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(PORTFOLIO_ITEMS.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Total projects currently stored in your portfolio dashboard.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Showing On Home</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">
                {String(HOME_PORTFOLIO_ITEMS.length).padStart(2, "0")}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                Portfolio items currently marked to appear on the homepage.
              </p>
            </article>

            <article className="rounded-2xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5">
              <p className="text-sm font-medium text-[#0A211F]/52">Frontend Coverage</p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-[#0A211F]">100%</p>
              <p className="mt-4 text-sm leading-relaxed text-[#0A211F]/62">
                All current portfolio projects are visible in the frontend work section.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#0A211F]/10 bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,33,31,0.35)]">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#0A211F]/45">
            Portfolio List
          </p>
          <h2 className="text-2xl font-semibold text-[#0A211F]">
            Portfolio items currently shown on the frontend
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {PORTFOLIO_ITEMS.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-3"
            >
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative h-36 md:h-45 w-full overflow-hidden rounded-lg sm:w-44">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 176px, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-[#0A211F] px-3 py-1 text-xs font-semibold tracking-[0.18em] text-[#E9F3E6]">
                        {String(item.priority).padStart(2, "0")}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.showOnHome
                            ? "bg-[#D8F782] text-[#0A211F]"
                            : "bg-white text-[#0A211F]/60"
                        }`}
                      >
                        {item.showOnHome ? "Home Visible" : "Work Only"}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-[#0A211F]">{item.title}</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-[#0A211F]/10 bg-white px-3 py-1 text-xs font-medium text-[#0A211F]/62"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#0A211F]/10 bg-white px-3 py-2 text-xs font-medium text-[#0A211F] transition-colors hover:bg-[#EDF6E8]"
                      >
                        <PencilLine className="size-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#C24141]/15 bg-[#FFF5F5] px-3 py-2 text-xs font-medium text-[#C24141] transition-colors hover:bg-[#FEEBEB]"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
