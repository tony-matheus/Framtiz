"use client"

import * as React from "react"
import { PrimitiveCheckbox } from "./primitives/checkbox"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof PrimitiveCheckbox>,
  React.ComponentPropsWithoutRef<typeof PrimitiveCheckbox>
>(({ className, ...props }, ref) => (
  <PrimitiveCheckbox
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 border border-slate-600 bg-slate-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-500 data-[state=checked]:text-slate-100",
      "hover:border-purple-500 transition-colors",
      className
    )}
    {...props}
  />
))
Checkbox.displayName = PrimitiveCheckbox.displayName

export { Checkbox }
