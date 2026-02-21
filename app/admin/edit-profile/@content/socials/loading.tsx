import type { ReactNode } from "react"

import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import EditProfileTabs from "@/components/admin/edit-profile/edit-profile-tabs"

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser()

  if (!user) {
    return children
  }

  return <EditProfileTabs tabName="profile" />
}
