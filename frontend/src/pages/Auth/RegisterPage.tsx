import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button/Button';
import useAuthStore from '../../stores/authStore';

/**
 * Pagina de înregistrare
 */
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { register, isLoading, error, clearError, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Obținem URL-ul de redirecționare după înregistrare
  const from = location.state?.from?.pathname || '/dashboard';

  // Redirecționăm utilizatorul dacă este deja autentificat
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    // Validare simplă
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      useAuthStore.setState({ error: 'Toate câmpurile sunt obligatorii' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      useAuthStore.setState({ error: 'Parolele nu coincid' });
      return;
    }

    if (formData.password.length < 8) {
      useAuthStore.setState({ error: 'Parola trebuie să aibă cel puțin 8 caractere' });
      return;
    }

    try {
      await register({
        username: formData.name,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });

      // Dacă înregistrarea a reușit, utilizatorul va fi redirecționat automat
      // datorită efectului care verifică isAuthenticated
    } catch (error) {
      // Eroarea este gestionată în store
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Înregistrare</h1>

      {error && <div className="bg-danger-50 text-danger-700 p-3 rounded-md mb-4">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Nume complet
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="Nume Prenume"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="nume@exemplu.com"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Parolă
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
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
            Confirmare parolă
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="••••••••"
            required
          />
        </div>

        <Button
          type="submit"
          label={isLoading ? 'Se procesează...' : 'Înregistrare'}
          variant="primary"
          className="w-full"
          disabled={isLoading}
        />
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Ai deja cont?{' '}
          <Link to="/auth/login" className="text-primary-600 dark:text-primary-400 hover:underline">
            Autentifică-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
