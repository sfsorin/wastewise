import { useState, FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

/**
 * Pagina de autentificare
 */
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Obținem locația anterioară din state, dacă există
  const from = location.state?.from?.pathname || '/dashboard';
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validare simplă
    if (!email || !password) {
      setError('Toate câmpurile sunt obligatorii');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Simulăm un apel către API
      // În implementarea reală, aici ar fi un apel către backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulăm autentificarea reușită
      localStorage.setItem('auth_token', 'dummy_token');
      
      // Redirecționăm utilizatorul către pagina anterioară sau dashboard
      navigate(from, { replace: true });
    } catch (err) {
      setError('Autentificare eșuată. Verificați credențialele și încercați din nou.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Autentificare</h1>
      
      {error && (
        <div className="bg-danger-50 text-danger-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
            placeholder="nume@exemplu.com"
            required
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Parolă
            </label>
            <Link to="/auth/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              Ai uitat parola?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <Link to="/auth/register" className="text-primary-600 dark:text-primary-400 hover:underline">
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
