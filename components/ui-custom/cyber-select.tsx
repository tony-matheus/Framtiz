"use client"

import * as React from "react"
import * as SelectUI from "../ui/select"
import { cn } from "@/lib/utils"

const CyberSelect = SelectUI.Select

const CyberSelectGroup = SelectUI.SelectGroup

const CyberSelectValue = SelectUI.SelectValue

const CyberSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectTrigger>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectTrigger>
>(({ className, children, ...props }, ref) => (
  <SelectUI.SelectTrigger
    ref={ref}
    className={cn(
      "flex h-9 w-full items-center justify-between bg-slate-800 border border-slate-700 px-3 py-2 text-sm font-mono text-slate-200 placeholder:text-slate-500 focus:border-purple-500 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50 transition-colors rounded-none",
      "hover:border-slate-600",
      "data-[state=open]:border-purple-500",
      className,
    )}
    {...props}
  >
    {children}
  </SelectUI.SelectTrigger>
))

CyberSelectTrigger.displayName = SelectUI.SelectTrigger.displayName

const CyberSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectUI.SelectScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-slate-400",
      className,
    )}
    {...props}
  />
))
CyberSelectScrollUpButton.displayName =
  SelectUI.SelectScrollUpButton.displayName

const CyberSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectUI.SelectScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1 text-slate-400",
      className,
    )}
    {...props}
  />
))
CyberSelectScrollDownButton.displayName =
  SelectUI.SelectScrollDownButton.displayName

const CyberSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectContent>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectContent>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectUI.SelectContent
    ref={ref}
    className={cn(
      "relative z-50 max-h-96 min-w-[8rem] overflow-hidden bg-slate-900 border border-slate-700 text-slate-200 shadow-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-none",
      position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className,
    )}
    position={position}
    {...props}
  >
    {children}
  </SelectUI.SelectContent>
))
CyberSelectContent.displayName = SelectUI.SelectContent.displayName

const CyberSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectLabel>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectLabel>
>(({ className, ...props }, ref) => (
  <SelectUI.SelectLabel
    ref={ref}
    className={cn(
      "py-1.5 pl-8 pr-2 text-xs font-mono text-purple-400",
      className,
    )}
    {...props}
  />
))
CyberSelectLabel.displayName = SelectUI.SelectLabel.displayName

const CyberSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectItem>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectItem>
>(({ className, children, ...props }, ref) => (
  <SelectUI.SelectItem
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center py-2 pl-8 pr-2 text-sm font-mono text-slate-200 outline-none focus:bg-slate-800 focus:text-purple-400 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 rounded-none",
      "hover:bg-slate-800 hover:text-purple-400",
      className,
    )}
    {...props}
  >
    {children}
  </SelectUI.SelectItem>
))
CyberSelectItem.displayName = SelectUI.SelectItem.displayName

const CyberSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectUI.SelectSeparator>,
  React.ComponentPropsWithoutRef<typeof SelectUI.SelectSeparator>
>(({ className, ...props }, ref) => (
  <SelectUI.SelectSeparator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-700", className)}
    {...props}
  />
))
CyberSelectSeparator.displayName = SelectUI.SelectSeparator.displayName

export {
  CyberSelect,
  CyberSelectGroup,
  CyberSelectValue,
  CyberSelectTrigger,
  CyberSelectContent,
  CyberSelectLabel,
  CyberSelectItem,
  CyberSelectSeparator,
  CyberSelectScrollUpButton,
  CyberSelectScrollDownButton,
}
