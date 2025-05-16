import { Module, CacheModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { AuthService } from './services/auth.service';
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
      useFactory: (configService: ConfigService) => {
        const useRedis = configService.get<string>('CACHE_REDIS_ENABLED') === 'true';

        if (useRedis) {
          return {
            store: redisStore,
            host: configService.get<string>('CACHE_REDIS_HOST', 'localhost'),
            port: configService.get<number>('CACHE_REDIS_PORT', 6379),
            ttl: 3600, // 1 oră în secunde
          };
        }

        return {
          ttl: 3600, // 1 oră în secunde
        };
      },
      isGlobal: true,
    }),
  ],
  controllers: [AuthController, RbacController],
  providers: [
    AuthService,
    MailService,
    LocalStrategy,
    JwtStrategy,
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
  exports: [AuthService],
})
export class AuthModule {}
