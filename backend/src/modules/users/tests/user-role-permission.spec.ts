import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { UsersService } from '../users.service';
import { RolesService } from '../services/roles.service';
import { PermissionsService } from '../services/permissions.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { CreateRoleDto } from '../dto/create-role.dto';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import * as bcrypt from 'bcrypt';

describe('User-Role-Permission Relations (e2e)', () => {
  let usersService: UsersService;
  let rolesService: RolesService;
  let permissionsService: PermissionsService;

  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let permissionRepository: Repository<Permission>;

  let userId: string;
  let roleId: string;
  let permissionId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [User, Role, Permission],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([User, Role, Permission]),
      ],
      providers: [UsersService, RolesService, PermissionsService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    rolesService = module.get<RolesService>(RolesService);
    permissionsService = module.get<PermissionsService>(PermissionsService);

    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    permissionRepository = module.get<Repository<Permission>>(getRepositoryToken(Permission));

    // Curățăm datele existente
    await userRepository.query('DELETE FROM user_roles');
    await roleRepository.query('DELETE FROM role_permissions');

    // Obținem toate ID-urile pentru a le șterge individual
    const users = await userRepository.find();
    for (const user of users) {
      await userRepository.delete(user.id);
    }

    const roles = await roleRepository.find();
    for (const role of roles) {
      await roleRepository.delete(role.id);
    }

    const permissions = await permissionRepository.find();
    for (const permission of permissions) {
      await permissionRepository.delete(permission.id);
    }
  });

  afterAll(async () => {
    // Curățăm datele după teste
    await userRepository.query('DELETE FROM user_roles');
    await roleRepository.query('DELETE FROM role_permissions');

    // Obținem toate ID-urile pentru a le șterge individual
    const users = await userRepository.find();
    for (const user of users) {
      await userRepository.delete(user.id);
    }

    const roles = await roleRepository.find();
    for (const role of roles) {
      await roleRepository.delete(role.id);
    }

    const permissions = await permissionRepository.find();
    for (const permission of permissions) {
      await permissionRepository.delete(permission.id);
    }
  });

  it('should create entities with many-to-many relationships', async () => {
    // Creăm o permisiune
    const createPermissionDto: CreatePermissionDto = {
      name: 'test:permission',
      description: 'Test permission',
    };
    const permission = await permissionsService.create(createPermissionDto);
    permissionId = permission.id;
    expect(permission).toBeDefined();
    expect(permission.name).toBe(createPermissionDto.name);

    // Creăm un rol cu permisiunea creată
    const createRoleDto: CreateRoleDto = {
      name: 'test-role',
      description: 'Test role',
      permissionIds: [permissionId],
    };
    const role = await rolesService.create(createRoleDto);
    roleId = role.id;
    expect(role).toBeDefined();
    expect(role.name).toBe(createRoleDto.name);
    expect(role.permissions).toBeDefined();
    expect(role.permissions.length).toBe(1);
    expect(role.permissions[0].id).toBe(permissionId);

    // Creăm un utilizator cu rolul creat
    const password = 'TestPassword123!';
    const createUserDto: CreateUserDto = {
      username: 'testuser',
      email: 'test@example.com',
      password,
      firstName: 'Test',
      lastName: 'User',
      roleIds: [roleId],
    };
    const user = await usersService.create(createUserDto);
    userId = user.id;
    expect(user).toBeDefined();
    expect(user.username).toBe(createUserDto.username);
    expect(user.roles).toBeDefined();
    expect(user.roles.length).toBe(1);
    expect(user.roles[0].id).toBe(roleId);

    // Verificăm că parola a fost hash-uită
    const isPasswordValid = await bcrypt.compare(password, user.password);
    expect(isPasswordValid).toBe(true);

    // Verificăm relația User -> Role -> Permission
    const userWithRoles = await usersService.findOne(userId);
    expect(userWithRoles.roles).toBeDefined();
    expect(userWithRoles.roles.length).toBe(1);
    expect(userWithRoles.roles[0].id).toBe(roleId);
    expect(userWithRoles.roles[0].permissions).toBeDefined();
    expect(userWithRoles.roles[0].permissions.length).toBe(1);
    expect(userWithRoles.roles[0].permissions[0].id).toBe(permissionId);

    // Verificăm relația Role -> User
    const roleWithUsers = await rolesService.findOne(roleId);
    expect(roleWithUsers.users).toBeDefined();
    expect(roleWithUsers.users.length).toBe(1);
    expect(roleWithUsers.users[0].id).toBe(userId);

    // Verificăm relația Role -> Permission
    const roleWithPermissions = await rolesService.findOne(roleId);
    expect(roleWithPermissions.permissions).toBeDefined();
    expect(roleWithPermissions.permissions.length).toBe(1);
    expect(roleWithPermissions.permissions[0].id).toBe(permissionId);

    // Verificăm relația Permission -> Role
    const permissionWithRoles = await permissionsService.findOne(permissionId);
    expect(permissionWithRoles.roles).toBeDefined();
    expect(permissionWithRoles.roles.length).toBe(1);
    expect(permissionWithRoles.roles[0].id).toBe(roleId);
  });

  it('should update user roles', async () => {
    // Creăm un nou rol
    const createNewRoleDto: CreateRoleDto = {
      name: 'test-role-2',
      description: 'Test role 2',
      permissionIds: [permissionId],
    };
    const newRole = await rolesService.create(createNewRoleDto);
    const newRoleId = newRole.id;

    // Actualizăm rolurile utilizatorului
    const updatedUser = await usersService.updateRoles(userId, [roleId, newRoleId]);
    expect(updatedUser.roles).toBeDefined();
    expect(updatedUser.roles.length).toBe(2);
    expect(updatedUser.roles.map((role: Role) => role.id)).toContain(roleId);
    expect(updatedUser.roles.map((role: Role) => role.id)).toContain(newRoleId);

    // Verificăm că utilizatorul are ambele roluri
    const userWithRoles = await usersService.findOne(userId);
    expect(userWithRoles.roles).toBeDefined();
    expect(userWithRoles.roles.length).toBe(2);
    expect(userWithRoles.roles.map((role: Role) => role.id)).toContain(roleId);
    expect(userWithRoles.roles.map((role: Role) => role.id)).toContain(newRoleId);
  });

  it('should update role permissions', async () => {
    // Creăm o nouă permisiune
    const createNewPermissionDto: CreatePermissionDto = {
      name: 'test:permission-2',
      description: 'Test permission 2',
    };
    const newPermission = await permissionsService.create(createNewPermissionDto);
    const newPermissionId = newPermission.id;

    // Actualizăm permisiunile rolului
    const updatedRole = await rolesService.updatePermissions(roleId, [
      permissionId,
      newPermissionId,
    ]);
    expect(updatedRole.permissions).toBeDefined();
    expect(updatedRole.permissions.length).toBe(2);
    expect(updatedRole.permissions.map((permission: Permission) => permission.id)).toContain(
      permissionId,
    );
    expect(updatedRole.permissions.map((permission: Permission) => permission.id)).toContain(
      newPermissionId,
    );

    // Verificăm că rolul are ambele permisiuni
    const roleWithPermissions = await rolesService.findOne(roleId);
    expect(roleWithPermissions.permissions).toBeDefined();
    expect(roleWithPermissions.permissions.length).toBe(2);
    expect(
      roleWithPermissions.permissions.map((permission: Permission) => permission.id),
    ).toContain(permissionId);
    expect(
      roleWithPermissions.permissions.map((permission: Permission) => permission.id),
    ).toContain(newPermissionId);
  });

  it('should cascade delete user-role relationships when deleting a user', async () => {
    // Verificăm că relația user-role există
    const userRolesBefore = await roleRepository.query(
      `SELECT * FROM user_roles WHERE user_id = '${userId}'`,
    );
    expect(userRolesBefore.length).toBeGreaterThan(0);

    // Ștergem utilizatorul
    await usersService.remove(userId);

    // Verificăm că relația user-role a fost ștearsă
    const userRolesAfter = await roleRepository.query(
      `SELECT * FROM user_roles WHERE user_id = '${userId}'`,
    );
    expect(userRolesAfter.length).toBe(0);

    // Verificăm că rolul încă există
    const role = await rolesService.findOne(roleId);
    expect(role).toBeDefined();
    expect(role.id).toBe(roleId);
  });

  it('should cascade delete role-permission relationships when deleting a role', async () => {
    // Verificăm că relația role-permission există
    const rolePermissionsBefore = await permissionRepository.query(
      `SELECT * FROM role_permissions WHERE role_id = '${roleId}'`,
    );
    expect(rolePermissionsBefore.length).toBeGreaterThan(0);

    // Ștergem rolul
    await rolesService.remove(roleId);

    // Verificăm că relația role-permission a fost ștearsă
    const rolePermissionsAfter = await permissionRepository.query(
      `SELECT * FROM role_permissions WHERE role_id = '${roleId}'`,
    );
    expect(rolePermissionsAfter.length).toBe(0);

    // Verificăm că permisiunea încă există
    const permission = await permissionsService.findOne(permissionId);
    expect(permission).toBeDefined();
    expect(permission.id).toBe(permissionId);
  });
});
