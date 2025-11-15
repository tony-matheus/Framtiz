"use client"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import AdminSidebar from "./sidebar"
import { User } from "@/lib/services/auth/auth-types"
import { useState } from "react"
import LogoutModal from "@/components/admin/logout-modal"
import SidebarHeader from "./sidebar-header"

interface AdminLayoutProps {
  children: React.ReactNode
  user: User
}

export default function AdminLayout({ user, children }: AdminLayoutProps) {
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false)

  return (
    <>
      <SidebarProvider>
        <AdminSidebar user={user} onLogout={() => setShowLogoutModal(true)} />
        <SidebarInset className="rounded-xl bg-slate-900 p-4 md:my-4">
          <SidebarHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>

      {/* Logout confirmation modal */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
      />
    </>
  )
}
