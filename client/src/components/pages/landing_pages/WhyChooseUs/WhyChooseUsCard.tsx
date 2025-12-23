import type React from "react"
import { cn } from "@/lib/utils"

interface ValueChainCardProps {
  title: string
  icon: React.ReactNode
  variant: "dark" | "yellow"
}

export function WhyChooseUsCard({ title, icon, variant }: ValueChainCardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-start justify-between rounded-lg p-4 min-w-[200px] h-[220px]",
        variant === "dark" ? "bg-[#3d3d3d]" : "bg-[#f5b800]",
      )}
    >
      <h3 className={cn("text-lg font-semibold", variant === "dark" ? "text-white" : "text-[#3d3d3d]")}>{title}</h3>
      <div className="flex items-center justify-center w-full">
        <div
          className={cn(
            "w-28 h-28 rounded-full border-[3px] flex items-center justify-center",
            variant === "dark" ? "border-white/60" : "border-[#3d3d3d]/60",
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
