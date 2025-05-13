import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

/**
 * Pagina 404 Not Found
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 dark:text-primary-400">404</h1>

        <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6">Pagina nu a fost găsită</h2>

        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
          Ne pare rău, pagina pe care o căutați nu există sau a fost mutată.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button label="Înapoi la pagina anterioară" variant="outline" onClick={handleGoBack} />

          <Link to="/">
            <Button label="Pagina principală" variant="primary" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
