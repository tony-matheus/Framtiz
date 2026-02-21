import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import MarkdownRender from "@/components/ui/markdown-render"
import { PrimitiveCardTitle } from "@/components/ui/primitives/card"
import { CheckIcon, CopyIcon, XIcon } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface GistPreviewProps {
  content: string
  onClose: () => void
  onApply: () => void
}

export default function GistPreview({
  content,
  onClose,
  onApply,
}: GistPreviewProps) {
  const handleCopyContent = () => {
    navigator.clipboard.writeText(content)
    toast.success("Content copied to clipboard")
    onClose()
  }

  return (
    <Card
      className={cn(
        "relative flex w-full max-w-5xl flex-col overflow-hidden",
        "max-h-full",
      )}
      withCornerAccents={false}
    >
      <CardHeader className="flex gap-2 border-b border-green-600 bg-slate-900">
        <PrimitiveCardTitle>Gist Preview</PrimitiveCardTitle>
      </CardHeader>
      <CardContent className="min-h-0 flex-1 overflow-y-auto">
        <MarkdownRender content={content} />
      </CardContent>
      <CardFooter className="border-t border-green-600 bg-slate-900">
        <Button variant="outline" onClick={onClose}>
          <XIcon size={18} />
          Close
        </Button>
        <div className="ml-auto flex gap-4">
          <Button variant="secondary" onClick={handleCopyContent}>
            <CopyIcon size={18} />
            Copy Content and Close
          </Button>
          <Button onClick={() => onApply()}>
            <CheckIcon size={18} />
            Apply
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
