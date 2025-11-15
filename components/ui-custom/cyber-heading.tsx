import { cn } from "@/lib/utils"
import Heading, { HeadingProps } from "../ui/typography/heading"

export default function CyberHeading({
  children,
  className,
  ...restProps
}: HeadingProps) {
  return (
    <Heading
      className={cn(
        "bg-gradient-to-r from-purple-600 to-green-400 bg-clip-text text-transparent",
        className,
      )}
      {...restProps}
    >
      {children}
    </Heading>
  )
}
