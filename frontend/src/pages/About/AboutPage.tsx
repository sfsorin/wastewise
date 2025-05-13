/**
 * Pagina About cu informații despre aplicație
 */
const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Despre WasteWise</h1>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">
          Misiunea noastră
        </h2>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          WasteWise este o platformă inovatoare dedicată îmbunătățirii managementului deșeurilor
          prin tehnologie și date. Misiunea noastră este să transformăm modul în care organizațiile
          gestionează deșeurile, făcând procesul mai eficient, transparent și sustenabil.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Prin soluțiile noastre digitale, ajutăm companiile și autoritățile publice să
          monitorizeze, analizeze și optimizeze procesele de colectare și procesare a deșeurilor,
          contribuind la reducerea impactului asupra mediului și la promovarea economiei circulare.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">
          Echipa noastră
        </h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Suntem o echipă de profesioniști pasionați de tehnologie și sustenabilitate, dedicați
          dezvoltării de soluții inovatoare pentru provocările de mediu actuale.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Expertiză tehnică</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Echipa noastră tehnică combină cunoștințe avansate în dezvoltare software, analiză de
              date și inteligență artificială pentru a crea soluții robuste și scalabile.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">Expertiză în domeniul mediului</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Colaborăm cu experți în managementul deșeurilor și protecția mediului pentru a ne
              asigura că soluțiile noastre respectă cele mai bune practici din domeniu.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">
          Tehnologii utilizate
        </h2>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Platforma WasteWise este construită folosind tehnologii moderne și arhitecturi scalabile:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold mb-2">Frontend</h3>
            <p className="text-gray-600 dark:text-gray-300">React, TypeScript, Tailwind CSS</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold mb-2">Backend</h3>
            <p className="text-gray-600 dark:text-gray-300">NestJS, TypeScript, PostgreSQL</p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md text-center">
            <h3 className="font-bold mb-2">Infrastructură</h3>
            <p className="text-gray-600 dark:text-gray-300">Docker, Kubernetes, AWS</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-primary-600 dark:text-primary-400">Contact</h2>
        <p className="text-lg mb-4 text-gray-700 dark:text-gray-300">
          Pentru mai multe informații sau pentru a discuta despre cum WasteWise poate ajuta
          organizația dumneavoastră, nu ezitați să ne contactați:
        </p>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <h3 className="font-bold">Email:</h3>
            <p className="text-primary-600 dark:text-primary-400">contact@wastewise.com</p>
          </div>

          <div className="mb-4">
            <h3 className="font-bold">Telefon:</h3>
            <p>+40 123 456 789</p>
          </div>

          <div>
            <h3 className="font-bold">Adresă:</h3>
            <p>Str. Exemplu nr. 123, București, România</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
