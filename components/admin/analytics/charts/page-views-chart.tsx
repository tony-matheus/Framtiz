"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TimeSeriesData } from "@/lib/schemas/analytics-schemas"
import { TrendingUp, Calendar } from "lucide-react"

interface PageViewsChartProps {
  data: TimeSeriesData[]
}

export default function PageViewsChart({ data }: PageViewsChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="py-8 text-center">
            <TrendingUp className="mx-auto mb-4 size-12 text-slate-400" />
            <h3 className="mb-2 font-mono text-lg text-slate-200">
              NO_TIME_SERIES_DATA
            </h3>
            <p className="text-slate-400">
              No page views data available for the selected time period
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate chart dimensions and scaling
  const maxViews = Math.max(...data.map((item) => item.page_views))
  const minViews = Math.min(...data.map((item) => item.page_views))
  const totalViews = data.reduce((sum, item) => sum + item.page_views, 0)
  const averageViews = totalViews / data.length

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  // Calculate SVG path for the line chart
  const getChartPath = () => {
    if (data.length === 0) return ""

    const width = 100
    const height = 60
    const padding = 10
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const xStep = chartWidth / (data.length - 1)
    const yScale = maxViews > minViews ? chartHeight / (maxViews - minViews) : 1

    const points = data.map((item, index) => {
      const x = padding + index * xStep
      const y = height - padding - (item.page_views - minViews) * yScale
      return `${x},${y}`
    })

    return `M ${points.join(" L ")}`
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-lg text-slate-100">
            PAGE_VIEWS_OVER_TIME
          </h3>
          <p className="text-sm text-slate-400">Daily page views trend</p>
        </div>

        {/* Chart Container */}
        <div className="relative mb-6">
          <div className="h-48 w-full">
            <svg
              className="size-full"
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={i}
                  x1="10"
                  y1={10 + i * 10}
                  x2="90"
                  y2={10 + i * 10}
                  stroke="rgba(148, 163, 184, 0.1)"
                  strokeWidth="0.5"
                />
              ))}

              {/* Line chart */}
              <path
                d={getChartPath()}
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity="1" />
                  <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Data points */}
              {data.map((item, index) => {
                const width = 100
                const height = 60
                const padding = 10
                const chartWidth = width - padding * 2
                const chartHeight = height - padding * 2
                const xStep = chartWidth / (data.length - 1)
                const yScale =
                  maxViews > minViews ? chartHeight / (maxViews - minViews) : 1
                const x = padding + index * xStep
                const y =
                  height - padding - (item.page_views - minViews) * yScale

                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="1.5"
                    fill="#8b5cf6"
                    stroke="#1e293b"
                    strokeWidth="1"
                  />
                )
              })}
            </svg>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-slate-800/50 p-3 text-center">
            <div className="font-mono text-lg text-slate-100">
              {totalViews.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Total Views</div>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-3 text-center">
            <div className="font-mono text-lg text-slate-100">
              {averageViews.toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">Average/Day</div>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-3 text-center">
            <div className="font-mono text-lg text-slate-100">
              {maxViews.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Peak Day</div>
          </div>
        </div>

        {/* Date range */}
        <div className="flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center space-x-2">
            <Calendar className="size-4" />
            <span>
              {data.length} day{data.length === 1 ? "" : "s"}
            </span>
          </div>
          <span>
            {formatDate(data[0]?.date || "")} -{" "}
            {formatDate(data[data.length - 1]?.date || "")}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
