import { SetMetadata } from '@nestjs/common';

/**
 * Cheia utilizată pentru a marca o rută ca fiind publică (nu necesită autentificare)
 */
export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator pentru a marca o rută ca fiind publică (nu necesită autentificare)
 *
 * @example
 * ```typescript
 * @Public()
 * @Get('public-endpoint')
 * publicEndpoint() {
 *   return 'Acest endpoint este public';
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
