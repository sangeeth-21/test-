import { Users, Mic2, LayoutGrid, Building } from 'lucide-react'

interface EventHighlightCardProps {
  count: string;
  label: string;
  icon: string;
}

const iconMap = {
  users: Users,
  mic: Mic2,
  grid: LayoutGrid,
  building: Building,
}

export function EventHighlightCard({ count, label, icon }: EventHighlightCardProps) {
  const Icon = iconMap[icon as keyof typeof iconMap]

  return (
    <div className="text-center">
      <div className="flex justify-center mb-2">
        <Icon className="w-6 h-6 text-[#6366F1]" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{count}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

