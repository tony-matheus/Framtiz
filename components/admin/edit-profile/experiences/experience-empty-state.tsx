import type React from "react"
import { CyberCard, CyberCardContent } from "@/components/ui/card"

export default function ExperienceEmptyState() {
  return (
    <CyberCard>
      <CyberCardContent className="p-8 text-center">
        <div className="break-words font-mono text-slate-500">
          NO_WORK_EXPERIENCE_ADDED
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Add your work experience to showcase your professional journey.
        </p>
      </CyberCardContent>
    </CyberCard>
  )
}
