"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            'group toast group-[.toaster]:bg-[#020617]/90 group-[.toaster]:text-purple-400 group-[.toaster]:border-purple-400 group-[.toaster]:border-border group-[.toaster]:shadow-lg !border-0 !border-l-4 !backdrop-blur-sm !rounded-none',
          ),
          description: "text-sm",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: "!border-green-400 !text-green-400",
          warning: "!border-yellow-400 !text-yellow-400",
          error: "!border-red-400 !text-red-400",
          content: "font-mono text-xs",
        },
      }}
      duration={5000}
      {...props}
    />
  )
}

export { Toaster }
