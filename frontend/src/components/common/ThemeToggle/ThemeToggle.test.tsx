import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import ThemeToggle from './ThemeToggle';

// Mock pentru localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
  };
})();

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
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock(false),
      writable: true,
    });
    
    // Clear localStorage before each test
    localStorageMock.clear();
    
    // Reset document classes
    document.documentElement.classList.remove('dark');
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
    expect(localStorageMock.getItem('theme')).toBe('dark');
    
    // Click to toggle back to light mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(localStorageMock.getItem('theme')).toBe('light');
  });

  it('uses system preference when no theme is stored', () => {
    // Mock system preference to dark
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock(true),
      writable: true,
    });
    
    render(<ThemeToggle />);
    
    // Should use system preference (dark)
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('uses stored theme over system preference', () => {
    // Set stored theme to light
    localStorageMock.setItem('theme', 'light');
    
    // Mock system preference to dark
    Object.defineProperty(window, 'matchMedia', {
      value: matchMediaMock(true),
      writable: true,
    });
    
    render(<ThemeToggle />);
    
    // Should use stored theme (light) over system preference (dark)
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('applies custom className', () => {
    render(<ThemeToggle className="custom-class" />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toHaveClass('custom-class');
  });
});
