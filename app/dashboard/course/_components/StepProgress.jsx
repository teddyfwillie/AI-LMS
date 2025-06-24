import { Button } from "@/components/ui/button";
import React from "react";

function StepProgress({ stepCount, setStepCount, data }) {
  const isFirstStep = stepCount === 0;
  const isLastStep = stepCount === (data?.length - 1 || 0);

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        {!isFirstStep && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount - 1)}
            className="shrink-0"
            aria-label="Previous question"
          >
            Previous
          </Button>
        )}

        <div className="hidden sm:flex items-center gap-2 w-full">
          {data?.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-2 rounded-full transition-colors ${
                index <= stepCount
                  ? "bg-primary dark:bg-primary-foreground"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
              aria-hidden="true"
            />
          ))}
        </div>

        {!isLastStep && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setStepCount(stepCount + 1)}
            className="shrink-0 sm:ml-auto"
            aria-label="Next question"
          >
            Next
          </Button>
        )}
      </div>

      {/* Mobile step indicator */}
      <div className="sm:hidden flex items-center gap-2 w-full">
        {data?.map((_, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full transition-colors ${
              index <= stepCount
                ? "bg-primary dark:bg-primary-foreground"
                : "bg-gray-200 dark:bg-gray-700"
            }`}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

export default StepProgress;
