import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0A211F] px-6 text-[#E9F3E6]">
      <div className="flex flex-col items-center gap-4 text-center">
        <AiOutlineLoading3Quarters className="animate-spin text-white" size={30} />
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#E9F3E6]">
          Loading
        </p>
      </div>
    </div>
  );
}
