import * as React from "react"

import { cn } from "@/lib/utils"

const PrimitiveCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    withCornerAccents?: boolean
  }
>(({ className, children, withCornerAccents = false, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-slate-900 rounded-none border-slate-800 text-slate-200 border shadow relative group",
      className,
    )}
    {...props}
  >
    {children}
    {withCornerAccents && (
      <>
        <div className="absolute -left-1 -top-1 hidden size-3 bg-purple-600 group-hover:block"></div>
        <div className="absolute -bottom-1 -right-1 hidden size-3 bg-green-400 group-hover:block"></div>
      </>
    )}
  </div>
))
PrimitiveCard.displayName = "PrimitiveCard"

const PrimitiveCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-4", className)}
    {...props}
  />
))
PrimitiveCardHeader.displayName = "PrimitiveCardHeader"

const PrimitiveCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
PrimitiveCardTitle.displayName = "PrimitiveCardTitle"

const PrimitiveCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
PrimitiveCardDescription.displayName = "PrimitiveCardDescription"

const PrimitiveCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-4 pt-0", className)} {...props} />
))
PrimitiveCardContent.displayName = "PrimitiveCardContent"

const PrimitiveCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-4 pt-0", className)}
    {...props}
  />
))
PrimitiveCardFooter.displayName = "PrimitiveCardFooter"

export {
  PrimitiveCard,
  PrimitiveCardHeader,
  PrimitiveCardFooter,
  PrimitiveCardTitle,
  PrimitiveCardDescription,
  PrimitiveCardContent,
}
