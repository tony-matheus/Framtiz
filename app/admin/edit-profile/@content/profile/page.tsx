"use client"

import type React from "react"

import { useState } from "react"
import { User, Save, Mail, MapPin, Github, Twitter } from "lucide-react"
import { CyberCard, CyberCardContent } from "@/components/ui/card"
import { CyberFormField } from "@/components/ui-custom/cyber-form-field"
import { Button } from "@/components/ui/button"
import { CyberDataDisplay } from "@/components/ui-custom/cyber-data-display"
import { CyberStatusBadge } from "@/components/ui-custom/cyber-status-badge"
import { Separator } from "@/components/ui/separator"
import { useUpdateProfile } from "@/hooks/profile/use-update-profile"
import { useUserContext } from "@/lib/contexts/user-context"

export default function Profile() {
  const user = useUserContext()

  const { mutate, isPending } = useUpdateProfile()

  const [profile, setProfile] = useState({
    username: user.username,
    email: user.email,
    role: "ADMIN_LEVEL",
    bio: "Senior Full-stack developer.",
    location: "",
    githubUsername: user.githubUsername,
    twitter: "",
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setProfile({ ...profile, [name]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({
      username: profile.username,
      github_username: profile.githubUsername,
    })
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Profile sidebar */}
        <CyberCard>
          <CyberCardContent className="flex flex-col items-center p-6">
            <div className="mb-4 flex size-24 items-center justify-center border-2 border-purple-600 bg-slate-800">
              <User className="text-purple-400" size={48} />
            </div>
            <div className="text-center">
              <div className="font-mono text-lg text-slate-200">
                {profile.username}
              </div>
              <div className="font-mono text-sm text-slate-400">
                {profile.role}
              </div>
            </div>

            <Separator className="my-6 bg-slate-800" />

            <div className="w-full space-y-4">
              <div className="border border-slate-800 p-3">
                <div className="mb-1 font-mono text-xs text-slate-500">
                  ACCOUNT_STATUS
                </div>
                <CyberStatusBadge status="online">ACTIVE</CyberStatusBadge>
              </div>

              <CyberDataDisplay
                label="LAST_LOGIN"
                value="2025-05-12 14:32:18"
              />
              <CyberDataDisplay label="SECURITY_LEVEL" value="LEVEL_3" />
            </div>
          </CyberCardContent>
        </CyberCard>

        {/* Profile form */}
        <CyberCard className="md:col-span-2">
          <CyberCardContent>
            <h3 className="mb-4 flex items-center font-mono text-lg text-slate-200">
              <div className="mr-2 size-2 bg-purple-400"></div>
              EDIT_PROFILE
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CyberFormField
                  label="USERNAME"
                  name="username"
                  value={profile.username}
                  onChange={handleInputChange}
                  icon={<User size={16} className="text-slate-500" />}
                />

                <CyberFormField
                  label="EMAIL"
                  name="email"
                  type="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  icon={<Mail size={16} className="text-slate-500" />}
                />
              </div>

              <CyberFormField
                label="BIO"
                name="bio"
                value={profile.bio}
                onChange={handleInputChange}
                multiline
                rows={4}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CyberFormField
                  label="LOCATION"
                  name="location"
                  value={profile.location}
                  onChange={handleInputChange}
                  icon={<MapPin size={16} className="text-slate-500" />}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <CyberFormField
                  label="GITHUB"
                  name="githubUsername"
                  type="text"
                  value={profile.githubUsername}
                  onChange={handleInputChange}
                  icon={<Github size={16} className="text-slate-500" />}
                />

                <CyberFormField
                  label="TWITTER"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleInputChange}
                  icon={<Twitter size={16} className="text-slate-500" />}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="secondary"
                  isLoading={isPending}
                  loadingText="SAVING..."
                  leftIcon={<Save size={16} />}
                >
                  SAVE_PROFILE
                </Button>
              </div>
            </form>
          </CyberCardContent>
        </CyberCard>
      </div>
    </div>
  )
}
