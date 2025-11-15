"use client"

import { Button } from "@/components/ui/button"

interface TimeFilterProps {
  timePeriod: "1d" | "7d" | "30d"
  onTimePeriodChange: (period: "1d" | "7d" | "30d") => void
}

const TIME_PERIOD_OPTIONS = [
  { value: "1d" as const, label: "1_DAY" },
  { value: "7d" as const, label: "7_DAYS" },
  { value: "30d" as const, label: "30_DAYS" },
]

export default function TimeFilter({
  timePeriod,
  onTimePeriodChange,
}: TimeFilterProps) {
  return (
    <div className="flex items-center space-x-2">
      <span className="font-mono text-sm text-slate-400">TIME_PERIOD:</span>
      <div className="flex rounded-lg bg-slate-800 p-1">
        {TIME_PERIOD_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={timePeriod === option.value ? "primary" : "ghost"}
            size="sm"
            onClick={() => onTimePeriodChange(option.value)}
            className={`font-mono text-xs transition-all duration-200 ${
              timePeriod === option.value
                ? "bg-purple-600 text-white shadow-lg"
                : "text-slate-400 hover:bg-slate-700 hover:text-slate-200"
            }`}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
