import { useCallback, useMemo, useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface UseMultiStepFormOptions<TFieldValues extends FieldValues> {
  onStepChange?: (step: number) => void;
  stepFields?: Record<number, Path<TFieldValues>[]>; // Optional: specify which fields belong to each step
}

export interface UseMultiStepFormReturn {
  currentStep: number;
  goToStep: (step: number) => void;
  nextStep: () => Promise<void>;
  previousStep: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canGoNext: boolean;
}

/**
 * Custom hook for managing multi-step form navigation and validation
 * @param totalSteps - Total number of steps in the form
 * @param form - react-hook-form instance
 * @param options - Optional configuration
 * @returns Step navigation helpers and state
 */
export const useMultiStepForm = <TFieldValues extends FieldValues>(
  totalSteps: number,
  form: UseFormReturn<TFieldValues>,
  options?: UseMultiStepFormOptions<TFieldValues>,
): UseMultiStepFormReturn => {
  const [currentStep, setCurrentStep] = useState(0);

  const { trigger, formState } = form;
  const { errors } = formState;

  // Get fields to validate for current step
  const getCurrentStepFields = useCallback((): Path<TFieldValues>[] => {
    if (options?.stepFields && options.stepFields[currentStep]) {
      return options.stepFields[currentStep];
    }
    // If no stepFields specified, validate all fields (react-hook-form default behavior)

    return [];
  }, [currentStep, options?.stepFields]);

  // Validate current step before moving to next
  const nextStep = useCallback(async () => {
    const fieldsToValidate = getCurrentStepFields();

    let isValid: boolean;
    if (fieldsToValidate.length > 0) {
      // Validate only the fields for the current step
      isValid = await trigger(fieldsToValidate);
    } else {
      // Validate all fields (default react-hook-form behavior)
      isValid = await trigger();
    }

    if (isValid && currentStep < totalSteps - 1) {
      const nextStepIndex = currentStep + 1;
      setCurrentStep(nextStepIndex);
      options?.onStepChange?.(nextStepIndex);
    }
  }, [currentStep, totalSteps, trigger, getCurrentStepFields, options]);

  // Move to previous step (no validation required)
  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      const prevStepIndex = currentStep - 1;
      setCurrentStep(prevStepIndex);
      options?.onStepChange?.(prevStepIndex);
    }
  }, [currentStep, options]);

  // Navigate to a specific step (no validation)
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 0 && step < totalSteps) {
        setCurrentStep(step);
        options?.onStepChange?.(step);
      }
    },
    [totalSteps, options],
  );

  // Check if current step is valid (for UI state)
  const canGoNext = useMemo(() => {
    const fieldsToValidate = getCurrentStepFields();

    if (fieldsToValidate.length > 0) {
      // Check if any of the current step's fields have errors
      return !fieldsToValidate.some(field => errors[field]);
    }

    // If no stepFields specified, check if form has any errors
    return Object.keys(errors).length === 0;
  }, [errors, getCurrentStepFields]);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return {
    currentStep,
    goToStep,
    nextStep,
    previousStep,
    isFirstStep,
    isLastStep,
    canGoNext,
  };
};
