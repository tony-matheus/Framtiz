import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/primitives/dialog"
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
  className?: string
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
  className,
  children,
}: SimpleDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showDismiss={false} className={className}>
        <div className="flex h-full flex-col">
          <DialogHeader>
            <div className="flex items-center justify-between">
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
          <div className="flex-1 p-4">{children}</div>
          {!hideFooter && (
            <DialogFooter className="flex flex-row justify-end gap-3">
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
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
