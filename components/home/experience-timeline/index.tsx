"use client"

import dynamic from "next/dynamic"
import { Experience } from "@/lib/schemas/experience-schemas"

const Timeline = dynamic(() => import("./timeline"), { ssr: false })

export default function ExperienceTimeline({
  experiences,
}: {
  experiences: Experience[]
}) {
  return (
    <div>
      <Timeline experiences={experiences} />
    </div>
  )
}
