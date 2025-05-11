import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

// Mock pentru Zustand store
vi.mock('../../../store', () => ({
  useThemeStore: () => ({
    isDarkMode: false,
    toggleTheme: vi.fn(() => {
      // Simulăm comportamentul toggleTheme
      const isDarkMode = !vi.mocked(useThemeStore().isDarkMode);
      vi.mocked(useThemeStore).mockImplementation(() => ({
        isDarkMode,
        toggleTheme: vi.mocked(useThemeStore().toggleTheme),
        setDarkMode: vi.mocked(useThemeStore().setDarkMode),
      }));

      // Actualizăm clasa pe document pentru a simula comportamentul real
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }),
    setDarkMode: vi.fn(isDark => {
      vi.mocked(useThemeStore).mockImplementation(() => ({
        isDarkMode: isDark,
        toggleTheme: vi.mocked(useThemeStore().toggleTheme),
        setDarkMode: vi.mocked(useThemeStore().setDarkMode),
      }));

      // Actualizăm clasa pe document pentru a simula comportamentul real
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }),
  }),
}));

// Mock pentru matchMedia
const matchMediaMock = (matches: boolean) => {
  return () => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  });
};

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    // Setup mocks
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock(false),
      writable: true,
    });

    // Reset document classes
    document.documentElement.classList.remove('dark');

    // Reset mock implementation
    vi.mocked(useThemeStore).mockImplementation(() => ({
      isDarkMode: false,
      toggleTheme: vi.fn(() => {
        const isDarkMode = !vi.mocked(useThemeStore().isDarkMode);
        vi.mocked(useThemeStore).mockImplementation(() => ({
          isDarkMode,
          toggleTheme: vi.mocked(useThemeStore().toggleTheme),
          setDarkMode: vi.mocked(useThemeStore().setDarkMode),
        }));

        if (isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }),
      setDarkMode: vi.mocked(useThemeStore().setDarkMode),
    }));
  });

  it('renders correctly', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  it('toggles theme on click', () => {
    render(<ThemeToggle />);
    const toggleButton = screen.getByRole('button');

    // Initial state (light mode)
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    // Click to toggle to dark mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    // Click to toggle back to light mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('applies custom className', () => {
    render(<ThemeToggle className="custom-class" />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveClass('custom-class');
  });
});
