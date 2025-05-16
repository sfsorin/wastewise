import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as csurf from 'csurf';
import * as cookieParser from 'cookie-parser';

/**
 * Middleware pentru protecția CSRF
 * Utilizează csurf pentru a genera și valida token-uri CSRF
 */
@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  private readonly logger = new Logger(CsrfMiddleware.name);
  private readonly csrfMiddleware: any;
  private readonly cookieParserMiddleware: any;
  private readonly enabled: boolean;

  constructor(private configService: ConfigService) {
    this.enabled = this.configService.get<boolean>('security.csrf.enabled') || false;
    
    // Inițializăm middleware-ul cookie-parser
    this.cookieParserMiddleware = cookieParser();

    // Inițializăm middleware-ul csurf doar dacă este activat
    if (this.enabled) {
      const csrfSecret = this.configService.get<string>('security.csrf.secret');
      const cookieName = this.configService.get<string>('security.csrf.cookie.name');
      const cookieMaxAge = this.configService.get<number>('security.csrf.cookie.maxAge');
      const cookieDomain = this.configService.get<string>('security.csrf.cookie.domain');
      const cookiePath = this.configService.get<string>('security.csrf.cookie.path');
      const cookieSecure = this.configService.get<boolean>('security.csrf.cookie.secure');
      const cookieSameSite = this.configService.get<'strict' | 'lax' | 'none'>('security.csrf.cookie.sameSite');

      this.csrfMiddleware = csurf({
        cookie: {
          key: cookieName,
          maxAge: cookieMaxAge,
          domain: cookieDomain,
          path: cookiePath,
          secure: cookieSecure,
          sameSite: cookieSameSite,
          httpOnly: true,
        },
        value: (req: Request) => {
          // Obținem token-ul din header-ul X-CSRF-TOKEN sau din cookie
          return req.headers['x-csrf-token'] as string || req.cookies[cookieName];
        },
        ignoreMethods: ['GET', 'HEAD', 'OPTIONS'],
        sessionKey: undefined,
        secret: csrfSecret,
      });

      this.logger.log('Protecția CSRF a fost activată');
    } else {
      this.logger.warn('Protecția CSRF este dezactivată');
      // Middleware gol dacă CSRF este dezactivat
      this.csrfMiddleware = (req: Request, res: Response, next: NextFunction) => next();
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    // Aplicăm middleware-ul cookie-parser
    this.cookieParserMiddleware(req, res, (err: any) => {
      if (err) {
        this.logger.error(`Eroare la parsarea cookie-urilor: ${err.message}`);
        return next(err);
      }

      // Aplicăm middleware-ul CSRF
      this.csrfMiddleware(req, res, (csrfErr: any) => {
        if (csrfErr) {
          this.logger.error(`Eroare CSRF: ${csrfErr.message}`);
          return next(csrfErr);
        }

        // Adăugăm token-ul CSRF în header-ul de răspuns dacă CSRF este activat
        if (this.enabled && req.csrfToken) {
          const token = req.csrfToken();
          res.header('X-CSRF-Token', token);
        }

        next();
      });
    });
  }
}
