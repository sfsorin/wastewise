import { Outlet, Link } from 'react-router-dom';
import ThemeToggle from '../../components/common/ThemeToggle/ThemeToggle';

/**
 * Layout pentru paginile de autentificare
 */
const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="flex items-center justify-center mt-8 mb-6">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="WasteWise Logo" className="h-10 w-auto" />
          <span className="ml-2 text-2xl font-bold text-primary-600 dark:text-primary-400">
            WasteWise
          </span>
        </Link>
      </div>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-8">
            <Outlet />
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>© {new Date().getFullYear()} WasteWise. Toate drepturile rezervate.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
