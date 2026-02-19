import { GithubGist } from "@/app/api/github/gists/route"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { ClockIcon, ExternalLinkIcon, FileIcon } from "lucide-react"
import { PrimitiveCheckbox } from "@/components/ui/primitives/checkbox"

export default function GistSelector({
  gists,
  onSelect,
  selectedGists,
}: {
  gists: GithubGist[]
  onSelect: (gist: GithubGist) => void
  selectedGists: GithubGist[]
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="border border-slate-800 bg-slate-900">
      <Table>
        <TableHeader className="border-b border-slate-800 bg-slate-900">
          <TableRow className="border-none hover:bg-transparent">
            <TableHead className="w-[60px] py-3 font-mono text-xs text-slate-400">
              SELECT
            </TableHead>
            <TableHead className="py-3 font-mono text-xs text-slate-400">
              GIST
            </TableHead>
            <TableHead className="w-[100px] py-3 text-center font-mono text-xs text-slate-400">
              n# of files
            </TableHead>
            <TableHead className="w-[150px] py-3 font-mono text-xs text-slate-400">
              UPDATED
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gists.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="p-6 text-center text-slate-400">
                No gists found matching your search criteria.
              </TableCell>
            </TableRow>
          ) : (
            gists.map((gist) => {
              const isSelected = selectedGists.some((g) => g.id === gist.id)
              const isDisabled = selectedGists.length >= 8 && !isSelected

              return (
                <TableRow
                  key={gist.id}
                  className={cn("group border-b border-slate-800", {
                    "opacity-50": isDisabled,
                    "hover:bg-slate-800/50 ": !isDisabled,
                    "bg-purple-900/30 border-y border-purple-600 hover:bg-purple-900/90":
                      isSelected,
                  })}
                >
                  <TableCell>
                    <div className="flex items-center">
                      <PrimitiveCheckbox
                        checked={isSelected}
                        onCheckedChange={() => onSelect(gist)}
                        disabled={isDisabled}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={gist.url}
                      className="inline-block font-mono text-sm font-bold text-slate-200 hover:text-purple-400"
                    >
                      <div className="flex items-center gap-2">
                        {gist.name}
                        <ExternalLinkIcon size={12} />
                      </div>
                    </a>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center text-slate-300">
                      <FileIcon size={14} className="mr-1 text-yellow-500" />
                      <p>{Object.keys(gist.files).length}</p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center text-xs text-slate-300">
                      <ClockIcon size={14} className="mr-1 text-green-400" />
                      <p>{formatDate(gist.updated_at)}</p>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </div>
  )
}
