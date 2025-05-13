import { Link } from 'react-router-dom';

/**
 * Footer-ul principal al aplicației
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center">
              <img src="/logo.svg" alt="WasteWise Logo" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-600 dark:text-primary-400">
                WasteWise
              </span>
            </Link>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Platforma modernă pentru managementul eficient al deșeurilor, oferind soluții digitale
              pentru monitorizare, analiză și optimizare.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
              Navigare
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Acasă
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Despre
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Autentificare
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/register"
                  className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  Înregistrare
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Email:</span> contact@wastewise.com
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Telefon:</span> +40 123 456 789
              </li>
              <li className="text-gray-600 dark:text-gray-400">
                <span className="font-medium">Adresă:</span> Str. Exemplu nr. 123, București
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              &copy; {currentYear} WasteWise. Toate drepturile rezervate.
            </p>

            <div className="mt-4 md:mt-0 flex space-x-4">
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
              >
                Termeni și condiții
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
              >
                Politica de confidențialitate
              </a>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 text-sm"
              >
                Cookie-uri
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
