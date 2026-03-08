export default function DashboardInquiriesSkeleton() {
  return (
    <div className="grid gap-4 animate-pulse">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-[#0A211F]/10 bg-[#f7f9f2] p-5"
        >
          <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2">
                <div className="h-7 w-20 rounded-full bg-[#0A211F]" />
                <div className="h-7 w-24 rounded-full bg-white" />
              </div>

              <div className="space-y-2">
                <div className="h-6 w-48 rounded-full bg-[#0A211F]/10" />
                <div className="h-4 w-56 rounded-full bg-[#0A211F]/8" />
              </div>

              <div className="space-y-2">
                <div className="h-4 w-full rounded-full bg-[#0A211F]/8" />
                <div className="h-4 w-[92%] rounded-full bg-[#0A211F]/8" />
                <div className="h-4 w-[78%] rounded-full bg-[#0A211F]/8" />
              </div>
            </div>

            <div className="grid gap-3 rounded-xl border border-[#0A211F]/10 bg-white px-4 py-4 xl:min-w-[260px]">
              <div className="space-y-2">
                <div className="h-3 w-12 rounded-full bg-[#0A211F]/8" />
                <div className="h-4 w-40 rounded-full bg-[#0A211F]/10" />
              </div>

              <div className="space-y-2">
                <div className="h-3 w-12 rounded-full bg-[#0A211F]/8" />
                <div className="h-4 w-32 rounded-full bg-[#0A211F]/10" />
              </div>

              <div className="flex gap-2 border-t border-[#0A211F]/10 pt-3">
                <div className="h-9 w-24 rounded-lg bg-[#EDF6E8]" />
                <div className="h-9 w-24 rounded-lg bg-[#FFF5F5]" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
