import { FieldValues, UseControllerProps } from "react-hook-form"
import {
  CyberFormControl,
  CyberFormField,
  CyberFormItem,
  CyberFormLabel,
  CyberFormMessage,
} from "../cyber-form"
import { ReactNode } from "react"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

type CyberFormTextareaProps<T extends FieldValues> = UseControllerProps<T> & {
  label?: string
  icon?: ReactNode
  placeholder?: string
  className?: string
}

export default function CyberFormTextarea<T extends FieldValues>({
  className,
  name,
  control,
  label,
}: CyberFormTextareaProps<T>) {
  return (
    <CyberFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <CyberFormItem>
          {label && <CyberFormLabel>{label}</CyberFormLabel>}

          <CyberFormControl>
            <Textarea
              className={cn(
                "border border-slate-700 bg-slate-800 p-4 font-mono text-slate-200 outline-none transition-colors focus:border-purple-600",
                fieldState.error && "border-red-500",
                className,
              )}
              {...field}
              value={field.value ?? ""}
            />
          </CyberFormControl>
          <CyberFormMessage />
        </CyberFormItem>
      )}
    />
  )
}
