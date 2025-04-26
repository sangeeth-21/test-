import { Check } from 'lucide-react'
import { cn } from "@/lib/utils"

interface StepperProgressProps {
  steps: string[]
  currentStep: number
}

export function StepperProgress({ steps, currentStep }: StepperProgressProps) {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8 px-2 md:px-4">
      <div className="relative flex justify-between px-1 md:px-2">
        {/* Progress Line */}
        <div className="absolute top-1/2 left-2 right-2 sm:left-0 sm:right-0 -translate-y-1/2 h-[2px] bg-gray-200" />
        <div 
          className="absolute top-1/2 left-2 sm:left-0 -translate-y-1/2 h-[2px] bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `calc(${(currentStep / (steps.length - 1)) * 100}% - 16px)` }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={index} className="relative z-10 flex flex-col items-center">
            <span 
              className={cn(
                "absolute -top-6 text-sm whitespace-nowrap",
                index <= currentStep ? "text-primary font-medium" : "text-gray-500"
              )}
            >
              {step}
            </span>
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ease-in-out",
                "mx-1 sm:mx-0",
                index < currentStep
                  ? "bg-primary border-primary text-white"
                  : index === currentStep
                  ? "border-primary bg-white"
                  : "border-gray-300 bg-white"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-gray-300" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

