import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { PasswordResetToken } from '../auth/entities/password-reset-token.entity';
import { UsersService } from './users.service';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role, Permission, PasswordResetToken]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({
        ttl: 3600, // 1 oră în secunde
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesService, PermissionsService],
  exports: [TypeOrmModule, UsersService, RolesService, PermissionsService],
})
export class UsersModule {}
