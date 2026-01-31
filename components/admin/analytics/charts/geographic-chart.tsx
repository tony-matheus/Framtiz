"use client"

import { Card, CardContent } from "@/components/ui/card"
import { GeographicData } from "@/lib/schemas/analytics-schemas"
import { Globe } from "lucide-react"

interface GeographicChartProps {
  data: GeographicData[]
}

export default function GeographicChart({ data }: GeographicChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="py-8 text-center">
            <Globe className="mx-auto mb-4 size-12 text-slate-400" />
            <h3 className="mb-2 font-mono text-lg text-slate-200">
              NO_GEOGRAPHIC_DATA
            </h3>
            <p className="text-slate-400">
              No geographic data available for the selected time period
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate total visits for percentage calculation
  const totalVisits = data.reduce((sum, item) => sum + item.visit_count, 0)

  // Get top 5 countries and group the rest as "Others"
  const topCountries = data.slice(0, 5)
  const otherVisits = data
    .slice(5)
    .reduce((sum, item) => sum + item.visit_count, 0)

  const chartData = [
    ...topCountries,
    ...(otherVisits > 0
      ? [{ country: "Others", visit_count: otherVisits }]
      : []),
  ]

  // Color palette for the chart
  const colors = [
    "bg-purple-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-slate-500",
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-lg text-slate-100">
            GEOGRAPHIC_DISTRIBUTION
          </h3>
          <p className="text-sm text-slate-400">
            Visitor distribution by country
          </p>
        </div>

        <div className="space-y-4">
          {chartData.map((item, index) => {
            const percentage =
              totalVisits > 0 ? (item.visit_count / totalVisits) * 100 : 0
            const color = colors[index % colors.length]

            return (
              <div key={item.country} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`size-3 rounded-full ${color}`} />
                    <span className="font-mono text-sm text-slate-200">
                      {item.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm text-slate-300">
                      {item.visit_count.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-700">
                  <div
                    className={`h-2 rounded-full ${color} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              {data.length} countr{data.length === 1 ? "y" : "ies"}
            </span>
            <span>Total visits: {totalVisits.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
