import { forwardRef, ReactNode } from "react"
import { PrimitiveInput } from "./primitives/input"
import { cn } from "@/lib/utils"
import { Label } from "./label"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = "text", className, icon, ...props }: InputProps, ref) => {
    return (
      <div className="w-full">
        {!!label && <Label className="mb-2 block">{label}</Label>}
        <div className="relative w-full">
          {!!icon && (
            <div className="absolute inset-y-0 left-0 flex w-10 items-center justify-center border-r border-slate-700">
              {icon}
            </div>
          )}
          <PrimitiveInput
            ref={ref}
            type={type}
            className={cn(
              "w-full border border-slate-700 bg-slate-800 p-3 text-slate-200 outline-none transition-colors focus:border-purple-600",
              !!icon && "pl-12",
              className,
            )}
            {...props}
          />
        </div>
      </div>
    )
  },
)

Input.displayName = "Input"

export default Input
