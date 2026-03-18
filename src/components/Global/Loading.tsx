export default function Loading() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#0A211F] px-6 text-[#E9F3E6]">
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="relative h-14 w-14">
                    <div className="absolute inset-0 rounded-full border-4 border-[#E9F3E6]/10" />
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#D8F782] border-r-[#D8F782]" />
                </div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#E9F3E6]/70">
                    Loading
                </p>
            </div>
        </div>
    );
}
