import { FieldValues, UseControllerProps } from "react-hook-form"
import Input from "../../../ui/input"
import {
  CyberFormControl,
  CyberFormField,
  CyberFormItem,
  CyberFormLabel,
  CyberFormMessage,
} from "../cyber-form"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

type CyberFormInputProps<T extends FieldValues> = UseControllerProps<T> &
  React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string
    label?: string
    icon?: ReactNode
    placeholder?: string
  }

export default function CyberFormInput<T extends FieldValues>({
  name,
  control,
  label,
  icon,
  placeholder,
  className,
  ...rest
}: CyberFormInputProps<T>) {
  return (
    <CyberFormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <CyberFormItem className="w-full space-y-0">
          {label && <CyberFormLabel>{label}</CyberFormLabel>}

          <CyberFormControl>
            <Input
              icon={icon}
              {...field}
              className={cn(
                fieldState.error ? "border-red-500" : "",
                className,
              )}
              value={field.value ?? ""}
              placeholder={placeholder}
              {...rest}
            />
          </CyberFormControl>
          <CyberFormMessage />
        </CyberFormItem>
      )}
    />
  )
}
