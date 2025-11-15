"use client"

import type { ReactNode } from "react"
import { last } from "ramda"

import { usePathname } from "next/navigation"
import EditProfileTabs from "@/components/admin/edit-profile/edit-profile-tabs"

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const paths = pathname.split("/")

  const tabName = last(paths)

  return (
    <div>
      <EditProfileTabs tabName={tabName} />
      <div>{children}</div>
    </div>
  )
}
