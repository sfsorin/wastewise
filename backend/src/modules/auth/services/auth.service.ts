import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Logger,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from 'express';
import * as crypto from 'crypto';
import { UsersService } from '../../users/users.service';
import { MailService } from './mail.service';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { UserStatus, UserRole } from '../../users/entities/user.entity';
import { Role } from '../../users/entities/role.entity';
import { RefreshToken } from '../entities/refresh-token.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private mailService: MailService,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<{
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    fullName: string;
    role: UserRole;
    status: UserStatus;
    isActive: boolean;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date;
    roles: Role[];
  } | null> {
    try {
      this.logger.debug(`Încercare de autentificare pentru utilizatorul: ${username}`);
      const user = await this.usersService.findByUsernameOrEmail(username);

      if (!user) {
        this.logger.debug(`Utilizatorul ${username} nu a fost găsit`);
        return null;
      }

      this.logger.debug(`Utilizatorul ${username} găsit, verificare parolă...`);
      const isPasswordValid = await user.validatePassword(password);
      this.logger.debug(`Rezultat validare parolă: ${isPasswordValid}`);

      if (isPasswordValid) {
        const { password: _password, ...result } = user;
        return result as {
          id: string;
          username: string;
          email: string;
          firstName: string;
          lastName: string;
          fullName: string;
          role: UserRole;
          status: UserStatus;
          isActive: boolean;
          lastLogin: Date;
          createdAt: Date;
          updatedAt: Date;
          roles: Role[];
        };
      }

      return null;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la validarea utilizatorului: ${errorMessage}`);
      return null;
    }
  }

  async login(
    loginDto: LoginDto,
    request?: Request,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      fullName?: string;
      role: string;
      permissions?: string[];
    };
  }> {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Credențiale invalide');
    }

    if (user.status !== UserStatus.ACTIVE) {
      throw new UnauthorizedException('Contul este inactiv');
    }

    // Actualizare data ultimei autentificări
    await this.usersService.updateLastLogin(user.id);

    // Obținem permisiunile utilizatorului din roluri
    const userWithRoles = await this.usersService.findOneWithRoles(user.id);
    const permissions = userWithRoles.roles
      ? userWithRoles.roles
          .flatMap((role: any) => role.permissions || [])
          .map((permission: any) => permission.name)
          .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // Eliminăm duplicatele
      : [];

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions,
    };

    // Generăm token-ul JWT de acces
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });

    // Generăm token-ul de refresh
    const refreshToken = await this.generateRefreshToken(user.id, request);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        permissions,
      },
    };
  }

  async register(
    registerDto: RegisterDto,
    request?: Request,
  ): Promise<{
    access_token: string;
    refresh_token: string;
    user: {
      id: string;
      username: string;
      email: string;
      fullName?: string;
      role: string;
      permissions?: string[];
    };
  }> {
    // Eliminăm câmpul passwordConfirmation înainte de a crea utilizatorul
    const { passwordConfirmation, ...userData } = registerDto;

    const user = await this.usersService.create(userData);

    // Obținem utilizatorul cu relațiile pentru roluri și permisiuni
    const userWithRoles = await this.usersService.findOneWithRoles(user.id);

    // Extragem permisiunile din roluri
    const permissions = userWithRoles.roles
      ? userWithRoles.roles
          .flatMap((role: any) => role.permissions || [])
          .map((permission: any) => permission.name)
          .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index) // Eliminăm duplicatele
      : [];

    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      permissions,
    };

    // Generăm token-ul JWT de acces
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('jwt.expiresIn'),
    });

    // Generăm token-ul de refresh
    const refreshToken = await this.generateRefreshToken(user.id, request);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        permissions,
      },
    };
  }
  async getProfile(userId: string): Promise<{
    id: string;
    username: string;
    email: string;
    fullName?: string;
    role: string;
  }> {
    const user = await this.usersService.findOne(userId);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { token, user } = await this.usersService.createPasswordResetToken(
      forgotPasswordDto.email,
    );

    const resetLink = `${this.configService.get<string>('FRONTEND_URL')}/reset-password?token=${token}`;

    await this.mailService.sendPasswordResetEmail(user.email, resetLink, user.username);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    if (resetPasswordDto.password !== resetPasswordDto.passwordConfirmation) {
      throw new BadRequestException('Parola și confirmarea parolei nu coincid');
    }

    const isValidToken = await this.usersService.validatePasswordResetToken(resetPasswordDto.token);
    if (!isValidToken) {
      throw new BadRequestException('Token-ul de resetare a parolei este invalid sau a expirat');
    }

    await this.usersService.resetPassword(resetPasswordDto.token, resetPasswordDto.password);
  }

  async validateResetToken(token: string): Promise<boolean> {
    return this.usersService.validatePasswordResetToken(token);
  }

  /**
   * Generează un token de refresh pentru un utilizator
   * @param userId ID-ul utilizatorului
   * @param request Obiectul request pentru a extrage informații despre client
   * @returns Token-ul de refresh generat
   */
  private async generateRefreshToken(userId: string, request?: Request): Promise<string> {
    try {
      // Generăm un token aleatoriu
      const token = crypto.randomBytes(40).toString('hex');

      // Setăm data de expirare
      const expiresAt = new Date();
      expiresAt.setTime(
        expiresAt.getTime() +
          this.parseDuration(this.configService.get<string>('jwt.refreshExpiresIn') || '7d'),
      );

      // Extragem informații despre client
      const userAgent = request?.headers['user-agent'] || null;
      const ipAddress = request?.ip || request?.connection?.remoteAddress || null;

      // Creăm entitatea pentru token-ul de refresh
      const refreshToken = new RefreshToken();
      refreshToken.userId = userId;
      refreshToken.token = token;
      refreshToken.userAgent = userAgent as string;
      refreshToken.ipAddress = ipAddress as string;
      refreshToken.expiresAt = expiresAt;
      refreshToken.isRevoked = false;

      // Salvăm token-ul în baza de date
      await this.refreshTokenRepository.save(refreshToken);

      return token;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la generarea token-ului de refresh: ${errorMessage}`);
      throw new InternalServerErrorException('Nu s-a putut genera token-ul de refresh');
    }
  }

  /**
   * Reînnoiește token-ul de acces folosind un token de refresh
   * @param refreshTokenDto DTO-ul cu token-ul de refresh
   * @param request Obiectul request pentru a extrage informații despre client
   * @returns Noul token de acces și token-ul de refresh
   */
  async refreshToken(
    refreshTokenDto: RefreshTokenDto,
    request?: Request,
  ): Promise<{
    access_token: string;
    refresh_token: string;
  }> {
    try {
      // Căutăm token-ul de refresh în baza de date
      const refreshTokenEntity = await this.refreshTokenRepository.findOne({
        where: {
          token: refreshTokenDto.refreshToken,
          isRevoked: false,
        },
        relations: ['user'],
      });

      // Verificăm dacă token-ul există și nu a expirat
      if (!refreshTokenEntity) {
        throw new UnauthorizedException('Token de refresh invalid');
      }

      const now = new Date();
      if (refreshTokenEntity.expiresAt < now) {
        // Revocăm token-ul expirat
        await this.refreshTokenRepository.update(refreshTokenEntity.id, { isRevoked: true });
        throw new UnauthorizedException('Token de refresh expirat');
      }
      // Obținem utilizatorul
      const user = await this.usersService.findOneWithRoles(refreshTokenEntity.userId);
      if (!user) {
        throw new NotFoundException('Utilizatorul nu a fost găsit');
      }

      // Extragem permisiunile din roluri
      const permissions = user.roles
        ? user.roles
            .flatMap((role: any) => role.permissions || [])
            .map((permission: any) => permission.name)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
        : [];

      // Creăm payload-ul pentru noul token de acces
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        permissions,
      };

      // Generăm noul token de acces
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('jwt.expiresIn'),
      });

      // Revocăm token-ul de refresh vechi
      await this.refreshTokenRepository.update(refreshTokenEntity.id, { isRevoked: true });

      // Generăm un nou token de refresh
      const newRefreshToken = await this.generateRefreshToken(user.id, request);

      return {
        access_token: accessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      if (
        error instanceof UnauthorizedException ||
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Eroare la reînnoirea token-ului: ${errorMessage}`);
      throw new InternalServerErrorException('Nu s-a putut reînnoi token-ul');
    }
  }

  /**
   * Revocă un token de refresh
   * @param token Token-ul de refresh de revocat
   */
  async revokeRefreshToken(token: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { token },
      {
        isRevoked: true,
      },
    );
  }

  /**
   * Revocă toate token-urile de refresh ale unui utilizator
   * @param userId ID-ul utilizatorului
   */
  async revokeAllRefreshTokens(userId: string): Promise<void> {
    await this.refreshTokenRepository.update(
      { userId, isRevoked: false },
      {
        isRevoked: true,
      },
    );
  }

  /**
   * Convertește un string de durată (ex: '7d', '24h') în milisecunde
   * @param duration String-ul de durată
   * @returns Durata în milisecunde
   */
  private parseDuration(duration: string): number {
    const regex = /^(\d+)([smhdw])$/;
    const match = duration.match(regex);

    if (!match) {
      return 7 * 24 * 60 * 60 * 1000; // 7 zile în milisecunde (default)
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
      case 's':
        return value * 1000; // secunde în milisecunde
      case 'm':
        return value * 60 * 1000; // minute în milisecunde
      case 'h':
        return value * 60 * 60 * 1000; // ore în milisecunde
      case 'd':
        return value * 24 * 60 * 60 * 1000; // zile în milisecunde
      case 'w':
        return value * 7 * 24 * 60 * 60 * 1000; // săptămâni în milisecunde
      default:
        return 7 * 24 * 60 * 60 * 1000; // 7 zile în milisecunde (default)
    }
  }
}
