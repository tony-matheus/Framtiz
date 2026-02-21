"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import RepoSelector from "@/components/admin/project-select/repo-selector"
import { useGithubRepos } from "@/hooks/github/use-github-repos"
import { GithubRepo } from "@/app/api/github/repos/route"
import { Card, CardContent } from "@/components/ui/card"
import { CyberPagination } from "@/components/ui-custom/cyber-pagination"
import EmptyState from "../empty-state"
import { CyberErrorState } from "@/components/ui-custom/cyber-error-state"
import ProjectCreation from "./project-creation"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

const ITEM_PER_PAGE = 10

export default function RepoList() {
  const [selectedRepos, setSelectedRepos] = useState<GithubRepo[]>([])

  const { data, totalPages, currentPage, goToPage, isLoading, isError } =
    useGithubRepos(1, ITEM_PER_PAGE)

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(ITEM_PER_PAGE)
      .fill(0)
      .map((_, index) => (
        <motion.div
          key={`skeleton-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 * index }}
        >
          <Skeleton
            className={cn(
              "w-full border-b border-slate-300/50 bg-slate-800/50",
              index === 0 ? "h-[41px]" : "h-[57px]",
            )}
          />
        </motion.div>
      ))
  }

  return (
    <div>
      {isLoading && renderSkeletons()}

      {/* Error State */}
      {!isLoading && isError && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <CyberErrorState
            title="DATA_RETRIEVAL_ERROR"
            message="Something went wrong."
            onRetry={() => {}}
          />
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !isError && data.length === 0 && (
        <EmptyState
          title="NO_PROJECTS_SELECTED"
          description="You haven't selected any projects to display on your portfolio yet."
          actionLabel="ADD_PROJECT"
          onAction={() => {}}
        />
      )}
      {!isLoading && !isError && data.length > 1 && (
        <RepoSelector
          repos={data}
          selectedRepos={selectedRepos}
          setSelectedRepos={setSelectedRepos}
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

      {/* Bottom action bar */}
      <AnimatePresence>
        {selectedRepos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-x-0 bottom-4 z-10 px-4"
          >
            <ProjectCreation
              selectedRepos={selectedRepos}
              onSave={() => {}}
              onClean={() => setSelectedRepos([])}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
