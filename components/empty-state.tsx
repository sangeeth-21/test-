"use client"

import { ReactNode } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a utility for class merging

interface EmptyStateProps {
  title: string
  description: string
  icon?: ReactNode
  className?: string
  iconSize?: 'sm' | 'md' | 'lg'
}

export function EmptyState({ 
  title, 
  description, 
  icon, 
  className = '',
  iconSize = 'md' 
}: EmptyStateProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  }

  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      "bg-white dark:bg-gray-900 p-6 rounded-lg",
      "shadow-sm border border-gray-100 dark:border-gray-800",
      "text-center max-w-md mx-auto",
      className
    )}>
      {icon && (
        <div className={cn(
          "flex items-center justify-center",
          "mb-4 p-3 rounded-full",
          "bg-gray-50 dark:bg-gray-800",
          "text-gray-400 dark:text-gray-500",
          sizeClasses[iconSize]
        )}>
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  )
}