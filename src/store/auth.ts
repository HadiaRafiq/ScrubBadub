import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  onboarded: boolean;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
  setOnboarded: (onboarded: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      onboarded: false,

      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setOnboarded: (onboarded: boolean) => set({ onboarded }),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ user: state.user, token: state.token }),
    },
  ),
);
