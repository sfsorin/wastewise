import { Link } from 'react-router-dom';
import Button from '../../components/common/Button/Button';

/**
 * Pagina principală a aplicației
 */
const HomePage = () => {
  return (
    <div className="flex flex-col items-center">
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Bine ați venit la <span className="text-primary-600">WasteWise</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Platforma modernă pentru managementul eficient al deșeurilor
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth/register">
            <Button 
              label="Înregistrare" 
              variant="primary" 
              size="lg" 
            />
          </Link>
          <Link to="/auth/login">
            <Button 
              label="Autentificare" 
              variant="outline" 
              size="lg" 
            />
          </Link>
        </div>
      </section>
      
      <section className="py-12 w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-8 text-center">Funcționalități principale</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary-600 dark:text-primary-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Monitorizare în timp real</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Urmărește colectarea și procesarea deșeurilor în timp real cu rapoarte detaliate.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary-600 dark:text-primary-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Analiză și raportare</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Generează rapoarte detaliate și vizualizează statistici pentru a optimiza procesele.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-primary-600 dark:text-primary-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Programare și notificări</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Planifică colectarea deșeurilor și primește notificări automate pentru evenimente importante.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
