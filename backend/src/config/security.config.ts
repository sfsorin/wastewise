import { registerAs } from '@nestjs/config';

/**
 * Configurație pentru securitate
 * Utilizat pentru rate limiting, CSRF, etc.
 */
export default registerAs('security', () => ({
  /**
   * Configurație pentru rate limiting
   * Utilizat pentru a limita numărul de cereri pe un interval de timp
   */
  rateLimiting: {
    /**
     * Timpul în secunde pentru care se aplică limita
     */
    ttl: parseInt(process.env.RATE_LIMIT_TTL || '60', 10),

    /**
     * Numărul maxim de cereri permise în intervalul de timp
     */
    limit: parseInt(process.env.RATE_LIMIT_LIMIT || '10', 10),
  },

  /**
   * Configurație pentru protecția CSRF
   */
  csrf: {
    /**
     * Activează sau dezactivează protecția CSRF
     */
    enabled: process.env.CSRF_ENABLED === 'true',

    /**
     * Secretul utilizat pentru generarea token-urilor CSRF
     */
    secret: process.env.CSRF_SECRET || 'wastewise_csrf_secret',

    /**
     * Cookie-ul utilizat pentru stocarea token-ului CSRF
     */
    cookie: {
      /**
       * Numele cookie-ului
       */
      name: process.env.CSRF_COOKIE_NAME || 'XSRF-TOKEN',

      /**
       * Durata de viață a cookie-ului în secunde
       */
      maxAge: parseInt(process.env.CSRF_COOKIE_MAX_AGE || '86400', 10), // 24 ore

      /**
       * Domeniul cookie-ului
       */
      domain: process.env.CSRF_COOKIE_DOMAIN || undefined,

      /**
       * Calea cookie-ului
       */
      path: process.env.CSRF_COOKIE_PATH || '/',

      /**
       * Indică dacă cookie-ul este transmis doar prin HTTPS
       */
      secure: process.env.CSRF_COOKIE_SECURE === 'true',

      /**
       * Politica SameSite pentru cookie
       */
      sameSite: (process.env.CSRF_COOKIE_SAME_SITE as 'strict' | 'lax' | 'none') || 'strict',
    },
  },

  /**
   * Configurație pentru invalidarea token-urilor JWT
   */
  jwtBlacklist: {
    /**
     * Activează sau dezactivează lista neagră pentru token-urile JWT
     */
    enabled: process.env.JWT_BLACKLIST_ENABLED === 'true',

    /**
     * Durata de viață a token-urilor în lista neagră (în secunde)
     * Ar trebui să fie cel puțin egală cu durata de viață a token-urilor JWT
     */
    ttl: parseInt(process.env.JWT_BLACKLIST_TTL || '86400', 10), // 24 ore
  },
}));
