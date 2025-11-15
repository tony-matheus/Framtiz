"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { createContext, useContext } from "react"
import { User } from "@/lib/services/auth/auth-types"
import { TWENTY_FOUR_HOURS_IN_MS } from "@/lib/constants"

const ProjectSelectContext = createContext<User | undefined>(undefined)

export const useProjectSelectContext = () => {
  const context = useContext(ProjectSelectContext)
  if (!context) {
    throw new Error(
      "useProjectSelectContext must be used within ProjectSelectProvider",
    )
  }
  return context
}

export function ProjectSelectProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value: User
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: TWENTY_FOUR_HOURS_IN_MS,
          },
        },
      }),
  )

  return (
    <ProjectSelectContext.Provider value={value}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </ProjectSelectContext.Provider>
  )
}
