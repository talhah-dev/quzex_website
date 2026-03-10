export default function PortfolioSectionSkeleton() {
  return (
    <div className="w-full animate-pulse">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-28 rounded-full border border-white/12 bg-white/5"
          />
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-7 md:gap-y-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-6">
            <div className="h-[260px] rounded-2xl bg-white/8 sm:h-[320px]" />

            <div className="flex flex-col gap-3 pb-6">
              <div className="h-4 w-28 rounded-full bg-white/10" />
              <div className="h-7 w-2/3 rounded-full bg-white/10" />

              <div className="flex flex-wrap gap-2.5">
                {Array.from({ length: 3 }).map((__, badgeIndex) => (
                  <div
                    key={badgeIndex}
                    className="h-7 w-20 rounded-full border border-white/10 bg-white/5"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <div className="h-11 w-56 rounded-xl bg-[#D8F782]/70" />
      </div>
    </div>
  );
}
