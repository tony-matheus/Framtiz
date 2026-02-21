import { CyberSkeleton } from "@/components/ui-custom/cyber-skeleton"

export default function AnalyticsSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <CyberSkeleton className="h-8 w-48" />
        <CyberSkeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <CyberSkeleton key={i} className="h-32" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <CyberSkeleton key={i} className="h-64" />
        ))}
      </div>
    </div>
  )
}
