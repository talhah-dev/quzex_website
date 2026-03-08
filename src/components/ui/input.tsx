import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-[#0A211F]/20 bg-transparent px-4 text-sm text-[#0A211F] outline-none transition placeholder:text-[#0A211F]/45 focus:border-[#0A211F]/40 focus:ring-2 focus:ring-[#8AF7B7]/35 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
