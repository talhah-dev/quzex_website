export default function WorkPortfolioSkeleton() {
  return (
    <div className="flex flex-col gap-10 animate-pulse">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-12 w-full rounded-full bg-white sm:max-w-sm" />
        <div className="flex flex-wrap items-center gap-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-10 w-24 rounded-full border border-[#0A211F]/10 bg-white"
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-[1rem] border border-[#0A211F]/10 bg-white p-2 shadow-[0_18px_45px_-35px_rgba(10,33,31,0.35)]"
          >
            <div className="relative h-[260px] overflow-hidden rounded-[0.7rem] bg-[#EDF6E8] sm:h-[320px]">
              <div className="absolute left-2 top-2 h-8 w-24 rounded-full bg-white/80" />
            </div>

            <div className="flex flex-col gap-3 px-2 pb-2 pt-6">
              <div className="h-4 w-28 rounded-full bg-[#EDF6E8]" />
              <div className="h-7 w-2/3 rounded-full bg-[#EDF6E8]" />

              <div className="flex flex-wrap gap-2.5">
                {Array.from({ length: 3 }).map((__, badgeIndex) => (
                  <div
                    key={badgeIndex}
                    className="h-7 w-20 rounded-full bg-[#EDF6E8]"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
