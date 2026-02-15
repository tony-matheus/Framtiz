import {
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogFooter,
  DialogHeader,
} from "@/components/ui/primitives/dialog"
import { Button } from "@/components/ui/button"
import { GithubIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ImportGistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

export default function ImportGistDialog({
  open,
  onOpenChange,
  className,
}: ImportGistDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showDismiss={false}
        className={cn("!min-h-[90vh] md:!max-w-[80vw]", className)}
      >
        <div className="flex h-full flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center font-mono text-xl font-bold text-slate-200">
                <span className="mr-2 text-purple-400">
                  <GithubIcon />
                </span>
                <span>Import Gist</span>
              </DialogTitle>
              <Button
                variant="outline"
                size="icon"
                onClick={() => onOpenChange(false)}
              >
                <X size={18} />
              </Button>
            </div>
          </DialogHeader>
          <div className="flex-1 p-4"></div>

          {/* <DialogFooter className="flex flex-row justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                onCancel()
                onOpenChange(false)
              }}
            >
              CANCEL
            </Button>
            <Button
              variant="secondary"
              onClick={onConfirm}
              isLoading={isLoading}
              leftIcon={<Save size={16} />}
              disabled={!title.trim()}
            >
              SAVE
            </Button>
          </DialogFooter> */}
        </div>
      </DialogContent>
    </Dialog>
  )
}
