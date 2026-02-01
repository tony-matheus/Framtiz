"use client"

import * as React from "react"
import {
  PrimitiveCheckbox,
  PrimitiveCheckboxProps,
} from "./primitives/checkbox"
import { cn } from "@/lib/utils"
import { Label } from "@radix-ui/react-label"

export interface CheckboxProps extends PrimitiveCheckboxProps {
  label?: string | null
}

const Checkbox = React.forwardRef<
  React.ElementRef<typeof PrimitiveCheckbox>,
  CheckboxProps
>(({ className, label, ...props }, ref) => (
  <div className="inline-flex items-center justify-center gap-2">
    <PrimitiveCheckbox ref={ref} className={cn(className)} {...props} />
    {label && (
      <Label
        htmlFor={props.id}
        className="cursor-pointer text-sm font-medium leading-none"
      >
        {label}
      </Label>
    )}
  </div>
))
Checkbox.displayName = PrimitiveCheckbox.displayName

export { Checkbox }
