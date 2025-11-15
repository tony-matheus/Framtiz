"use client"

import { CyberCard, CyberCardContent } from "@/components/ui/card"
import { GeographicData, DeviceData } from "@/lib/schemas/analytics-schemas"
import { Users, Globe, Monitor, TrendingUp } from "lucide-react"

interface MetricsCardsProps {
  totalVisitors: number
  geographicData: GeographicData[]
  deviceData: DeviceData[]
}

export default function MetricsCards({
  totalVisitors,
  geographicData,
  deviceData,
}: MetricsCardsProps) {
  const topCountry = geographicData.length > 0 ? geographicData[0] : null

  const topDevice = deviceData.length > 0 ? deviceData[0] : null

  const totalCountries = geographicData.length

  const metrics = [
    {
      title: "TOTAL_VISITORS",
      value: totalVisitors.toLocaleString(),
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-400/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "TOP_COUNTRY",
      value: topCountry?.country || "N/A",
      subtitle: topCountry ? `${topCountry.visit_count} visits` : "No data",
      icon: Globe,
      color: "text-green-400",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "TOP_DEVICE",
      value: topDevice?.device_type || "N/A",
      subtitle: topDevice ? `${topDevice.visit_count} visits` : "No data",
      icon: Monitor,
      color: "text-purple-400",
      bgColor: "bg-purple-400/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "GEOGRAPHIC_REACH",
      value: totalCountries.toString(),
      subtitle: `${totalCountries} countr${totalCountries === 1 ? "y" : "ies"}`,
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "bg-orange-400/10",
      borderColor: "border-orange-500/20",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <CyberCard key={index}>
          <CyberCardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="mb-1 font-mono text-sm text-slate-400">
                  {metric.title}
                </p>
                <div className="mb-1">
                  <span className="text-2xl font-bold text-slate-100">
                    {metric.value}
                  </span>
                </div>
                {metric.subtitle && (
                  <p className="text-xs text-slate-500">{metric.subtitle}</p>
                )}
              </div>

              <div
                className={`flex size-12 items-center justify-center rounded-lg border ${metric.bgColor} ${metric.borderColor}`}
              >
                <metric.icon className={`size-6 ${metric.color}`} />
              </div>
            </div>
          </CyberCardContent>
        </CyberCard>
      ))}
    </div>
  )
}
