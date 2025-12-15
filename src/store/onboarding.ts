import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingState {
  onboardingCompleted: boolean;
  hydrated: boolean;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  setHydrated: (hydrated: boolean) => void;
  completeOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    set => ({
      onboardingCompleted: false,
      hydrated: false,

      setOnboardingCompleted: (onboardingCompleted: boolean) =>
        set({ onboardingCompleted }),
      setHydrated: (hydrated: boolean) => set({ hydrated }),
      completeOnboarding: () => set({ onboardingCompleted: true }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        onboardingCompleted: state.onboardingCompleted,
        hydrated: state.hydrated,
      }),
      onRehydrateStorage: () => state => {
        state?.setHydrated?.(true);
      },
    },
  ),
);
