// components/filter-buttons.tsx
'use client'

import { Button } from './ui/button'

interface FilterButtonsProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  mobile?: boolean
}

export function FilterButtons({ activeFilter, onFilterChange, mobile = false }: FilterButtonsProps) {
  const filters = [
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'today', label: 'Today' },
    { id: 'past', label: 'Past' },
    { id: 'all', label: 'All Events' }
  ]

  return (
    <div className={`flex ${mobile ? 'space-x-2' : 'space-x-4'}`}>
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? 'default' : 'outline'}
          size={mobile ? 'sm' : 'default'}
          onClick={() => onFilterChange(filter.id)}
          className={mobile ? 'whitespace-nowrap' : ''}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  )
}