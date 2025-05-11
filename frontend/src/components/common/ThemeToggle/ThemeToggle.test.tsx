import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

// Mock pentru hook-ul useTheme
vi.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({
    darkMode: false,
    toggleDarkMode: vi.fn(() => {
      // Simulăm comportamentul toggleDarkMode
      const darkMode = !vi.mocked(useTheme().darkMode);
      vi.mocked(useTheme).mockImplementation(() => ({
        darkMode,
        toggleDarkMode: vi.mocked(useTheme().toggleDarkMode),
        theme: 'light',
        changeTheme: vi.fn(),
      }));

      // Actualizăm clasa pe document pentru a simula comportamentul real
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }),
    theme: 'light',
    changeTheme: vi.fn(),
  }),
  default: () => ({
    darkMode: false,
    toggleDarkMode: vi.fn(),
    theme: 'light',
    changeTheme: vi.fn(),
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
    vi.mocked(useTheme).mockImplementation(() => ({
      darkMode: false,
      toggleDarkMode: vi.fn(() => {
        const darkMode = !vi.mocked(useTheme().darkMode);
        vi.mocked(useTheme).mockImplementation(() => ({
          darkMode,
          toggleDarkMode: vi.mocked(useTheme().toggleDarkMode),
          theme: 'light',
          changeTheme: vi.fn(),
        }));

        if (darkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }),
      theme: 'light',
      changeTheme: vi.fn(),
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
