import { act, renderHook } from '@testing-library/react';
import useAuthStore from './authStore';
import authService from '../services/authService';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock authService
vi.mock('../services/authService', async () => {
  return {
    default: {
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      getCurrentUser: vi.fn(),
      getToken: vi.fn(),
      getProfile: vi.fn(),
      isAuthenticated: vi.fn(),
    },
  };
});

describe('authStore', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();

    // Reset the store state before each test
    act(() => {
      useAuthStore.setState({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    });
  });

  describe('login', () => {
    it('should set user, token, and isAuthenticated to true on successful login', async () => {
      const credentials = { username: 'testuser', password: 'password' };
      const mockResponse = {
        access_token: 'jwt-token',
        user: {
          id: '123',
          username: 'testuser',
          email: 'test@example.com',
          fullName: 'Test User',
          role: 'user',
        },
      };

      vi.mocked(authService.login).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(credentials);
      });

      expect(authService.login).toHaveBeenCalledWith(credentials);
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe('jwt-token');
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should set error and reset auth state on failed login', async () => {
      const credentials = { username: 'testuser', password: 'wrongpassword' };
      const errorResponse = {
        response: {
          data: {
            message: 'Credențiale invalide',
          },
        },
      };

      vi.mocked(authService.login).mockRejectedValueOnce(errorResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.login(credentials);
      });

      expect(authService.login).toHaveBeenCalledWith(credentials);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe('Credențiale invalide');
    });
  });

  describe('register', () => {
    it('should set user, token, and isAuthenticated to true on successful registration', async () => {
      const registerData = {
        username: 'newuser',
        email: 'new@example.com',
        password: 'Password123!',
        fullName: 'New User',
      };
      const mockResponse = {
        access_token: 'jwt-token',
        user: {
          id: '456',
          username: 'newuser',
          email: 'new@example.com',
          fullName: 'New User',
          role: 'user',
        },
      };

      vi.mocked(authService.register).mockResolvedValueOnce(mockResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.register(registerData);
      });

      expect(authService.register).toHaveBeenCalledWith(registerData);
      expect(result.current.user).toEqual(mockResponse.user);
      expect(result.current.token).toBe('jwt-token');
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('should set error and reset auth state on failed registration', async () => {
      const registerData = {
        username: 'existinguser',
        email: 'existing@example.com',
        password: 'Password123!',
        fullName: 'Existing User',
      };
      const errorResponse = {
        response: {
          data: {
            message: 'Există deja un utilizator cu același nume sau adresă de email',
          },
        },
      };

      vi.mocked(authService.register).mockRejectedValueOnce(errorResponse);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.register(registerData);
      });

      expect(authService.register).toHaveBeenCalledWith(registerData);
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(
        'Există deja un utilizator cu același nume sau adresă de email',
      );
    });
  });

  describe('logout', () => {
    it('should reset auth state on logout', async () => {
      // Set initial state to authenticated
      act(() => {
        useAuthStore.setState({
          user: { id: '123', username: 'testuser' } as any,
          token: 'jwt-token',
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      });

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.logout();
      });

      expect(authService.logout).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe('clearError', () => {
    it('should clear the error state', async () => {
      // Set initial state with an error
      act(() => {
        useAuthStore.setState({
          error: 'Some error message',
        });
      });

      const { result } = renderHook(() => useAuthStore());

      act(() => {
        result.current.clearError();
      });

      expect(result.current.error).toBeNull();
    });
  });

  describe('loadUser', () => {
    it('should load user profile if token exists', async () => {
      const mockUser = {
        id: '123',
        username: 'testuser',
        email: 'test@example.com',
        fullName: 'Test User',
        role: 'user',
      };

      // Set initial state with a token
      act(() => {
        useAuthStore.setState({
          token: 'jwt-token',
          isAuthenticated: true,
        });
      });

      vi.mocked(authService.getProfile).mockResolvedValueOnce(mockUser);

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(authService.getProfile).toHaveBeenCalled();
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should reset auth state if loading user fails', async () => {
      // Set initial state with a token
      act(() => {
        useAuthStore.setState({
          token: 'invalid-token',
          isAuthenticated: true,
        });
      });

      vi.mocked(authService.getProfile).mockRejectedValueOnce(new Error('Invalid token'));

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(authService.getProfile).toHaveBeenCalled();
      expect(authService.logout).toHaveBeenCalled();
      expect(result.current.user).toBeNull();
      expect(result.current.token).toBeNull();
      expect(result.current.isAuthenticated).toBe(false);
      expect(result.current.isLoading).toBe(false);
    });

    it('should do nothing if no token exists', async () => {
      // Set initial state with no token
      act(() => {
        useAuthStore.setState({
          token: null,
          isAuthenticated: false,
        });
      });

      const { result } = renderHook(() => useAuthStore());

      await act(async () => {
        await result.current.loadUser();
      });

      expect(authService.getProfile).not.toHaveBeenCalled();
      expect(result.current.isLoading).toBe(false);
    });
  });
});
