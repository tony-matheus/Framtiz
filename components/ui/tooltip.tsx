import {
  PrimitiveTooltip,
  PrimitiveTooltipContent,
  PrimitiveTooltipTrigger,
} from "./primitives/tooltip"

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export default function Tooltip({ children, content }: TooltipProps) {
  return (
    <PrimitiveTooltip>
      <PrimitiveTooltipTrigger asChild>{children}</PrimitiveTooltipTrigger>
      <PrimitiveTooltipContent>{content}</PrimitiveTooltipContent>
    </PrimitiveTooltip>
  )
}
