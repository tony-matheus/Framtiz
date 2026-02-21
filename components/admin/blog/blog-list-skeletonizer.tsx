import { Skeleton } from "@/components/ui/skeleton"
import { Edit, ImageIcon, Trash2 } from "lucide-react"

export default function BlogListSkeletonizer() {
  return (
    <>
      {[...Array(8)].map((_, index) => (
        <div
          key={`${index}_skeleton`}
          className="flex h-full flex-col justify-between gap-4 border border-slate-800 p-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="h-[100px] w-full space-y-2">
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
              <Skeleton className="h-6" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="flex size-7 items-center justify-center">
                <Edit size={14} />
              </Skeleton>
              <Skeleton className="flex size-7 items-center justify-center">
                <Trash2 size={14} />
              </Skeleton>
            </div>
          </div>
          <Skeleton className="flex h-[158px] items-center justify-center">
            <ImageIcon size={48} />
          </Skeleton>

          <Skeleton className="h-7 w-20" />
        </div>
      ))}
    </>
  )
}
