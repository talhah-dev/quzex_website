export default function DashboardClientLogosSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <article
          key={index}
          className="animate-pulse rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-4"
        >
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div className="h-7 w-12 rounded-full bg-[#0A211F]" />
              <div className="h-7 w-20 rounded-full bg-[#D8F782]" />
            </div>

            <div className="flex h-28 items-center justify-center rounded-xl border border-[#0A211F]/10 bg-white px-4">
              <div className="h-8 w-24 rounded-full bg-[#0A211F]/10" />
            </div>

            <div className="space-y-2">
              <div className="h-5 w-32 rounded-full bg-[#0A211F]/10" />
              <div className="h-4 w-full rounded-full bg-[#0A211F]/8" />
              <div className="h-4 w-4/5 rounded-full bg-[#0A211F]/8" />
            </div>

            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-lg bg-white" />
              <div className="h-9 w-24 rounded-lg bg-[#FFF5F5]" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
