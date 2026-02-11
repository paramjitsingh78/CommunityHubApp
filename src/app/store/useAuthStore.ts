import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  token: string | null;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  isHydrated: false,

  hydrate: async () => {
    const token = await AsyncStorage.getItem('auth_token');
    set({token, isHydrated: true});
  },

  login: async (email, password) => {
    // mock validation
    if (!email || !password) {
      throw new Error('Invalid credentials');
    }

    const fakeToken = 'fake-jwt-token';

    await AsyncStorage.setItem('auth_token', fakeToken);
    set({token: fakeToken});
  },

  logout: async () => {
    await AsyncStorage.removeItem('auth_token');
    set({token: null});
  },
}));
