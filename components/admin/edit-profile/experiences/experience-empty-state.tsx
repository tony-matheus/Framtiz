import type React from "react"
import { Card, CardContent } from "@/components/ui/card"

export default function ExperienceEmptyState() {
  return (
    <Card>
      <CardContent className="p-8 text-center">
        <div className="break-words font-mono text-slate-500">
          NO_WORK_EXPERIENCE_ADDED
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Add your work experience to showcase your professional journey.
        </p>
      </CardContent>
    </Card>
  )
}
