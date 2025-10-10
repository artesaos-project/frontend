import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

interface StepIndicatorProps {
  icon: LucideIcon | IconType;
  index: number;
  step: number;
  activeStep: number | number[];
  isLast?: boolean;
}

export function StepIndicator({
  icon: Icon,
  step,
  activeStep,
  isLast,
}: StepIndicatorProps) {
  const stepsArr = Array.isArray(activeStep) ? activeStep : [activeStep];
  const isCurrent = stepsArr.includes(step);
  const isPast = step > Math.max(...stepsArr);
  const isFuture = step < Math.min(...stepsArr);

  return (
    <div className="flex items-center">
      <div
        className={cn(
          'w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300',
          isCurrent
            ? 'bg-golden/40 text-golden'
            : isPast
              ? 'border-olivine-600 text-olivine-600'
              : 'border-gray-200 text-gray-300',
        )}
      >
        <Icon size={22} />
      </div>
      {!isLast && (
        <div
          className={cn(
            'border-b-2 border-dotted w-4 md:w-8 sm:w-10 mx-1',
            isPast ? 'border-olivine-600 bg-olivine-600' : 'border-yellow-200',
            isFuture && 'opacity-60 border-gray-200',
          )}
        />
      )}
    </div>
  );
}
