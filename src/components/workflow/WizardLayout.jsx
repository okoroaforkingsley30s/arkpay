import React from "react";
import { CheckCircle2, Circle, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

import GlassCard from "@/components/common/GlassCard";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function WizardLayout({
  title,
  subtitle,
  steps = [],
  currentStep = 0,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  backLabel = "Back",
  nextDisabled = false,
  showBack = true,
  showNext = true,
  className = "",
}) {
  const currentStepItem = steps[currentStep];

  return (
    <div className={cn("w-full space-y-6", className)}>
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {title || currentStepItem?.title}
          </h1>

          {(subtitle || currentStepItem?.subtitle) && (
            <p className="text-blue-300 mt-2 max-w-2xl">
              {subtitle || currentStepItem?.subtitle}
            </p>
          )}
        </div>

        {steps.length > 0 && (
          <div className="text-blue-300 text-sm">
            Step {currentStep + 1} of {steps.length}
          </div>
        )}
      </div>

      {steps.length > 0 && (
        <GlassCard padding="md">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {steps.map((step, index) => {
              const completed = index < currentStep;
              const active = index === currentStep;

              return (
                <div
                  key={step.id || step.title}
                  className={cn(
                    "rounded-2xl border p-4 transition-all",
                    active
                      ? "bg-blue-600/20 border-blue-400/50"
                      : completed
                      ? "bg-green-500/10 border-green-500/30"
                      : "bg-white/5 border-blue-900/30"
                  )}
                >
                  <div className="flex items-center gap-3">
                    {completed ? (
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                    ) : (
                      <Circle
                        className={cn(
                          "w-5 h-5",
                          active ? "text-blue-300 fill-blue-500" : "text-blue-500/50"
                        )}
                      />
                    )}

                    <div>
                      <p className="text-white text-sm font-bold">
                        {step.title}
                      </p>
                      {step.short && (
                        <p className="text-blue-300 text-xs mt-0.5">
                          {step.short}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}

      <GlassCard padding="lg">
        {children}
      </GlassCard>

      <div className="flex items-center justify-between">
        <div>
          {showBack && (
            <PrimaryButton
              variant="secondary"
              size="md"
              icon={ArrowLeft}
              onClick={onBack}
            >
              {backLabel}
            </PrimaryButton>
          )}
        </div>

        <div>
          {showNext && (
            <PrimaryButton
              size="md"
              iconRight={ArrowRight}
              onClick={onNext}
              disabled={nextDisabled}
            >
              {nextLabel}
            </PrimaryButton>
          )}
        </div>
      </div>
    </div>
  );
}