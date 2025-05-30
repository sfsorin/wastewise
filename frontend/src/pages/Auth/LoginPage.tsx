import { useState, useEffect, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import { useAuthStore } from '../../stores';

/**
 * Pagina de autentificare
 * Folosește Zustand pentru gestionarea stării de autentificare
 */
const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  // Obținem locația anterioară din state, dacă există
  const from = location.state?.from?.pathname || '/dashboard';

  // Folosim store-ul de autentificare
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  // Redirecționăm utilizatorul dacă este deja autentificat
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  // Resetăm eroarea când se schimbă username/email sau parola
  useEffect(() => {
    if (error) {
      clearError();
    }
  }, [usernameOrEmail, password, clearError, error]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validare simplă
    if (!usernameOrEmail || !password) {
      // Folosim store-ul pentru a seta eroarea
      clearError();
      setTimeout(() => {
        useAuthStore.getState().clearError();
        useAuthStore.setState({ error: 'Toate câmpurile sunt obligatorii' });
      }, 0);
      return;
    }

    // Folosim acțiunea login din store
    try {
      await login(usernameOrEmail, password);
      // Redirecționarea se face în efectul useEffect care monitorizează isAuthenticated
      console.log('Autentificare reușită, redirecționare către:', from);
    } catch (error) {
      console.error('Eroare la autentificare:', error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Autentificare</h1>

      {error && <div className="bg-danger-50 text-danger-700 p-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="usernameOrEmail"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nume utilizator sau Email
          </label>
          <input
            id="usernameOrEmail"
            type="text"
            value={usernameOrEmail}
            onChange={e => setUsernameOrEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="nume utilizator sau email"
            required
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Parolă
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              Ai uitat parola?
            </Link>
          </div>
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

        <Button
          type="submit"
          label={isLoading ? 'Se procesează...' : 'Autentificare'}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Nu ai cont?{' '}
          <Link
            to="/auth/register"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
