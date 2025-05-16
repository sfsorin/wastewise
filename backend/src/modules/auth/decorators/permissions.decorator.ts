import { SetMetadata } from '@nestjs/common';

/**
 * Cheia utilizată pentru stocarea metadatelor de permisiuni
 */
export const PERMISSIONS_KEY = 'permissions';

/**
 * Decorator pentru specificarea permisiunilor necesare pentru accesarea unui endpoint
 * @param permissions Lista de permisiuni necesare
 * @returns Decorator pentru metadate
 *
 * @example
 * ```typescript
 * @Permissions('create:users', 'update:users')
 * @Get()
 * findAll() {
 *   return this.usersService.findAll();
 * }
 * ```
 */
export const Permissions = (...permissions: string[]): ReturnType<typeof SetMetadata> =>
  SetMetadata(PERMISSIONS_KEY, permissions);
