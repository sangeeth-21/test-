import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

const TimeFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('today');

  const filters = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
  ];
  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId);
    onFilterChange(filterId);
  };

  return (
    <div className="relative w-full">
      {/* Horizontal scroll container */}
      <div className="flex space-x-2 mb-6 overflow-x-auto scrollbar-hide whitespace-nowrap scroll-smooth">
        {filters.map(filter => (
          <Button
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`px-4 py-2 rounded-lg flex-shrink-0 ${
              activeFilter === filter.id 
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimeFilter;
