import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';
import type { RegisterData } from '../../types/auth.types';
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

// Mock pentru authService
vi.mock('../services/authService', () => ({
  default: {
    login: vi.fn(async (credentials: { username: string; password: string }) => {
      if (credentials.username === 'test@example.com' && credentials.password === 'password') {
        return {
          user: {
            id: '1',
            username: 'test',
            email: 'test@example.com',
            role: 'user',
          },
          access_token: 'dummy_token',
        };
      }
      throw new Error('Credențiale invalide');
    }),
    register: vi.fn(async () => ({
      user: {
        id: '2',
        username: 'new',
        email: 'new@example.com',
        role: 'user',
      },
      access_token: 'dummy_token',
    })),
    logout: vi.fn(),
    getProfile: vi.fn(async () => ({
      id: '1',
      username: 'test',
      email: 'test@example.com',
      role: 'user',
    })),
    isAuthenticated: vi.fn(() => true),
    getCurrentUser: vi.fn(() => ({
      id: '1',
      username: 'test',
      email: 'test@example.com',
      role: 'user',
    })),
    getToken: vi.fn(() => 'dummy_token'),
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
    expect(state.token).toBe('dummy_token'); // Acum token-ul este access_token
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
