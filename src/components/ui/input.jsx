import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full px-3 py-2 bg-white border border-[#616161] placeholder-[#616161] rounded text-base shadow-xs transition-colors",
        "focus:border-[#004494] focus:shadow-[0px_0px_3px_2px_#00449440] focus:outline-none",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input }
