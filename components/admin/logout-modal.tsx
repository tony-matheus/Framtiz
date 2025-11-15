"use client"

import { redirect } from "next/navigation"
import { useState } from "react"
import { getSupabaseClient } from "@/lib/supabase/client"
import { ConfirmDialog } from "../ui/dialogs/confirm-dialog"

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LogoutModal({ isOpen, onClose }: LogoutModalProps) {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = getSupabaseClient()
    await supabase?.auth.signOut()
    setIsLoggingOut(false)
    redirect("/")
  }

  return (
    <ConfirmDialog
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleLogout}
      title="CONFIRM_LOGOUT"
      description="Are you sure you want to terminate your current session? All unsaved changes will be lost."
      confirmText="CONFIRM_LOGOUT"
      cancelText="CANCEL"
      variant="destructive"
      isLoading={isLoggingOut}
    />
  )
}
