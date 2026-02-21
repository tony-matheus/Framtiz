import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/primitives/dialog"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { CyberPagination } from "@/components/ui-custom/cyber-pagination"
import { Button } from "@/components/ui/button"
import { GithubIcon, X } from "lucide-react"
import { cn } from "@/lib/utils"
import GistListContext, {
  useGistListActions,
  useGistListState,
} from "../gist-list/gist-list-context"
import GistSelectorSkeleton from "../gist-list/gist-list-skeleton"
import { CyberErrorState } from "@/components/ui-custom/cyber-error-state"
import EmptyState from "../../empty-state"
import GistSelector from "../gist-list/gist-selector"
interface ImportGistDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

function GistDialog({ open, onOpenChange, className }: ImportGistDialogProps) {
  const { gists, selectedGists, isLoading, isError, totalPages, currentPage } =
    useGistListState()
  const { goToPage, onSelectGist } = useGistListActions()

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
          <div className="flex-1 p-4">
            {isLoading && <GistSelectorSkeleton count={10} />}
            {/* Error State */}
            {!isLoading && isError && (
              <CyberErrorState
                title="DATA_RETRIEVAL_ERROR"
                message="Something went wrong."
                onRetry={() => {}}
              />
            )}

            {/* Empty State */}
            {!isLoading && !isError && gists.length === 0 && (
              <EmptyState
                title="NO_PROJECTS_SELECTED"
                description="You haven't selected any projects to display on your portfolio yet."
                actionLabel="ADD_PROJECT"
                onAction={() => {}}
              />
            )}
            {!isLoading && !isError && gists.length > 1 && (
              <GistSelector
                gists={gists}
                onSelect={onSelectGist}
                selectedGists={selectedGists}
              />
            )}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12 mt-8"
              >
                <Card className="mx-auto inline-block">
                  <CardContent className="p-2 sm:p-4">
                    <CyberPagination
                      totalPages={totalPages}
                      currentPage={currentPage}
                      onPageChange={goToPage}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          <DialogFooter
            className="flex items-center justify-between
          gap-3"
          >
            <div className="text-sm text-muted-foreground">
              {selectedGists.length} gists selected
            </div>
            <div className="flex flex-row justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  // onCancel()
                  onOpenChange(false)
                }}
              >
                CANCEL
              </Button>
              <Button
                variant="secondary"
                // onClick={onConfirm}
                // isLoading={isLoading}
                // leftIcon={<Save size={16} />}
                // disabled={!title.trim()}
              >
                SAVE
              </Button>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function ImportGistDialog({
  open,
  onOpenChange,
}: ImportGistDialogProps) {
  return (
    <GistListContext enabled={open}>
      <GistDialog open={open} onOpenChange={onOpenChange} />
    </GistListContext>
  )
}
