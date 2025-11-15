"use client"

import { Lock, Sparkles } from "lucide-react"
import { CyberCard, CyberCardContent } from "@/components/ui/card"
import { CyberStatusBadge } from "@/components/ui-custom/cyber-status-badge"

import { Label } from "@/components/ui/label"
import { CyberSwitch } from "@/components/ui-custom/cyber-switch"

export default function SettingsPage() {
  return (
    <div>
      {/* Settings panels */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CyberCard>
          <CyberCardContent>
            <h3 className="mb-4 flex items-center font-mono text-lg text-slate-200">
              <Lock size={18} className="mr-2 text-purple-400" />
              SECURITY_SETTINGS
            </h3>
            {/* Security settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  TWO_FACTOR_AUTHENTICATION
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="twofa" defaultChecked />
                  <Label htmlFor="twofa" className="sr-only">
                    Two-factor authentication
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  SESSION_TIMEOUT
                </div>
                <div className="font-mono text-sm text-purple-300">
                  30_MINUTES
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  API_KEY_ROTATION
                </div>
                <CyberStatusBadge status="warning">PENDING</CyberStatusBadge>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent>
            <h3 className="mb-4 flex items-center font-mono text-lg text-slate-200">
              <Sparkles size={18} className="mr-2 text-purple-400" />
              AI_CONFIGURATION
            </h3>
            {/* AI settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  AI_PROVIDER
                </div>
                <div className="font-mono text-sm text-purple-300">
                  OPENAI_GPT4
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  DESCRIPTION_LENGTH
                </div>
                <div className="font-mono text-sm text-purple-300">MEDIUM</div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  TECH_DETECTION
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="tech-detection" defaultChecked />
                  <Label htmlFor="tech-detection" className="sr-only">
                    Tech detection
                  </Label>
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent>
            <h3 className="mb-4 flex items-center font-mono text-lg text-slate-200">
              <div className="mr-2 size-2 bg-purple-400"></div>
              APPEARANCE_SETTINGS
            </h3>
            {/* Appearance settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  THEME_MODE
                </div>
                <div className="font-mono text-sm text-purple-300">
                  CYBERPUNK
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  ANIMATION_EFFECTS
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="animations" defaultChecked />
                  <Label htmlFor="animations" className="sr-only">
                    Animation effects
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  COLOR_SCHEME
                </div>
                <div className="font-mono text-sm text-purple-300">
                  PURPLE_GREEN
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>

        <CyberCard>
          <CyberCardContent>
            <h3 className="mb-4 flex items-center font-mono text-lg text-slate-200">
              <div className="mr-2 size-2 bg-green-400"></div>
              NOTIFICATION_SETTINGS
            </h3>
            {/* Notification settings */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  EMAIL_NOTIFICATIONS
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="email-notifications" defaultChecked />
                  <Label htmlFor="email-notifications" className="sr-only">
                    Email notifications
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  SECURITY_ALERTS
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="security-alerts" defaultChecked />
                  <Label htmlFor="security-alerts" className="sr-only">
                    Security alerts
                  </Label>
                </div>
              </div>
              <div className="flex items-center justify-between border border-slate-800 p-3">
                <div className="font-mono text-sm text-slate-300">
                  SYSTEM_UPDATES
                </div>
                <div className="flex items-center gap-2">
                  <CyberSwitch id="system-updates" defaultChecked />
                  <Label htmlFor="system-updates" className="sr-only">
                    System updates
                  </Label>
                </div>
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      </div>
    </div>
  )
}
