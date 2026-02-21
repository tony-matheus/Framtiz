import { Star, Trophy } from "lucide-react"

interface AchievementNotificationProps {
  title: string
  subtitle: string
  description: string
}

export default function AchievementNotification({
  title,
  subtitle,
  description,
}: AchievementNotificationProps) {
  return (
    <div className="fixed left-8 top-8 z-50 max-w-sm border-2 border-yellow-400 bg-gradient-to-r from-yellow-500 to-orange-500 p-4 text-black shadow-2xl">
      <div className="mb-2 flex items-center">
        <Trophy className="mr-2 size-6 text-yellow-800" />
        <span className="text-lg font-bold">{title}</span>
      </div>
      <div className="flex items-center text-sm">
        <Star className="mr-1 size-4" />
        <span className="font-semibold">{subtitle}</span>
      </div>
      <p className="mt-1 text-xs text-yellow-900">{description}</p>
      <div className="absolute -right-1 -top-1 size-3 animate-ping bg-yellow-400"></div>
    </div>
  )
}
