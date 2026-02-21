import { GithubRepo } from "@/app/api/github/repos/route"
import { Button } from "@/components/ui/button"
import { CyberProgress } from "@/components/ui-custom/cyber-progress"
import { useCreateProjectsWithLogging } from "@/hooks/projects/mutations/use-create-projects"
import { cn } from "@/lib/utils"
import { RefreshCw, Save, X } from "lucide-react"
import { useRef } from "react"

interface ProjectCreationProps {
  selectedRepos: GithubRepo[]
  onSave: () => void
  onClean: () => void
}

export default function ProjectCreation({
  selectedRepos,
  onSave,
  onClean,
}: ProjectCreationProps) {
  const logContainerRef = useRef<HTMLDivElement>(null)

  const {
    progress,
    saving,
    createProjectsWithLogging,
    failedRepos,
    hasError,
    logs,
    successful,
  } = useCreateProjectsWithLogging(logContainerRef, onSave)

  return (
    <div className="overflow-hidden rounded-t bg-gradient-to-r from-purple-600 to-green-400 p-px transition-all">
      <div className="rounded-t bg-slate-900 p-4">
        <div
          className={cn(
            "mb-6 justify-between items-end",
            saving || hasError ? "flex" : "hidden",
          )}
        >
          <CyberProgress
            value={progress}
            status={hasError ? "danger" : "default"}
            label={
              hasError && !saving
                ? `${failedRepos.length} Failed`
                : `${progress}% processed`
            }
          />
        </div>

        <div
          ref={logContainerRef}
          className={cn(
            "bg-black text-white my-4 p-4 rounded-md min-h-[200px] overflow-y-auto max-h-[300px] font-mono text-sm",
            logs.length > 0 ? "block" : "hidden",
          )}
        >
          {logs.map((log, index) => (
            <p key={index} className="whitespace-pre-wrap">
              {log}
            </p>
          ))}
        </div>

        <div className="flex items-center justify-between ">
          <p className="text-slate-300">
            <span className="font-mono">{selectedRepos.length}</span> repos
            selected
          </p>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              leftIcon={<X size={16} />}
              onClick={onClean}
            >
              {successful ? "CLOSE" : "CLEAR_SELECTION"}
            </Button>

            {!successful && (
              <Button
                variant={hasError ? "destructive" : "secondary"}
                leftIcon={
                  hasError ? <RefreshCw size={16} /> : <Save size={16} />
                }
                onClick={() => createProjectsWithLogging(selectedRepos)}
                isLoading={saving}
              >
                {hasError ? "RETRY" : "SAVE_SELECTION"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
