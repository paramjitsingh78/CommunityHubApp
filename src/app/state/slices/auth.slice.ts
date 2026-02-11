import {StateCreator} from 'zustand';

export type AuthSlice = {
  token: string | null;
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const createAuthSlice: StateCreator<AuthSlice> = set => ({
  token: null,

  login: (_email, _password) => {
    set({
      token: 'fake-jwt-token',
    });
  },

  logout: () => {
    set({
      token: null,
    });
  },
});
