import { registerAs } from '@nestjs/config';

/**
 * Configurație pentru JWT (JSON Web Tokens)
 * Utilizat pentru autentificare și autorizare
 */
export default registerAs('jwt', () => ({
  /**
   * Secret-ul utilizat pentru semnarea token-urilor JWT
   * În producție, utilizați o valoare complexă și securizată
   */
  secret: process.env.JWT_SECRET || 'wastewise_secret_key',

  /**
   * Durata de viață a token-urilor JWT de acces
   * Format: https://github.com/vercel/ms
   * Exemple: '1h', '1d', '7d', etc.
   */
  expiresIn: process.env.JWT_EXPIRATION || '24h',

  /**
   * Durata de viață a token-urilor de refresh
   * Format: https://github.com/vercel/ms
   * De obicei mai lungă decât pentru token-urile de acces
   */
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRATION || '7d',

  /**
   * Algoritmul utilizat pentru semnarea token-urilor
   * HS256 este cel mai comun, dar puteți utiliza și altele precum RS256
   */
  algorithm: process.env.JWT_ALGORITHM || 'HS256',
}));
