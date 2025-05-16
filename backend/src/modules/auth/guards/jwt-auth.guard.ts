import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Observable } from 'rxjs';

/**
 * Guard pentru autentificare cu JWT
 * Verifică dacă utilizatorul este autentificat, cu excepția rutelor marcate ca publice
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private reflector: Reflector) {
    super();
  }

  /**
   * Verifică dacă ruta este publică sau necesită autentificare
   * @param context Contextul execuției
   * @returns true dacă ruta este publică sau utilizatorul este autentificat, false în caz contrar
   */
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Verificăm dacă ruta este marcată ca publică
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Dacă ruta este publică, permitem accesul fără autentificare
    if (isPublic) {
      this.logger.debug('Rută publică, permitem accesul fără autentificare');
      return true;
    }

    // Altfel, verificăm autentificarea
    return super.canActivate(context);
  }

  /**
   * Gestionează erorile de autentificare
   * @param err Eroarea
   * @param user Utilizatorul
   * @param info Informații suplimentare
   * @returns Utilizatorul autentificat
   */
  handleRequest(err: any, user: any, info: any): any {
    // Dacă există o eroare sau utilizatorul nu este autentificat, aruncăm o excepție
    if (err || !user) {
      const errorMessage = err?.message || info?.message || 'Autentificare necesară';
      this.logger.warn(`Autentificare eșuată: ${errorMessage}`);
      throw new UnauthorizedException(errorMessage);
    }

    return user;
  }
}
