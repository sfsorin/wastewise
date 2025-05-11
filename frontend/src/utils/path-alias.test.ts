/**
 * Acest fișier este doar pentru a testa că path aliases funcționează corect.
 * Nu este utilizat în aplicație.
 */

import { API_BASE_URL } from '@config/api.config';
import { APP_INFO } from '@config/app.config';

// Dacă acest fișier se compilează fără erori, înseamnă că path aliases funcționează corect.
console.log('API_BASE_URL:', API_BASE_URL);
console.log('APP_INFO:', APP_INFO);

export const testPathAliases = (): void => {
  console.log('Path aliases funcționează corect!');
};
