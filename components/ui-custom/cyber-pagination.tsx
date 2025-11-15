"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams, useRouter } from "next/navigation"

interface CyberPaginationProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
  showControls?: boolean
  enableSearchParams?: boolean
}

export function CyberPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
  showControls = true,
  enableSearchParams = true,
}: CyberPaginationProps) {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleOnPageChange = (page: number) => {
    if (enableSearchParams) {
      const params = new URLSearchParams(searchParams)
      params.set("page", String(page))

      router.replace(`${pathname}?${params.toString()}`)
    }

    onPageChange(page)
  }

  const generatePagination = () => {
    // Always show first and last page
    // For small number of pages, show all
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    // For many pages, show current page, one before and after, first and last page
    const pages = [1]

    // Add ellipsis if needed
    if (currentPage > 3) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add pages around current page
    const startPage = Math.max(2, currentPage - 1)
    const endPage = Math.min(totalPages - 1, currentPage + 1)

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    // Add ellipsis if needed
    if (currentPage < totalPages - 2) {
      pages.push(-1) // -1 represents ellipsis
    }

    // Add last page if not already included
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pages = generatePagination()

  return (
    <Pagination className={cn("", className)}>
      <PaginationContent className="flex items-center gap-1 sm:gap-2">
        {showControls && (
          <PaginationItem>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={cn(
                "h-8 w-8 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200 hover:border-purple-600 rounded-none",
                currentPage === 1 && "opacity-50 pointer-events-none",
              )}
              aria-label="Go to previous page"
            >
              <ChevronLeft className="size-4" />
            </button>
          </PaginationItem>
        )}

        {pages.map((page, i) =>
          page === -1 ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis className="flex size-8 items-center justify-center text-slate-500" />
            </PaginationItem>
          ) : (
            <PaginationItem key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "h-8 w-8 flex items-center justify-center font-mono text-sm rounded-none",
                  page === currentPage
                    ? "bg-purple-900/30 border-purple-600 text-purple-300 border"
                    : "bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200 hover:border-purple-600",
                )}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </PaginationItem>
          ),
        )}

        {showControls && (
          <PaginationItem>
            <button
              onClick={() => handleOnPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={cn(
                "h-8 w-8 flex items-center justify-center bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-slate-200 hover:border-purple-600 rounded-none",
                currentPage === totalPages && "opacity-50 pointer-events-none",
              )}
              aria-label="Go to next page"
            >
              <ChevronRight className="size-4" />
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
