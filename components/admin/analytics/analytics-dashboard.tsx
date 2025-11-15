"use client"
import { AnalyticsErrorBoundary } from "./error-boundary"
import TopBlogsSection from "./top-blogs-section"
import MetricsCards from "./charts/metrics-cards"
import BlogsTable from "./blogs-table"
import AnalyticsSkeleton from "./analytics-skeleton"
import AnalyticsErrorState from "./analytics-error-state"
import EmptyState from "../empty-state"
import { DashboardData } from "@/lib/schemas/analytics-schemas"

type AnalyticsDashboardProps = {
  isLoading: boolean
  isError: boolean
  error: Error | null
  data: DashboardData | undefined
  refetch: () => void
}

export default function AnalyticsDashboard(props: AnalyticsDashboardProps) {
  return (
    <AnalyticsErrorBoundary>
      <AnalyticsDashboardContent {...props} />
    </AnalyticsErrorBoundary>
  )
}

function AnalyticsDashboardContent({
  isLoading,
  isError,
  error,
  data,
  refetch,
}: AnalyticsDashboardProps) {
  if (isLoading) return <AnalyticsSkeleton />

  if (isError)
    return (
      <AnalyticsErrorState errorMessage={error?.message} onRetry={refetch} />
    )

  if (!data) return <EmptyState title="No analytics data available" />

  return (
    <div className="space-y-6">
      {/* Top Blogs Section */}
      <TopBlogsSection blogs={data.top_blogs} />

      {/* Metrics Cards */}
      <MetricsCards
        totalVisitors={data.total_visitors}
        geographicData={data.geographic_data}
        deviceData={data.device_data}
      />

      {/* Charts Section */}
      {/* <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'> */}
      {/* Page Views Over Time */}
      {/* <PageViewsChart data={data.time_series_data} /> */}

      {/* Geographic Distribution */}
      {/* <GeographicChart data={data.geographic_data} /> */}
      {/* </div> */}

      {/* Blogs Table */}
      <BlogsTable blogs={data.blogs_table} />
      {/* Device Distribution */}
      {/* <DeviceChart data={data.device_data} /> */}
    </div>
  )
}
