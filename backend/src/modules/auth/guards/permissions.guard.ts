import { Injectable, CanActivate, ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Request } from 'express';

/**
 * Interfață pentru utilizatorul autentificat cu permisiuni
 */
interface AuthenticatedUser {
  id: string;
  username: string;
  email: string;
  role: string;
  permissions?: string[];
}

/**
 * Interfață pentru request cu utilizator autentificat
 */
interface RequestWithUser extends Request {
  user: AuthenticatedUser;
}

/**
 * Guard pentru verificarea permisiunilor utilizatorului
 * Verifică dacă utilizatorul are cel puțin una dintre permisiunile necesare
 */
@Injectable()
export class PermissionsGuard implements CanActivate {
  private readonly logger = new Logger(PermissionsGuard.name);

  constructor(private reflector: Reflector) {}

  /**
   * Verifică dacă utilizatorul are permisiunile necesare pentru a accesa ruta
   * @param context Contextul execuției
   * @returns true dacă utilizatorul are permisiunile necesare, false în caz contrar
   */
  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Dacă nu sunt specificate permisiuni, permitem accesul
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    // Dacă nu există utilizator sau nu are permisiuni, blocăm accesul
    if (!user || !user.permissions) {
      this.logger.warn('Acces refuzat: utilizator fără permisiuni sau neautentificat');
      return false;
    }

    // Verificăm dacă utilizatorul are cel puțin una dintre permisiunile necesare
    const hasPermission = requiredPermissions.some(
      permission => user.permissions?.includes(permission) || false,
    );

    if (!hasPermission) {
      this.logger.warn(
        `Acces refuzat pentru utilizatorul ${user.username}: lipsesc permisiunile ${requiredPermissions.join(', ')}`,
      );
    }

    return hasPermission;
  }
}
