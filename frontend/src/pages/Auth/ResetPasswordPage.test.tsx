import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ResetPasswordPage from './ResetPasswordPage';
import authService from '../../services/authService';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock authService
vi.mock('../../services/authService');

// Mock useSearchParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [
      {
        get: (param: string) => (param === 'token' ? 'valid-token' : null),
      },
    ],
    useNavigate: () => vi.fn(),
  };
});

describe('ResetPasswordPage', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
  });

  it('shows loading state while checking token', async () => {
    // Mock validateResetToken to delay response
    vi.mocked(authService.validateResetToken).mockImplementation(
      () => new Promise(resolve => setTimeout(() => resolve(true), 100)),
    );

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Check if loading state is displayed
    expect(screen.getByText(/Se verifică link-ul de resetare/i)).toBeInTheDocument();
  });

  it('shows error message for invalid token', async () => {
    // Mock validateResetToken to return false
    vi.mocked(authService.validateResetToken).mockResolvedValue(false);

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText(/Link invalid sau expirat/i)).toBeInTheDocument();
    });

    // Check if error message and button are displayed
    expect(
      screen.getByText(/Link-ul de resetare a parolei este invalid sau a expirat/i),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Solicită un nou link/i })).toBeInTheDocument();
  });

  it('shows reset password form for valid token', async () => {
    // Mock validateResetToken to return true
    vi.mocked(authService.validateResetToken).mockResolvedValue(true);

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText(/Resetare parolă/i)).toBeInTheDocument();
    });

    // Check if form elements are displayed
    expect(screen.getByLabelText(/^Parolă nouă$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^Confirmare parolă nouă$/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Resetează parola/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting invalid data', async () => {
    // Mock validateResetToken to return true
    vi.mocked(authService.validateResetToken).mockResolvedValue(true);

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText(/Resetare parolă/i)).toBeInTheDocument();
    });

    // Găsim formularul și declanșăm evenimentul de submit direct
    const form = screen.getByRole('form', { hidden: true }) || document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Submit form without filling in fields
    fireEvent.submit(form!);

    // Verificăm că mesajul de eroare apare
    expect(await screen.findByText(/Toate câmpurile sunt obligatorii/i)).toBeInTheDocument();

    // Fill in password fields with different values
    fireEvent.change(screen.getByLabelText(/^Parolă nouă$/i), {
      target: { value: 'Password123!' },
    });
    fireEvent.change(screen.getByLabelText(/^Confirmare parolă nouă$/i), {
      target: { value: 'DifferentPassword123!' },
    });

    // Submit form
    fireEvent.submit(form!);

    // Verificăm că mesajul de eroare apare
    expect(await screen.findByText(/Parolele nu coincid/i)).toBeInTheDocument();

    // Fill in password fields with short password
    fireEvent.change(screen.getByLabelText(/^Parolă nouă$/i), {
      target: { value: 'short' },
    });
    fireEvent.change(screen.getByLabelText(/^Confirmare parolă nouă$/i), {
      target: { value: 'short' },
    });

    // Submit form
    fireEvent.submit(form!);

    // Verificăm că mesajul de eroare apare
    expect(
      await screen.findByText(/Parola trebuie să aibă cel puțin 8 caractere/i),
    ).toBeInTheDocument();
  });

  it('resets password successfully', async () => {
    // Mock validateResetToken to return true
    vi.mocked(authService.validateResetToken).mockResolvedValue(true);
    // Mock resetPassword to resolve successfully
    vi.mocked(authService.resetPassword).mockResolvedValue({
      message: 'Parola a fost resetată cu succes.',
    });

    // Mock-uim searchParams pentru a furniza token-ul
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useSearchParams: () => [new URLSearchParams({ token: 'valid-token' })],
      };
    });

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText(/Resetare parolă/i)).toBeInTheDocument();
    });

    // Fill in password fields
    fireEvent.change(screen.getByLabelText(/^Parolă nouă$/i), {
      target: { value: 'NewPassword123!' },
    });
    fireEvent.change(screen.getByLabelText(/^Confirmare parolă nouă$/i), {
      target: { value: 'NewPassword123!' },
    });

    // Găsim formularul și declanșăm evenimentul de submit direct
    const form = screen.getByRole('form', { hidden: true }) || document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Submit form
    fireEvent.submit(form!);

    // Verificăm că resetPassword a fost apelat cu parametrii corecți
    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalledWith({
        token: 'valid-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      });
    });

    // Verificăm că mesajul de succes este afișat
    expect(await screen.findByText(/Parolă resetată cu succes/i)).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Autentificare/i })).toBeInTheDocument();
  });

  it('shows error message when reset password fails', async () => {
    // Mock validateResetToken to return true
    vi.mocked(authService.validateResetToken).mockResolvedValue(true);
    // Mock resetPassword to reject with error
    vi.mocked(authService.resetPassword).mockRejectedValue({
      response: {
        data: {
          message: 'Token-ul de resetare a parolei a expirat',
        },
      },
    });

    // Mock-uim searchParams pentru a furniza token-ul
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom');
      return {
        ...actual,
        useSearchParams: () => [new URLSearchParams({ token: 'valid-token' })],
      };
    });

    render(
      <BrowserRouter>
        <ResetPasswordPage />
      </BrowserRouter>,
    );

    // Wait for token validation to complete
    await waitFor(() => {
      expect(screen.getByText(/Resetare parolă/i)).toBeInTheDocument();
    });

    // Fill in password fields
    fireEvent.change(screen.getByLabelText(/^Parolă nouă$/i), {
      target: { value: 'NewPassword123!' },
    });
    fireEvent.change(screen.getByLabelText(/^Confirmare parolă nouă$/i), {
      target: { value: 'NewPassword123!' },
    });

    // Găsim formularul și declanșăm evenimentul de submit direct
    const form = screen.getByRole('form', { hidden: true }) || document.querySelector('form');
    expect(form).toBeInTheDocument();

    // Submit form
    fireEvent.submit(form!);

    // Verificăm că resetPassword a fost apelat
    await waitFor(() => {
      expect(authService.resetPassword).toHaveBeenCalled();
    });

    // Verificăm că un mesaj de eroare este afișat (mesajul exact poate varia)
    expect(await screen.findByText(/Cererea nu a putut fi procesată/i)).toBeInTheDocument();
  });
});
