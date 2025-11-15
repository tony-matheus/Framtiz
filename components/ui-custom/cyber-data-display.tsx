import type React from "react"
import { cn } from "@/lib/utils"

interface CyberDataDisplayProps {
  label: string
  value: string | React.ReactNode
  className?: string
  labelClassName?: string
  valueClassName?: string
}

export function CyberDataDisplay({
  label,
  value,
  className,
  labelClassName,
  valueClassName,
}: CyberDataDisplayProps) {
  return (
    <div
      className={cn("bg-slate-800/50 p-3 border border-slate-700", className)}
    >
      <div
        className={cn("text-slate-400 mb-1 font-mono text-xs", labelClassName)}
      >
        {label}
      </div>
      <div className={cn("text-purple-300 font-mono", valueClassName)}>
        {value}
      </div>
    </div>
  )
}
