import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/primitives/dialog"
import { DialogTitle } from "@radix-ui/react-dialog"
import { ReactNode } from "react"
import { Button } from "../button"
import { Save, X } from "lucide-react"

interface SimpleDialogProps {
  open: boolean
  onOpenChange: (arg0: boolean) => void
  title: string
  icon?: ReactNode
  onConfirm?: () => void
  onCancel?: () => void
  isLoading?: boolean
  hideFooter?: boolean
  children: ReactNode
}

export default function SimpleDialog({
  open,
  onOpenChange,
  title,
  icon,
  onConfirm = () => {},
  isLoading = false,
  onCancel = () => {},
  hideFooter = false,
  children,
}: SimpleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showDismiss={false}
        className="mx-auto max-h-[90dvh] max-w-[100vw] overflow-y-auto border-2 border-slate-800 bg-slate-900 p-0 text-slate-200 sm:min-w-[80vw] sm:max-w-[90vw]"
      >
        <DialogHeader>
          <div className="z-10 flex items-center justify-between border-b border-slate-800 bg-slate-900 p-4">
            <DialogTitle className="flex items-center font-mono text-xl font-bold text-slate-200">
              {!!icon && <span className="mr-2 text-purple-400">{icon}</span>}
              <span>{title}</span>
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
        {children}
        {!hideFooter && (
          <DialogFooter className="flex flex-row justify-end gap-3 border-t border-slate-800 bg-slate-900 p-4 ">
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
              loadingText="SAVING..."
              leftIcon={<Save size={16} />}
              disabled={!title.trim()}
            >
              SAVE
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}
