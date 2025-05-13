import { useState } from 'react';
import Button from '../../components/common/Button/Button';

/**
 * Pagina de setări utilizator
 */
const SettingsPage = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sms: false,
    weeklyReport: true,
    monthlyReport: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    activityVisibility: 'contacts',
    dataSharing: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleNotificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setNotificationSettings(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePrivacyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setPrivacySettings(prev => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSaving(true);

    // Simulăm un apel către API
    await new Promise(resolve => setTimeout(resolve, 1000));

    setIsSaving(false);

    // Simulăm o notificare de succes
    alert('Setările au fost salvate cu succes!');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Setări</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Gestionați preferințele contului dumneavoastră
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Setări notificări */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Notificări</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificări prin email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primiți notificări prin email pentru activități importante
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="email"
                  className="sr-only peer"
                  checked={notificationSettings.email}
                  onChange={handleNotificationChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificări push</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primiți notificări push în browser pentru actualizări în timp real
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="push"
                  className="sr-only peer"
                  checked={notificationSettings.push}
                  onChange={handleNotificationChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notificări SMS</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primiți notificări prin SMS pentru alerte urgente
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="sms"
                  className="sr-only peer"
                  checked={notificationSettings.sms}
                  onChange={handleNotificationChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Raport săptămânal</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primiți un raport săptămânal cu statistici și activități
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="weeklyReport"
                  className="sr-only peer"
                  checked={notificationSettings.weeklyReport}
                  onChange={handleNotificationChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Raport lunar</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Primiți un raport lunar detaliat cu analize și recomandări
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="monthlyReport"
                  className="sr-only peer"
                  checked={notificationSettings.monthlyReport}
                  onChange={handleNotificationChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>
          </div>
        </div>

        {/* Setări confidențialitate */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4">Confidențialitate</h2>

          <div className="space-y-6">
            <div>
              <label htmlFor="profileVisibility" className="block font-medium mb-1">
                Vizibilitate profil
              </label>
              <select
                id="profileVisibility"
                name="profileVisibility"
                value={privacySettings.profileVisibility}
                onChange={handlePrivacyChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="public">Public - Vizibil pentru toți utilizatorii</option>
                <option value="contacts">
                  Contacte - Vizibil doar pentru contactele dumneavoastră
                </option>
                <option value="private">Privat - Vizibil doar pentru dumneavoastră</option>
              </select>
            </div>

            <div>
              <label htmlFor="activityVisibility" className="block font-medium mb-1">
                Vizibilitate activitate
              </label>
              <select
                id="activityVisibility"
                name="activityVisibility"
                value={privacySettings.activityVisibility}
                onChange={handlePrivacyChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="public">Public - Vizibil pentru toți utilizatorii</option>
                <option value="contacts">
                  Contacte - Vizibil doar pentru contactele dumneavoastră
                </option>
                <option value="private">Privat - Vizibil doar pentru dumneavoastră</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Partajare date pentru îmbunătățirea serviciului</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Permiteți partajarea datelor anonimizate pentru îmbunătățirea serviciului
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="dataSharing"
                  className="sr-only peer"
                  checked={privacySettings.dataSharing}
                  onChange={handlePrivacyChange}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="submit"
            label={isSaving ? 'Se salvează...' : 'Salvare setări'}
            variant="primary"
            disabled={isSaving}
          />
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;
