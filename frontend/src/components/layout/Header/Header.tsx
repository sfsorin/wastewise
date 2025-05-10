import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ThemeToggle from '../../common/ThemeToggle/ThemeToggle';

/**
 * Header-ul principal al aplicației
 */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.svg" 
                alt="WasteWise Logo" 
                className="h-8 w-auto" 
              />
              <span className="ml-2 text-xl font-bold text-primary-600 dark:text-primary-400">
                WasteWise
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                }`
              }
              end
            >
              Acasă
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                }`
              }
            >
              Despre
            </NavLink>
          </nav>
          
          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <Link 
              to="/auth/login" 
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              Autentificare
            </Link>
            
            <Link 
              to="/auth/register" 
              className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors"
            >
              Înregistrare
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Deschide meniul</span>
              {isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-md">
          <div className="container mx-auto px-4 py-3 space-y-3">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
              end
            >
              Acasă
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 ${
                  isActive ? 'text-primary-600 dark:text-primary-400 font-medium' : ''
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Despre
            </NavLink>
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex flex-col space-y-3">
              <Link 
                to="/auth/login" 
                className="block text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Autentificare
              </Link>
              
              <Link 
                to="/auth/register" 
                className="block bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Înregistrare
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
