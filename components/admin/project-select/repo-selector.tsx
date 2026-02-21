"use client"

import { Star, Clock, Plus, Check, ExternalLink } from "lucide-react"
import { GithubRepo } from "@/app/api/github/repos/route"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import CyberSearchInput from "@/components/ui-custom/inputs/cyber-search-input"

interface RepoSelectorProps {
  repos: GithubRepo[]
  selectedRepos: GithubRepo[]
  setSelectedRepos: (repos: GithubRepo[]) => void
}

export default function RepoSelector({
  repos,
  selectedRepos,
  setSelectedRepos,
}: RepoSelectorProps) {
  // Toggle repo selection
  const toggleRepoSelection = (repo: GithubRepo) => {
    if (selectedRepos.some((r) => r.id === repo.id)) {
      setSelectedRepos(selectedRepos.filter((r) => r.id !== repo.id))
    } else {
      if (selectedRepos.length < 8) {
        setSelectedRepos([...selectedRepos, repo])
      }
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="mb-8">
      {/* Search and filters */}
      <div className="mb-4 flex flex-col gap-4 md:flex-row">
        <CyberSearchInput onSearch={() => {}} />
        <div className="flex items-center text-sm text-slate-300">
          <span className="mr-2 font-mono">SELECTED:</span>
          <span className="border border-purple-600 bg-purple-900/30 px-2 py-1 font-mono">
            {selectedRepos.length}/{repos.length}
          </span>
        </div>
      </div>

      {/* Repository table */}
      <div className="border border-slate-800 bg-slate-900">
        <Table>
          <TableHeader className="border-b border-slate-800 bg-slate-900">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-[60px] py-3 font-mono text-xs text-slate-400">
                SELECT
              </TableHead>
              <TableHead className="py-3 font-mono text-xs text-slate-400">
                REPOSITORY
              </TableHead>
              <TableHead className="w-[100px] py-3 text-center font-mono text-xs text-slate-400">
                STARS
              </TableHead>
              <TableHead className="w-[150px] py-3 font-mono text-xs text-slate-400">
                UPDATED
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {repos.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="p-6 text-center text-slate-400"
                >
                  No repositories found matching your search criteria.
                </TableCell>
              </TableRow>
            ) : (
              repos.map((repo) => {
                const isSelected = selectedRepos.some((r) => r.id === repo.id)
                const isDisabled = selectedRepos.length >= 8 && !isSelected

                return (
                  <motion.tr
                    key={repo.id}
                    className={cn("group border-b border-slate-800", {
                      "opacity-50": isDisabled,
                      "hover:bg-slate-800/50 ": !isDisabled,
                      "bg-purple-900/30 border-y border-purple-600 hover:bg-purple-900/90":
                        isSelected,
                    })}
                  >
                    <TableCell>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleRepoSelection(repo)}
                        disabled={isDisabled}
                      >
                        {isSelected ? <Check size={16} /> : <Plus size={16} />}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <a
                        href={repo.url}
                        className="font-mono text-sm text-slate-200 group-hover:font-bold group-hover:text-purple-400"
                      >
                        <div className="flex items-center gap-2">
                          {repo.name}
                          <ExternalLink size={12} />
                        </div>
                      </a>
                      <p className="mt-1 text-xs text-slate-400">
                        {repo.description}
                      </p>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center text-slate-300">
                        <Star size={14} className="mr-1 text-yellow-500" />
                        <p>{repo.watchers_count}</p>
                      </div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center text-xs text-slate-300">
                        <Clock size={14} className="mr-1 text-green-400" />
                        <p>{formatDate(repo.updated_at)}</p>
                      </div>
                    </TableCell>
                  </motion.tr>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
