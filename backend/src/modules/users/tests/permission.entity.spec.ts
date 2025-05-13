import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { PermissionsService } from '../services/permissions.service';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<any>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('PermissionsService', () => {
  let service: PermissionsService;
  let repository: MockRepository<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    repository = module.get<MockRepository<Permission>>(getRepositoryToken(Permission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new permission', async () => {
      const createPermissionDto: CreatePermissionDto = {
        name: 'create:users',
        description: 'Can create users',
      };

      const permission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createPermissionDto,
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(permission);
      repository.save.mockResolvedValue(permission);

      const result = await service.create(createPermissionDto);
      expect(result).toEqual(permission);
      expect(repository.create).toHaveBeenCalledWith(createPermissionDto);
      expect(repository.save).toHaveBeenCalledWith(permission);
    });

    it('should throw ConflictException if permission with same name exists', async () => {
      const createPermissionDto: CreatePermissionDto = {
        name: 'create:users',
        description: 'Can create users',
      };

      const existingPermission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createPermissionDto,
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(existingPermission);

      await expect(service.create(createPermissionDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of permissions', async () => {
      const permissions = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'create:users',
          description: 'Can create users',
          roles: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      repository.find.mockResolvedValue(permissions);

      const result = await service.findAll();
      expect(result).toEqual(permissions);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['roles'],
        order: {
          name: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a permission by id', async () => {
      const permission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'create:users',
        description: 'Can create users',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(permission);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(permission);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['roles'],
      });
    });

    it('should throw NotFoundException if permission not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a permission', async () => {
      const updatePermissionDto: UpdatePermissionDto = {
        name: 'manage:users',
        description: 'Can manage users',
      };

      const permission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'create:users',
        description: 'Can create users',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedPermission = {
        ...permission,
        name: 'manage:users',
        description: 'Can manage users',
      };

      repository.findOne.mockResolvedValueOnce(permission);
      repository.findOne.mockResolvedValueOnce(null);
      repository.save.mockResolvedValue(updatedPermission);

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174000',
        updatePermissionDto,
      );
      expect(result).toEqual(updatedPermission);
      expect(repository.save).toHaveBeenCalledWith(updatedPermission);
    });
  });

  describe('remove', () => {
    it('should remove a permission', async () => {
      const permission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'create:users',
        description: 'Can create users',
        roles: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(permission);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(permission);
    });

    it('should throw ConflictException if permission is associated with roles', async () => {
      const permission = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'create:users',
        description: 'Can create users',
        roles: [{ id: '123e4567-e89b-12d3-a456-426614174001' }],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      repository.findOne.mockResolvedValue(permission);

      await expect(service.remove('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
