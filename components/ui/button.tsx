import type React from "react"
import {
  Button as PrimitiveButton,
  PrimitiveButtonProps,
} from "@/components/ui/primitives/button"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import Spinner from "./spinner"

interface ButtonProps extends PrimitiveButtonProps {
  asChild?: boolean
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const TRANSFORM_POSITION_BY_SIZE = {
  default: {
    in: "-translate-y-7",
    out: "translate-y-7",
  },
  sm: {
    in: "-translate-y-6",
    out: "translate-y-6",
  },
  lg: {
    in: "-translate-y-8",
    out: "translate-y-8",
  },
  xl: {
    in: "-translate-y-9",
    out: "translate-y-9",
  },
  icon: {
    in: "-translate-y-7",
    out: "translate-y-7",
  },
  iconLg: {
    in: "-translate-y-8",
    out: "translate-y-8",
  },
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : PrimitiveButton

    const transformPositionIn = TRANSFORM_POSITION_BY_SIZE[size].in
    const transformPositionOut = TRANSFORM_POSITION_BY_SIZE[size].out
    return (
      <Comp
        ref={ref}
        className={cn(
          "flex items-center justify-center overflow-hidden ease-out active:scale-[0.97]",
          className,
          isLoading ? "ripple-loop" : "",
        )}
        size={size}
        variant={variant}
        disabled={isLoading || props.disabled}
        {...props}
      >
        <div className="relative">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center gap-2 ease-out-quad transition-transform duration-150 -translate-y-7",
              transformPositionIn,
              isLoading ? "translate-y-0 delay-150" : "",
            )}
          >
            <Spinner />
          </div>
          <div
            className={cn(
              "flex translate-y-0 items-center justify-center gap-2 ease-out-quad transition-transform duration-150",
              isLoading ? transformPositionOut : "delay-150",
            )}
          >
            {leftIcon && <span>{leftIcon}</span>}
            {children}
            {rightIcon && <span>{rightIcon}</span>}
          </div>
        </div>
      </Comp>
    )
  },
)

Button.displayName = "Button"
