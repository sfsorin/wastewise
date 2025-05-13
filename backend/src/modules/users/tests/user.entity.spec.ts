import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserStatus } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { UsersService } from '../users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

type MockRepository<T = any> = Partial<Record<keyof Repository<any>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
  findBy: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: MockRepository<User>;
  let roleRepository: MockRepository<Role>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Role),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<MockRepository<User>>(getRepositoryToken(User));
    roleRepository = module.get<MockRepository<Role>>(getRepositoryToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      };

      const roles = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'user',
          description: 'Regular user',
          permissions: [],
        },
      ];

      const user = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createUserDto,
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        roles,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userRepository.findOne.mockResolvedValueOnce(null);
      userRepository.findOne.mockResolvedValueOnce(null);
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);
      roleRepository.findBy.mockResolvedValue(roles);

      const result = await service.create({
        ...createUserDto,
        roleIds: [roles[0].id],
      });

      expect(result).toEqual(user);
      expect(userRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        roleIds: [roles[0].id],
      });
      expect(userRepository.save).toHaveBeenCalledWith(user);
      expect(roleRepository.findBy).toHaveBeenCalled();
    });

    it('should throw ConflictException if user with same username exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      };

      const existingUser = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createUserDto,
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userRepository.findOne.mockResolvedValueOnce(existingUser);

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if user with same email exists', async () => {
      const createUserDto: CreateUserDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        firstName: 'Test',
        lastName: 'User',
      };

      userRepository.findOne.mockResolvedValueOnce(null);
      userRepository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createUserDto,
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createUserDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          username: 'testuser',
          email: 'test@example.com',
          firstName: 'Test',
          lastName: 'User',
          fullName: 'Test User',
          status: UserStatus.ACTIVE,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      userRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const user = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'user',
            description: 'Regular user',
            permissions: [],
          },
        ],
      };

      userRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      userRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'User',
      };

      const user = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const updatedUser = {
        ...user,
        firstName: 'Updated',
        lastName: 'User',
        fullName: 'Updated User',
      };

      userRepository.findOne.mockResolvedValue(user);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await service.update('123e4567-e89b-12d3-a456-426614174001', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('updateRoles', () => {
    it('should update user roles', async () => {
      const user = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [],
      };

      const roles = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'user',
          description: 'Regular user',
          permissions: [],
        },
      ];

      const updatedUser = {
        ...user,
        roles,
      };

      userRepository.findOne.mockResolvedValue(user);
      roleRepository.findBy.mockResolvedValue(roles);
      userRepository.save.mockResolvedValue(updatedUser);

      const result = await service.updateRoles('123e4567-e89b-12d3-a456-426614174001', [
        roles[0].id,
      ]);
      expect(result).toEqual(updatedUser);
      expect(userRepository.save).toHaveBeenCalledWith(updatedUser);
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      const user = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        username: 'testuser',
        email: 'test@example.com',
        firstName: 'Test',
        lastName: 'User',
        fullName: 'Test User',
        status: UserStatus.ACTIVE,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userRepository.findOne.mockResolvedValue(user);
      userRepository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174001');
      expect(userRepository.remove).toHaveBeenCalledWith(user);
    });
  });
});
