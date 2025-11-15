"use client"

import { User } from "@/lib/services/auth/auth-types"
import { createContext, useContext, useMemo } from "react"
import {
  QueryClient,
  QueryClientProvider,
  QueryClientContext,
} from "@tanstack/react-query"

const UserContext = createContext<User | undefined>(undefined)

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUserContext must be used within UserProvider")
  }
  return context
}

export function UserProvider({
  children,
  value,
  addQueryClient = false,
}: {
  children: React.ReactNode
  value: User
  addQueryClient?: boolean
}) {
  const existingQueryClient = useContext(QueryClientContext)

  const queryClient = useMemo(() => new QueryClient(), [])

  const content = (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  )

  if (existingQueryClient && !addQueryClient) {
    return content
  }

  return (
    <QueryClientProvider client={queryClient}>{content}</QueryClientProvider>
  )
}
