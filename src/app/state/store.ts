import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createAuthSlice, AuthSlice} from './slices/auth.slice';

type AppState = AuthSlice;

export const useAppStore = create<AppState>()(
  persist(
    (...args) => ({
      ...createAuthSlice(...args),
    }),
    {
      name: 'community-hub-storage',

      storage: createJSONStorage(() => AsyncStorage),

      partialize: state => ({
        token: state.token,
      }),
    },
  ),
);
