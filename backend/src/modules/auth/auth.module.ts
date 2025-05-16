import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthService } from './services/auth.service';
import { PasswordResetService } from './services/password-reset.service';
import { MailService } from './services/mail.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthController } from './controllers/auth.controller';
import { RbacController } from './controllers/rbac.controller';
import { UsersModule } from '../users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { PermissionsGuard } from './guards/permissions.guard';
import { IAuthService } from '../../shared/interfaces/auth-service.interface';
import { IPasswordResetService } from '../../shared/interfaces/password-reset-service.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetToken, RefreshToken]),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn'),
          algorithm: configService.get<string>('jwt.algorithm') as any,
        },
      }),
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return {
          ttl: 3600, // 1 oră în secunde
          store: undefined, // Folosim memoria implicită
        };
      },
    }),
  ],
  controllers: [AuthController, RbacController],
  providers: [
    AuthService,
    PasswordResetService,
    MailService,
    LocalStrategy,
    JwtStrategy,
    // Înregistrăm serviciile cu interfețele lor
    {
      provide: IAuthService,
      useExisting: AuthService,
    },
    {
      provide: IPasswordResetService,
      useExisting: PasswordResetService,
    },
    // Înregistrăm JwtAuthGuard ca guard global, cu excepția rutelor marcate ca publice
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Înregistrăm RolesGuard ca guard global
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    // Înregistrăm PermissionsGuard ca guard global
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
  exports: [AuthService, PasswordResetService, IAuthService, IPasswordResetService],
})
export class AuthModule {}
