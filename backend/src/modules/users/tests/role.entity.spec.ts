import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { User } from '../entities/user.entity';
import { RolesService } from '../services/roles.service';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<any>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
  findBy: jest.fn(),
});

describe('RolesService', () => {
  let service: RolesService;
  let roleRepository: MockRepository<Role>;
  let permissionRepository: MockRepository<Permission>;
  let userRepository: MockRepository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepository = module.get<MockRepository<Role>>(getRepositoryToken(Role));
    permissionRepository = module.get<MockRepository<Permission>>(getRepositoryToken(Permission));
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new role', async () => {
      const createRoleDto: CreateRoleDto = {
        name: 'admin',
        description: 'Administrator role',
      };

      const permissions = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'create:users',
          description: 'Can create users',
          roles: [],
        },
      ];

      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createRoleDto,
        permissions,
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roleRepository.findOne.mockResolvedValue(null);
      roleRepository.create.mockReturnValue(role);
      roleRepository.save.mockResolvedValue(role);
      permissionRepository.findBy.mockResolvedValue(permissions);

      const result = await service.create({
        ...createRoleDto,
        permissionIds: [permissions[0].id],
      });

      expect(result).toEqual(role);
      expect(roleRepository.create).toHaveBeenCalledWith({
        name: createRoleDto.name,
        description: createRoleDto.description,
      });
      expect(roleRepository.save).toHaveBeenCalledWith(role);
      expect(permissionRepository.findBy).toHaveBeenCalled();
    });

    it('should throw ConflictException if role with same name exists', async () => {
      const createRoleDto: CreateRoleDto = {
        name: 'admin',
        description: 'Administrator role',
      };

      const existingRole = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createRoleDto,
        permissions: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roleRepository.findOne.mockResolvedValue(existingRole);

      await expect(service.create(createRoleDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of roles', async () => {
      const roles = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'admin',
          description: 'Administrator role',
          permissions: [],
          users: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      roleRepository.find.mockResolvedValue(roles);

      const result = await service.findAll();
      expect(result).toEqual(roles);
      expect(roleRepository.find).toHaveBeenCalledWith({
        relations: ['permissions', 'users'],
        order: {
          name: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a role by id', async () => {
      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'admin',
        description: 'Administrator role',
        permissions: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roleRepository.findOne.mockResolvedValue(role);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(role);
      expect(roleRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: ['permissions', 'users'],
      });
    });

    it('should throw NotFoundException if role not found', async () => {
      roleRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a role', async () => {
      const updateRoleDto: UpdateRoleDto = {
        name: 'super-admin',
        description: 'Super Administrator role',
      };

      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'admin',
        description: 'Administrator role',
        permissions: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedRole = {
        ...role,
        name: 'super-admin',
        description: 'Super Administrator role',
      };

      roleRepository.findOne.mockResolvedValueOnce(role);
      roleRepository.findOne.mockResolvedValueOnce(null);
      roleRepository.save.mockResolvedValue(updatedRole);

      const result = await service.update('123e4567-e89b-12d3-a456-426614174001', updateRoleDto);
      expect(result).toEqual(updatedRole);
      expect(roleRepository.save).toHaveBeenCalledWith(updatedRole);
    });
  });

  describe('updatePermissions', () => {
    it('should update role permissions', async () => {
      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'admin',
        description: 'Administrator role',
        permissions: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const permissions = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'create:users',
          description: 'Can create users',
          roles: [],
        },
      ];

      const updatedRole = {
        ...role,
        permissions,
      };

      roleRepository.findOne.mockResolvedValue(role);
      permissionRepository.findBy.mockResolvedValue(permissions);
      roleRepository.save.mockResolvedValue(updatedRole);

      const result = await service.updatePermissions('123e4567-e89b-12d3-a456-426614174001', [
        permissions[0].id,
      ]);
      expect(result).toEqual(updatedRole);
      expect(roleRepository.save).toHaveBeenCalledWith(updatedRole);
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'admin',
        description: 'Administrator role',
        permissions: [],
        users: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roleRepository.findOne.mockResolvedValue(role);
      roleRepository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174001');
      expect(roleRepository.remove).toHaveBeenCalledWith(role);
    });

    it('should throw ConflictException if role is associated with users', async () => {
      const role = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        name: 'admin',
        description: 'Administrator role',
        permissions: [],
        users: [{ id: '123e4567-e89b-12d3-a456-426614174002' }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      roleRepository.findOne.mockResolvedValue(role);

      await expect(service.remove('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
