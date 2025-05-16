import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Interfață pentru payload-ul JWT
 */
interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  permissions?: string[];
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secret = configService.get<string>('jwt.secret') || 'wastewise_secret_key';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
    });
  }

  async validate(payload: JwtPayload): Promise<{
    id: string;
    username: string;
    email: string;
    role: string;
    permissions?: string[];
  }> {
    // Simulăm o operație asincronă pentru a justifica async
    await Promise.resolve();

    return {
      id: payload.sub,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      permissions: payload.permissions || [],
    };
  }
}
