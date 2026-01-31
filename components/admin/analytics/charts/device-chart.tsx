"use client"

import { Card, CardContent } from "@/components/ui/card"
import { DeviceData } from "@/lib/schemas/analytics-schemas"
import { Monitor, Smartphone, Tablet } from "lucide-react"

interface DeviceChartProps {
  data: DeviceData[]
}

export default function DeviceChart({ data }: DeviceChartProps) {
  if (!data || data.length === 0) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="py-8 text-center">
            <Monitor className="mx-auto mb-4 size-12 text-slate-400" />
            <h3 className="mb-2 font-mono text-lg text-slate-200">
              NO_DEVICE_DATA
            </h3>
            <p className="text-slate-400">
              No device data available for the selected time period
            </p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Calculate total visits for percentage calculation
  const totalVisits = data.reduce((sum, item) => sum + item.visit_count, 0)

  // Get device icon based on device type
  const getDeviceIcon = (deviceType: string) => {
    const type = deviceType.toLowerCase()
    if (type.includes("mobile") || type.includes("phone")) {
      return Smartphone
    }
    if (type.includes("tablet") || type.includes("ipad")) {
      return Tablet
    }
    return Monitor
  }

  // Color palette for device types
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
      <CardContent className="p-4">
        <div className="mb-6">
          <h3 className="mb-2 font-mono text-lg text-slate-100">
            DEVICE_DISTRIBUTION
          </h3>
          <p className="text-sm text-slate-400">
            Visitor distribution by device type
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item, index) => {
            const percentage =
              totalVisits > 0 ? (item.visit_count / totalVisits) * 100 : 0
            const color = colors[index % colors.length]
            const DeviceIcon = getDeviceIcon(item.device_type)

            return (
              <div
                key={item.device_type}
                className={`rounded-lg border p-4 ${color
                  .replace("bg-", "border-")
                  .replace("-500", "-500/30")} ${color
                  .replace("bg-", "bg-")
                  .replace("-500", "-500/10")}`}
              >
                <div className="mb-3 flex items-center space-x-3">
                  <div className={`rounded-lg p-2 ${color}`}>
                    <DeviceIcon className="size-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-mono text-sm capitalize text-slate-200">
                      {item.device_type}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {percentage.toFixed(1)}% of total
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-lg text-slate-100">
                      {item.visit_count.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500">visits</span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-slate-700">
                    <div
                      className={`h-2 rounded-full ${color} transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>
              {data.length} device type{data.length === 1 ? "" : "s"}
            </span>
            <span>Total visits: {totalVisits.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
