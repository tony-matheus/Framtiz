import { cn } from "@/lib/utils"
import {
  PrimitiveCard,
  PrimitiveCardContent,
  PrimitiveCardFooter,
  PrimitiveCardHeader,
} from "@/components/ui/primitives/card"
import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  footerClassName?: string
  withCornerAccents?: boolean
}

export function Card({
  children,
  className,
  // headerClassName,
  // contentClassName,
  // footerClassName,
  withCornerAccents = true,
}: CardProps) {
  return (
    <PrimitiveCard
      className={cn(
        "bg-slate-900 rounded-none border-slate-800 text-slate-200 relative group",
        className,
      )}
    >
      {children}
      {withCornerAccents && (
        <>
          <div className="absolute -left-1 -top-1 hidden size-3 bg-purple-600 group-hover:block"></div>
          <div className="absolute -bottom-1 -right-1 hidden size-3 bg-green-400 group-hover:block"></div>
        </>
      )}
    </PrimitiveCard>
  )
}

export function CardHeader({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <PrimitiveCardHeader className={cn("p-4", className)}>
      {children}
    </PrimitiveCardHeader>
  )
}

export function CardContent({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <PrimitiveCardContent className={cn("p-4", className)}>
      {children}
    </PrimitiveCardContent>
  )
}

export function CardFooter({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <PrimitiveCardFooter className={cn("p-4", className)}>
      {children}
    </PrimitiveCardFooter>
  )
}
