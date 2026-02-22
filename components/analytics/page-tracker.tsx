"use client"

import usePageTracker from "@/hooks/use-page-tracker"
import { User } from "@/lib/services/auth/auth-types"

type PageTrackerProps = {
  page?: string
  referrer?: string
  userAgent?: string
  country?: string
  device?: string
  from?: string
  metadata?: Record<string, unknown>
  user?: User | null | undefined
}

export default function PageTracker({
  page,
  referrer,
  userAgent,
  country,
  device,
  from,
  metadata = {},
  user,
}: PageTrackerProps) {
  usePageTracker({
    page,
    referrer,
    userAgent,
    country,
    device,
    from,
    metadata,
    user,
  })

  return null
}
