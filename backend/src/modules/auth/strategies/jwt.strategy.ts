import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../../users/entities/user.entity';
import { TokenBlacklistService } from '../services/token-blacklist.service';

/**
 * Interfață pentru payload-ul JWT
 */
export interface JwtPayload {
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
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    configService: ConfigService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private tokenBlacklistService: TokenBlacklistService,
  ) {
    const secret = configService.get<string>('jwt.secret') || 'wastewise_secret_key';
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret,
      passReqToCallback: true, // Pasăm request-ul pentru a putea accesa token-ul original
    });
  }

  async validate(
    request: any,
    payload: JwtPayload,
  ): Promise<{
    id: string;
    username: string;
    email: string;
    role: string;
    permissions?: string[];
  }> {
    try {
      // Extragem token-ul din request
      const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

      // Verificăm dacă token-ul este în lista neagră
      const isBlacklisted = await this.tokenBlacklistService.isBlacklisted(token);
      if (isBlacklisted) {
        this.logger.warn(`Token-ul pentru utilizatorul ${payload.username} este în lista neagră`);
        throw new UnauthorizedException('Token revocat');
      }

      // Verificăm dacă utilizatorul există în baza de date
      const user = await this.usersRepository.findOne({
        where: { id: payload.sub },
        relations: ['roles', 'roles.permissions'],
      });

      if (!user) {
        this.logger.warn(`Utilizatorul cu ID ${payload.sub} nu a fost găsit în baza de date`);
        throw new UnauthorizedException('Utilizatorul nu există');
      }

      if (user.status !== UserStatus.ACTIVE) {
        this.logger.warn(
          `Utilizatorul cu ID ${payload.sub} nu este activ (status: ${user.status})`,
        );
        throw new UnauthorizedException('Contul este inactiv');
      }

      // Extragem permisiunile din roluri
      const permissions = user.roles
        ? user.roles
            .flatMap(role => role.permissions || [])
            .map(permission => permission.name)
            .filter((value, index, self) => self.indexOf(value) === index) // Eliminăm duplicatele
        : [];

      return {
        id: payload.sub,
        username: payload.username,
        email: payload.email,
        role: payload.role,
        permissions,
      };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
      this.logger.error(`Eroare la validarea token-ului JWT: ${errorMessage}`);
      throw new UnauthorizedException('Token invalid');
    }
  }
}
