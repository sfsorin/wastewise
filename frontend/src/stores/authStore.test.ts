import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';
import { act } from '@testing-library/react';

// Mock pentru localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

// Mock pentru AuthService
vi.mock('./authService', () => ({
  AuthService: {
    login: vi.fn(async (email: string, password: string) => {
      if (email === 'test@example.com' && password === 'password') {
        return {
          user: {
            id: '1',
            email: 'test@example.com',
            firstName: 'Test',
            lastName: 'User',
            role: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          token: 'dummy_token',
        };
      }
      throw new Error('Credențiale invalide');
    }),
    register: vi.fn(async () => ({
      user: {
        id: '2',
        email: 'new@example.com',
        firstName: 'New',
        lastName: 'User',
        role: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      token: 'dummy_token',
    })),
    logout: vi.fn(),
    checkAuth: vi.fn(async () => {
      const token = localStorageMock.getItem('auth_token');
      if (!token) {
        throw new Error('Nu sunteți autentificat');
      }
      return {
        user: {
          id: '1',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          role: 'user',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        token,
      };
    }),
  },
}));

describe('AuthStore', () => {
  beforeEach(() => {
    // Setup localStorage mock
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    // Clear localStorage and reset store
    localStorageMock.clear();

    // Reset store
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

  it('should initialize with default values', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should login successfully with valid credentials', async () => {
    const { login } = useAuthStore.getState();

    await act(async () => {
      await login('test@example.com', 'password');
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).not.toBeNull();
    expect(state.token).toBe('dummy_token');
    expect(state.error).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  it('should handle login failure with invalid credentials', async () => {
    const { login } = useAuthStore.getState();

    await act(async () => {
      await login('wrong@example.com', 'wrong');
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.error).toBe('Credențiale invalide');
    expect(state.isLoading).toBe(false);
  });

  it('should logout successfully', async () => {
    // Login first
    const { login, logout } = useAuthStore.getState();

    await act(async () => {
      await login('test@example.com', 'password');
    });

    // Then logout
    act(() => {
      logout();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('should clear error', () => {
    // Set an error
    act(() => {
      useAuthStore.setState({ error: 'Test error' });
    });

    // Clear error
    const { clearError } = useAuthStore.getState();
    act(() => {
      clearError();
    });

    const state = useAuthStore.getState();
    expect(state.error).toBeNull();
  });
});
