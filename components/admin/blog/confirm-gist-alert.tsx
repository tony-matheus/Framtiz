import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PrimitiveCardTitle } from "@/components/ui/primitives/card"
import { CircleSlashedIcon, HandIcon, XIcon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export default function ConfirmGistAlert({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  const [secondsLeft, setSecondsLeft] = useState(5)
  const prefersReducedMotion = useReducedMotion()
  const hasConfirmedRef = useRef(false)
  const intervalRef = useRef<number | null>(null)

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const confirmNow = useCallback(() => {
    if (hasConfirmedRef.current) return
    hasConfirmedRef.current = true
    stopTimer()
    onConfirm()
  }, [onConfirm, stopTimer])

  const cancelNow = useCallback(() => {
    stopTimer()
    onCancel()
  }, [onCancel, stopTimer])

  const handleDontAskAgain = useCallback(() => {
    localStorage.setItem("gist-preview-dont-ask-again", "true")
    confirmNow()
  }, [confirmNow])

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 0) {
          window.setTimeout(confirmNow, 0)
          return 0
        }
        return Math.max(0, Math.round((s - 0.1) * 10) / 10)
      })
    }, 100)

    return () => stopTimer()
  }, [confirmNow, stopTimer])

  const urgency = Math.min(1, Math.max(0, (2 - secondsLeft) / 2))
  const isUrgent = secondsLeft > 0 && secondsLeft <= 2
  const shakePx = prefersReducedMotion ? 0 : Math.round(urgency * 6)
  const shakeDuration = Math.max(0.22, 0.5 - urgency * 0.28)

  return (
    <Card
      className="z-20 mx-auto flex w-fit flex-col motion-safe:animate-pop"
      withCornerAccents={false}
    >
      <CardHeader className="relative">
        <PrimitiveCardTitle className="flex items-center justify-center gap-2 text-center text-2xl">
          Segura ae, pai! <HandIcon />
        </PrimitiveCardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={cancelNow}
          className="absolute right-2 top-2"
        >
          <XIcon size={18} />
        </Button>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-md mx-auto mb-4 max-w-full text-center  md:max-w-[30ch]">
          Se tu confirmar, tu vai perder o conteúdo que tu já escreveu antes,
          beleuza?
        </p>
        <div className="my-6">
          <div
            className={cn(
              "mb-2 text-center font-mono text-sm font-bold text-slate-300 transition-colors duration-150",
              secondsLeft > 2
                ? "text-green-500"
                : secondsLeft > 1
                  ? "text-amber-400"
                  : "text-red-400",
            )}
          >
            Confirming in {secondsLeft.toFixed(1)}
            {secondsLeft > 0 ? "…" : "."}
          </div>
          <motion.div
            animate={
              isUrgent && !prefersReducedMotion
                ? {
                    scale: 1 + urgency * 0.02,
                    y: [0, -shakePx, shakePx, -shakePx, shakePx, 0],
                  }
                : { scale: 1, y: 0 }
            }
            transition={{
              scale: { duration: 0.12, ease: "easeOut" },
              y: isUrgent
                ? {
                    duration: shakeDuration,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                  }
                : { duration: 0.12, ease: "easeOut" },
            }}
          >
            <div className="h-4 w-full overflow-hidden bg-slate-800">
              <motion.div
                className={cn(
                  "h-full",
                  secondsLeft > 2
                    ? "bg-green-500"
                    : secondsLeft > 1
                      ? "bg-amber-400"
                      : "bg-red-500",
                )}
                initial={{ width: "100%" }}
                animate={{
                  width: `${Math.max(0, (secondsLeft / 5) * 100)}%`,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={cancelNow}
            className="hidden md:flex"
          >
            <XIcon size={18} />
            Cancel
          </Button>

          <Button variant="secondary" onClick={handleDontAskAgain}>
            <CircleSlashedIcon size={18} />
            Suave, me pertuba mais não!
          </Button>
          <Button variant="destructive" onClick={confirmNow} className="flex-1">
            Boto fé
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
