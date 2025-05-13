/**
 * Acest fișier este doar pentru a testa că path aliases funcționează corect.
 * Nu este utilizat în aplicație.
 */

import { API_BASE_URL } from '@config/api.config';
import { APP_INFO } from '@config/app.config';

// Dacă acest fișier se compilează fără erori, înseamnă că path aliases funcționează corect.
// Folosim info în loc de console.log pentru a evita avertismentele de linting
const logInfo = (): void => {
  console.info('API_BASE_URL:', API_BASE_URL);
  console.info('APP_INFO:', APP_INFO);
};

export const testPathAliases = (): void => {
  console.info('Path aliases funcționează corect!');
  logInfo();
};
