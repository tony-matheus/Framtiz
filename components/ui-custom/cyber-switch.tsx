"use client"

import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"

const switchVariants = cva(
  "peer relative shrink-0 cursor-pointer appearance-none rounded-none border-2 border-slate-700 bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-green-600 data-[state=checked]:bg-green-900/30",
  {
    variants: {
      size: {
        lg: "h-9 w-20",
        compact: "h-6 w-12 md:h-9 md:w-20",
        default: "h-6 w-12",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const switchThumbVariants = cva(
  cn(
    "pointer-events-none absolute left-0 top-0 flex items-center justify-center border border-slate-700 bg-slate-900 transition-all data-[state=checked]:border-green-600",
    "after:absolute after:inset-0 after:content-[''] after:bg-gradient-to-br after:from-slate-700 after:to-slate-900 after:opacity-80 data-[state=checked]:after:bg-gradient-to-br data-[state=checked]:after:from-green-400 data-[state=checked]:after:to-green-600",
    "before:absolute before:inset-[3px] before:z-10 before:content-[''] before:bg-slate-800 data-[state=checked]:before:bg-green-900/50",
  ),
  {
    variants: {
      size: {
        lg: "size-8 data-[state=checked]:translate-x-11",
        compact:
          "size-5 data-[state=checked]:translate-x-6 md:size-8 data-[state=checked]:md:translate-x-11",
        default: "size-5 data-[state=checked]:translate-x-6",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

const switchPinVariants = cva(
  "-pulse absolute z-20 rounded-none bg-slate-400 data-[state=checked]:bg-green-400",
  {
    variants: {
      size: {
        lg: "size-2",
        compact: "size-1 md:size-2",
        default: "size-1",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export interface CyberSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {}

const CyberSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  CyberSwitchProps
>(({ className, size, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(switchVariants({ size, className }))}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))}>
      <span className={cn(switchPinVariants({ size }))} />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
))
CyberSwitch.displayName = SwitchPrimitives.Root.displayName

export { CyberSwitch }
