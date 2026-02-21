"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"

import { cn } from "@/lib/utils"
import { cva, VariantProps } from "class-variance-authority"
import { CheckAnimated } from "./animatedIcons/check-animated"

const checkboxVariants = cva(
  "peer relative inline-flex size-4 shrink-0 items-center justify-center border border-slate-600 bg-slate-900 align-middle leading-none transition-colors hover:border-purple-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:text-slate-100",
  {
    variants: {
      size: {
        sm: "size-3",
        lg: "size-6",
        xl: "size-8",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  },
)

export interface PrimitiveCheckboxProps
  extends
    React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof checkboxVariants> {
  size?: "sm" | "lg" | "xl"
}

enum CheckboxIconSize {
  sm = 12,
  lg = 16,
  xl = 24,
}

const PrimitiveCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  PrimitiveCheckboxProps
>(({ className, size, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(checkboxVariants({ size }), className)}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <CheckAnimated animateOnEnter size={CheckboxIconSize[size ?? "lg"]} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
PrimitiveCheckbox.displayName = CheckboxPrimitive.Root.displayName

export { PrimitiveCheckbox }
