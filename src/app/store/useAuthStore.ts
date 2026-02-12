import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

type AuthState = {
  token: string | null;
  userEmail: string | null;
  isHydrated: boolean;

  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  userEmail: null,
  isHydrated: false,

  login: async email => {
    const fakeToken = 'fake-jwt-token';

    await AsyncStorage.multiSet([
      ['token', fakeToken],
      ['userEmail', email],
    ]);

    set({
      token: fakeToken,
      userEmail: email,
    });
  },

  logout: async () => {
    await AsyncStorage.multiRemove(['token', 'userEmail']);

    // reset in-memory state
    set({
      token: null,
      userEmail: null,
    });
  },

  hydrate: async () => {
    const [[, token], [, userEmail]] = await AsyncStorage.multiGet([
      'token',
      'userEmail',
    ]);

    set({
      token: token ?? null,
      userEmail: userEmail ?? null,
      isHydrated: true,
    });
  },
}));
