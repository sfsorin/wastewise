import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

// Mock pentru Zustand store
let mockIsDarkMode = false;
const mockToggleTheme = vi.fn(() => {
  mockIsDarkMode = !mockIsDarkMode;
  // Actualizăm clasa pe document pentru a simula comportamentul real
  if (mockIsDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

const mockSetDarkMode = vi.fn(isDark => {
  mockIsDarkMode = isDark;
  // Actualizăm clasa pe document pentru a simula comportamentul real
  if (mockIsDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

vi.mock('../../../stores', () => ({
  useThemeStore: () => ({
    isDarkMode: mockIsDarkMode,
    toggleTheme: mockToggleTheme,
    setDarkMode: mockSetDarkMode,
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

    // Reset mock state
    mockIsDarkMode = false;
    mockToggleTheme.mockClear();
    mockSetDarkMode.mockClear();
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
