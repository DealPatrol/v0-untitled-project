"use client"

import { CheckIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  steps: { id: string; title: string }[]
  currentStep: number
  progress: number
}

export function ProgressBar({ steps, currentStep, progress }: ProgressBarProps) {
  return (
    <div className="space-y-4">
      {/* Progress percentage */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-rose-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="hidden md:flex justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center">
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                    isCompleted
                      ? "bg-rose-600 text-white"
                      : isCurrent
                        ? "bg-rose-100 text-rose-600 border-2 border-rose-600"
                        : "bg-gray-100 text-gray-400",
                  )}
                >
                  {isCompleted ? <CheckIcon className="h-4 w-4" /> : index + 1}
                </div>
              </div>
              <span
                className={cn(
                  "mt-2 text-xs",
                  isCurrent ? "text-rose-600 font-medium" : isCompleted ? "text-gray-700" : "text-gray-400",
                )}
              >
                {step.title}
              </span>
            </div>
          )
        })}
      </div>

      {/* Mobile step indicator */}
      <div className="md:hidden text-center">
        <p className="text-sm font-medium">
          Step {currentStep + 1} of {steps.length}: <span className="text-rose-600">{steps[currentStep].title}</span>
        </p>
      </div>
    </div>
  )
}
