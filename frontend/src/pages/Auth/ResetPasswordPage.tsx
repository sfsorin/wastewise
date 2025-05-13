import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import authService from '../../services/authService';

/**
 * Pagina pentru resetarea parolei
 */
const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isValidToken, setIsValidToken] = useState(false);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const _navigate = useNavigate();

  // Verificăm validitatea token-ului la încărcarea paginii
  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsValidToken(false);
        setIsTokenChecking(false);
        return;
      }

      try {
        const isValid = await authService.validateResetToken(token);
        setIsValidToken(isValid);
      } catch {
        setIsValidToken(false);
      } finally {
        setIsTokenChecking(false);
      }
    };

    checkToken();
  }, [token]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validare simplă
    if (!password || !confirmPassword) {
      setError('Toate câmpurile sunt obligatorii');
      return;
    }

    if (password !== confirmPassword) {
      setError('Parolele nu coincid');
      return;
    }

    if (password.length < 8) {
      setError('Parola trebuie să aibă cel puțin 8 caractere');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await authService.resetPassword({
        token,
        password,
        passwordConfirmation: confirmPassword,
      });

      setIsSubmitted(true);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Cererea nu a putut fi procesată. Încercați din nou mai târziu.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Afișăm un mesaj de încărcare în timp ce verificăm token-ul
  if (isTokenChecking) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Se verifică link-ul de resetare...</p>
      </div>
    );
  }

  // Afișăm un mesaj de eroare dacă token-ul nu este valid
  if (!isValidToken) {
    return (
      <div className="text-center">
        <div className="mb-6 text-danger-600 dark:text-danger-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Link invalid sau expirat</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Link-ul de resetare a parolei este invalid sau a expirat. Vă rugăm să solicitați un nou
          link de resetare.
        </p>

        <Link to="/auth/forgot-password">
          <Button label="Solicită un nou link" variant="primary" className="w-full" />
        </Link>
      </div>
    );
  }

  // Afișăm un mesaj de succes dacă parola a fost resetată
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-6 text-success-600 dark:text-success-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-4">Parolă resetată cu succes</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Parola dumneavoastră a fost resetată cu succes. Acum vă puteți autentifica cu noua parolă.
        </p>

        <Link to="/auth/login">
          <Button label="Autentificare" variant="primary" className="w-full" />
        </Link>
      </div>
    );
  }

  // Afișăm formularul de resetare a parolei
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Resetare parolă</h1>

      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Introduceți noua parolă pentru contul dumneavoastră.
      </p>

      {error && <div className="bg-danger-50 text-danger-700 p-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Parolă nouă
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Confirmare parolă nouă
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          label={isLoading ? 'Se procesează...' : 'Resetează parola'}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <Link to="/auth/login" className="text-primary-600 dark:text-primary-400 hover:underline">
            Înapoi la autentificare
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
