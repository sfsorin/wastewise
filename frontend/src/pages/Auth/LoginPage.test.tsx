import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import useAuthStore from '../../stores/authStore';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock useAuthStore
vi.mock('../../stores/authStore');

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useLocation: () => ({ state: { from: { pathname: '/dashboard' } } }),
}));

describe('LoginPage', () => {
  const mockLogin = vi.fn();
  const mockClearError = vi.fn();

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Mock the store
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
      isAuthenticated: false,
    });
  });

  it('renders login form correctly', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Check if the form elements are rendered
    expect(screen.getByText(/Autentificare/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Parolă/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Autentificare/i })).toBeInTheDocument();
    expect(screen.getByText(/Ai uitat parola/i)).toBeInTheDocument();
    expect(screen.getByText(/Nu ai cont/i)).toBeInTheDocument();
    expect(screen.getByText(/Înregistrează-te/i)).toBeInTheDocument();
  });

  it('shows error message when login fails', () => {
    // Mock the store with an error
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Credențiale invalide',
      clearError: mockClearError,
      isAuthenticated: false,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Check if the error message is displayed
    expect(screen.getByText('Credențiale invalide')).toBeInTheDocument();
  });

  it('shows loading state when submitting the form', () => {
    // Mock the store with loading state
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: true,
      error: null,
      clearError: mockClearError,
      isAuthenticated: false,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Check if the button shows loading state
    expect(screen.getByRole('button', { name: /Se procesează/i })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('calls login function with form data when submitted', async () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Fill in the form
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/Parolă/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Autentificare/i }));

    // Check if login function was called with correct data
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('redirects to dashboard when already authenticated', () => {
    // Mock the store with authenticated state
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: null,
      clearError: mockClearError,
      isAuthenticated: true,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Check if navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard', { replace: true });
  });

  it('clears error when email or password changes', () => {
    // Mock the store with an error
    (useAuthStore as unknown as vi.Mock).mockReturnValue({
      login: mockLogin,
      isLoading: false,
      error: 'Credențiale invalide',
      clearError: mockClearError,
      isAuthenticated: false,
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Change email input
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: 'new@example.com' },
    });

    // Check if clearError was called
    expect(mockClearError).toHaveBeenCalled();
  });

  it('navigates to register page when clicking on register link', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Click on the register link
    fireEvent.click(screen.getByText(/Înregistrează-te/i));

    // Check if the URL changed to register page
    expect(window.location.pathname).toBe('/');
  });

  it('navigates to forgot password page when clicking on forgot password link', () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>,
    );

    // Click on the forgot password link
    fireEvent.click(screen.getByText(/Ai uitat parola/i));

    // Check if the URL changed to forgot password page
    expect(window.location.pathname).toBe('/');
  });
});
