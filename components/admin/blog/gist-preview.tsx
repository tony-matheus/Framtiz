import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import MarkdownRender from "@/components/ui/markdown-render"
import { PrimitiveCardTitle } from "@/components/ui/primitives/card"
import { CheckIcon, CircleSlashedIcon, CopyIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface GistPreviewProps {
  content: string
  onClose: () => void
  onApply: () => void
}

const ConfirmationAlert = ({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5)
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
        if (s <= 1) {
          window.setTimeout(confirmNow, 0)
          return 0
        }
        return s - 1
      })
    }, 1000)

    return () => stopTimer()
  }, [confirmNow, stopTimer])

  return (
    <Card
      className="motion-safe:animate-pop z-20 mx-auto flex w-fit flex-col"
      withCornerAccents={false}
    >
      <CardHeader className="flex flex-row items-center justify-center">
        <PrimitiveCardTitle className="text-center text-2xl">
          Segura ae, pai!
        </PrimitiveCardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={cancelNow}
          className="inline-flex md:hidden"
        >
          <XIcon size={18} />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="mx-auto mb-4 max-w-full text-center text-lg font-bold md:max-w-[30ch]">
          Se tu confirmar, tu vai perder o conteúdo que tu já escreveu antes,
          beleuza?
        </p>
        <div className="mb-4">
          <div className="mb-2 text-center font-mono text-sm text-slate-300">
            Confirming in {secondsLeft}
            {secondsLeft > 0 ? "…" : "."}
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className="h-full bg-green-500"
              initial={{ width: "100%" }}
              animate={{ width: `${Math.max(0, (secondsLeft / 5) * 100)}%` }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          </div>
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
          <Button variant="destructive" onClick={confirmNow}>
            Boto fé
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function GistPreview({
  content,
  onClose,
  onApply,
}: GistPreviewProps) {
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false)
  const handleCopyContent = () => {
    navigator.clipboard.writeText(content)
    toast.success("Content copied to clipboard")
    onClose()
  }

  const handleApply = () => {
    // if (localStorage.getItem("gist-preview-dont-ask-again") === "true") {
    //   return onApply()
    // }

    setShowConfirmationAlert(true)
  }

  return (
    <Card
      className={cn(
        "relative flex h-full max-h-full max-w-full flex-col",
        showConfirmationAlert ? "overflow-hidden" : "overflow-y-auto",
      )}
      withCornerAccents={false}
    >
      <CardHeader className="sticky top-0 z-10 flex gap-2 border-b border-green-600 bg-slate-900">
        <PrimitiveCardTitle>Gist Preview</PrimitiveCardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <MarkdownRender content={content} />a
      </CardContent>
      <CardFooter className="sticky bottom-0 border-t border-green-600 bg-slate-900">
        <Button variant="outline" onClick={onClose}>
          <XIcon size={18} />
          Close
        </Button>
        <div className="ml-auto flex gap-4">
          <Button variant="secondary" onClick={handleCopyContent}>
            <CopyIcon size={18} />
            Copy Content and Close
          </Button>
          <Button onClick={handleApply}>
            <CheckIcon size={18} />
            Apply
          </Button>
        </div>
      </CardFooter>
      {showConfirmationAlert && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/80 p-4 md:p-8">
          <ConfirmationAlert
            onCancel={() => setShowConfirmationAlert(false)}
            onConfirm={() => {
              setShowConfirmationAlert(false)
              onApply()
            }}
          />
        </div>
      )}
    </Card>
  )
}
