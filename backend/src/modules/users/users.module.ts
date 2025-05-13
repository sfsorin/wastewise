import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { UsersService } from './users.service';
import { RolesService } from './services/roles.service';
import { PermissionsService } from './services/permissions.service';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Permission])],
  controllers: [UsersController],
  providers: [UsersService, RolesService, PermissionsService],
  exports: [TypeOrmModule, UsersService, RolesService, PermissionsService],
})
export class UsersModule {}
