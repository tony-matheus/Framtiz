"use client"

import type React from "react"

import { User } from "lucide-react"
import { CyberCard, CyberCardContent } from "@/components/ui/card"
import { CyberDataDisplay } from "@/components/ui-custom/cyber-data-display"
import { CyberStatusBadge } from "@/components/ui-custom/cyber-status-badge"
import { Separator } from "@/components/ui/separator"

const profile = {
  username: "user.username",
  email: "user.email",
  role: "ADMIN_LEVEL",
  bio: "Senior Full-stack developer.",
  location: "",
  githubUsername: "user.githubUsername",
  twitter: "",
}
export default function ProfileCard({}) {
  return (
    <CyberCard>
      <CyberCardContent className="flex flex-col items-center p-6">
        <div className="mb-4 flex size-24 items-center justify-center border-2 border-purple-600 bg-slate-800">
          <User className="text-purple-400" size={48} />
        </div>
        <div className="text-center">
          <div className="font-mono text-lg text-slate-200">
            {profile.username}
          </div>
          <div className="font-mono text-sm text-slate-400">{profile.role}</div>
        </div>

        <Separator className="my-6 bg-slate-800" />

        <div className="w-full space-y-4">
          <div className="border border-slate-800 p-3">
            <div className="mb-1 font-mono text-xs text-slate-500">
              ACCOUNT_STATUS
            </div>
            <CyberStatusBadge status="online">ACTIVE</CyberStatusBadge>
          </div>

          <CyberDataDisplay label="LAST_LOGIN" value="2025-05-12 14:32:18" />
          <CyberDataDisplay label="SECURITY_LEVEL" value="LEVEL_3" />
        </div>
      </CyberCardContent>
    </CyberCard>
  )
}
