import type { ReactNode } from "react"

import { serverAuthService } from "@/lib/services/auth/server-auth-service"
import { redirect } from "next/navigation"

import ReactQueryProvider from "@/lib/contexts/react-query-provider"

export default async function Layout({ children }: { children: ReactNode }) {
  const user = await serverAuthService.getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  return <ReactQueryProvider>{children}</ReactQueryProvider>
}
