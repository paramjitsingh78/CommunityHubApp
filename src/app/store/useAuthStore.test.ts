import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuthStore} from './useAuthStore';

jest.mock('@react-native-async-storage/async-storage', () => ({
  multiSet: jest.fn().mockResolvedValue(undefined),
  multiRemove: jest.fn().mockResolvedValue(undefined),
  multiGet: jest.fn().mockResolvedValue([
    ['token', null],
    ['userEmail', null],
  ]),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAuthStore.setState({
      token: null,
      userEmail: null,
      isHydrated: false,
    });
  });

  it('login persists token/email and updates state', async () => {
    await useAuthStore.getState().login('user@example.com');

    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      ['token', 'fake-jwt-token'],
      ['userEmail', 'user@example.com'],
    ]);

    expect(useAuthStore.getState().token).toBe('fake-jwt-token');
    expect(useAuthStore.getState().userEmail).toBe('user@example.com');
  });

  it('logout clears persisted auth and in-memory state', async () => {
    useAuthStore.setState({
      token: 'fake-jwt-token',
      userEmail: 'user@example.com',
      isHydrated: true,
    });

    await useAuthStore.getState().logout();

    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      'token',
      'userEmail',
    ]);
    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().userEmail).toBeNull();
  });

  it('hydrate loads persisted values and marks store as hydrated', async () => {
    (AsyncStorage.multiGet as jest.Mock).mockResolvedValueOnce([
      ['token', 'persisted-token'],
      ['userEmail', 'saved@example.com'],
    ]);

    await useAuthStore.getState().hydrate();

    expect(AsyncStorage.multiGet).toHaveBeenCalledWith(['token', 'userEmail']);
    expect(useAuthStore.getState().token).toBe('persisted-token');
    expect(useAuthStore.getState().userEmail).toBe('saved@example.com');
    expect(useAuthStore.getState().isHydrated).toBe(true);
  });
});
