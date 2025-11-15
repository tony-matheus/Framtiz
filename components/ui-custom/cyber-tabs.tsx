"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import * as CoreTabs from "../ui/tabs"

const CyberTabsRoot = CoreTabs.Tabs

const CyberTabsList = React.forwardRef<
  React.ElementRef<typeof CoreTabs.TabsList>,
  React.ComponentPropsWithoutRef<typeof CoreTabs.TabsList>
>(({ className, ...props }, ref) => (
  <CoreTabs.TabsList
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center bg-slate-900 border border-slate-800 p-1 text-slate-400",
      className,
    )}
    {...props}
  />
))
CyberTabsList.displayName = CoreTabs.TabsList.displayName

const CyberTabsTrigger = React.forwardRef<
  React.ElementRef<typeof CoreTabs.TabsTrigger>,
  React.ComponentPropsWithoutRef<typeof CoreTabs.TabsTrigger>
>(({ className, ...props }, ref) => (
  <CoreTabs.TabsTrigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-mono font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-purple-900/30 data-[state=active]:text-purple-300 data-[state=active]:border data-[state=active]:border-purple-600 hover:text-slate-200 hover:bg-slate-800/50 relative",
      className,
    )}
    {...props}
  />
))
CyberTabsTrigger.displayName = CoreTabs.TabsTrigger.displayName

const CyberTabsContent = React.forwardRef<
  React.ElementRef<typeof CoreTabs.TabsContent>,
  React.ComponentPropsWithoutRef<typeof CoreTabs.TabsContent>
>(({ className, ...props }, ref) => (
  <CoreTabs.TabsContent
    ref={ref}
    className={cn(
      "mt-6 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
))
CyberTabsContent.displayName = CoreTabs.TabsContent.displayName

export type Tab = {
  name: string
  component: React.ReactNode
  content?: React.ReactNode
  asChild: boolean
}

interface CyberTabsProps {
  tabs: Tab[]
  activeTabName?: string | undefined
  linkBased?: boolean
  onTabChange?: (() => void) | undefined
}

export default function CyberTabs({
  tabs,
  activeTabName,
  onTabChange,
  linkBased = false,
}: CyberTabsProps) {
  return (
    <CyberTabsRoot
      value={activeTabName}
      onValueChange={onTabChange}
      className="w-full"
    >
      <CyberTabsList className="mb-8 flex w-full items-center gap-2">
        {tabs.map(({ name, component, asChild }) => (
          <CyberTabsTrigger
            key={name}
            value={name}
            className="flex flex-1 items-center gap-2"
            asChild={asChild}
          >
            {component}
          </CyberTabsTrigger>
        ))}
      </CyberTabsList>
      {!linkBased &&
        tabs.map(({ name, content }) => (
          <CyberTabsContent key={name} value={name}>
            {content}
          </CyberTabsContent>
        ))}
    </CyberTabsRoot>
  )
}

export { CyberTabsRoot, CyberTabsList, CyberTabsTrigger, CyberTabsContent }
