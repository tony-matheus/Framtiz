"use client"

import type React from "react"
import { PrimitiveInput } from "@/components/ui/primitives/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface CyberFormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  value?: string
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
  className?: string
  labelClassName?: string
  inputClassName?: string
  required?: boolean
  disabled?: boolean
  multiline?: boolean
  rows?: number
  icon?: ReactNode
  error?: string
}

export function CyberFormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  labelClassName,
  inputClassName,
  required = false,
  disabled = false,
  multiline = false,
  rows = 4,
  icon,
  error,
}: CyberFormFieldProps) {
  const hasError = Boolean(error)

  return (
    <div className={cn("space-y-2", className)}>
      <Label
        htmlFor={name}
        className={cn("text-slate-400 text-sm font-mono", labelClassName)}
      >
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700">
            {icon}
          </div>
        )}

        {multiline ? (
          <Textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            rows={rows}
            className={cn(
              "w-full bg-slate-800 border text-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0",
              hasError
                ? "border-red-500 focus-visible:border-red-500"
                : "border-slate-700 focus-visible:border-purple-600",
              icon && "pl-12",
              inputClassName,
            )}
            required={required}
            disabled={disabled}
          />
        ) : (
          <PrimitiveInput
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={cn(
              "w-full bg-slate-800 border text-slate-200 focus-visible:ring-0 focus-visible:ring-offset-0",
              hasError
                ? "border-red-500 focus-visible:border-red-500"
                : "border-slate-700 focus-visible:border-purple-600",
              icon && "pl-12",
              inputClassName,
            )}
            required={required}
            disabled={disabled}
          />
        )}
      </div>

      {hasError && <p className="font-mono text-xs text-red-500">{error}</p>}
    </div>
  )
}
