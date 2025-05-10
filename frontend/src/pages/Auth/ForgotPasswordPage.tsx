import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

/**
 * Pagina pentru recuperarea parolei
 */
const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Validare simplă
    if (!email) {
      setError('Adresa de email este obligatorie');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Simulăm un apel către API
      // În implementarea reală, aici ar fi un apel către backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulăm trimiterea reușită
      setIsSubmitted(true);
    } catch (err) {
      setError('Cererea nu a putut fi procesată. Încercați din nou mai târziu.');
    } finally {
      setIsLoading(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="mb-6 text-primary-600 dark:text-primary-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Verificați-vă email-ul</h1>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Am trimis un email la adresa <strong>{email}</strong> cu instrucțiuni pentru resetarea parolei.
        </p>
        
        <div className="flex flex-col space-y-4">
          <Link to="/auth/login">
            <Button
              label="Înapoi la autentificare"
              variant="primary"
              className="w-full"
            />
          </Link>
          
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            Nu ați primit email-ul? Încercați din nou
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-6">Recuperare parolă</h1>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Introduceți adresa de email asociată contului dumneavoastră și vă vom trimite un link pentru resetarea parolei.
      </p>
      
      {error && (
        <div className="bg-danger-50 text-danger-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
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
        
        <Button
          type="submit"
          label={isLoading ? 'Se procesează...' : 'Trimite link de resetare'}
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

export default ForgotPasswordPage;
