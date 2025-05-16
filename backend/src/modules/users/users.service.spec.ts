import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserStatus } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { PasswordResetToken } from '../auth/entities/password-reset-token.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

jest.mock('bcrypt');
jest.mock('crypto');

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: Repository<User>;
  let roleRepository: Repository<Role>;
  let passwordResetTokenRepository: Repository<PasswordResetToken>;

  const mockUserRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockRoleRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
  };

  const mockPasswordResetTokenRepository = {
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Role),
          useValue: mockRoleRepository,
        },
        {
          provide: getRepositoryToken(PasswordResetToken),
          useValue: mockPasswordResetTokenRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    roleRepository = module.get<Repository<Role>>(getRepositoryToken(Role));
    passwordResetTokenRepository = module.get<Repository<PasswordResetToken>>(
      getRepositoryToken(PasswordResetToken),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPasswordResetToken', () => {
    it('should create a password reset token for an active user', async () => {
      const user = {
        id: '123',
        email: 'test@example.com',
        username: 'testuser',
        status: UserStatus.ACTIVE,
      };
      const token = 'reset-token';
      const passwordResetToken = {
        id: '456',
        userId: user.id,
        token,
        expiresAt: new Date(Date.now() + 3600000), // 1 hour in the future
        used: false,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockPasswordResetTokenRepository.create.mockReturnValue(passwordResetToken);
      mockPasswordResetTokenRepository.save.mockResolvedValue(passwordResetToken);

      // Mock crypto.randomBytes
      (crypto.randomBytes as jest.Mock).mockReturnValue({
        toString: () => token,
      });

      const result = await service.createPasswordResetToken('test@example.com');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com', status: UserStatus.ACTIVE },
      });
      expect(mockPasswordResetTokenRepository.update).toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({
          userId: user.id,
          token,
          used: false,
        }),
      );
      expect(mockPasswordResetTokenRepository.save).toHaveBeenCalledWith(passwordResetToken);
      expect(result).toEqual({ token, user });
    });

    it('should throw NotFoundException if user is not found or inactive', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.createPasswordResetToken('nonexistent@example.com')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com', status: UserStatus.ACTIVE },
      });
      expect(mockPasswordResetTokenRepository.update).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.create).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should reset the password if token is valid', async () => {
      const passwordResetToken = {
        id: '456',
        userId: '123',
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 3600000), // 1 hour in the future
        used: false,
        user: { id: '123' },
      };

      mockPasswordResetTokenRepository.findOne.mockResolvedValue(passwordResetToken);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-password');

      await service.resetPassword('valid-token', 'NewPassword123!');

      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'valid-token', used: false },
        relations: ['user'],
      });
      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith('NewPassword123!', 'salt');
      expect(mockUserRepository.update).toHaveBeenCalledWith('123', {
        password: 'hashed-password',
      });
      expect(mockPasswordResetTokenRepository.update).toHaveBeenCalledWith('456', {
        used: true,
      });
    });

    it('should throw BadRequestException if token is invalid or used', async () => {
      mockPasswordResetTokenRepository.findOne.mockResolvedValue(null);

      await expect(service.resetPassword('invalid-token', 'NewPassword123!')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'invalid-token', used: false },
        relations: ['user'],
      });
      expect(bcrypt.genSalt).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.update).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.update).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if token has expired', async () => {
      const passwordResetToken = {
        id: '456',
        userId: '123',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000), // 1 hour in the past
        used: false,
        user: { id: '123' },
      };

      mockPasswordResetTokenRepository.findOne.mockResolvedValue(passwordResetToken);

      await expect(service.resetPassword('expired-token', 'NewPassword123!')).rejects.toThrow(
        BadRequestException,
      );
      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'expired-token', used: false },
        relations: ['user'],
      });
      expect(bcrypt.genSalt).not.toHaveBeenCalled();
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(mockUserRepository.update).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.update).not.toHaveBeenCalled();
    });
  });

  describe('validatePasswordResetToken', () => {
    it('should return true if token is valid and not expired', async () => {
      const passwordResetToken = {
        id: '456',
        userId: '123',
        token: 'valid-token',
        expiresAt: new Date(Date.now() + 3600000), // 1 hour in the future
        used: false,
      };

      mockPasswordResetTokenRepository.findOne.mockResolvedValue(passwordResetToken);

      const result = await service.validatePasswordResetToken('valid-token');

      expect(result).toBe(true);
      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'valid-token', used: false },
      });
    });

    it('should return false if token is not found', async () => {
      mockPasswordResetTokenRepository.findOne.mockResolvedValue(null);

      const result = await service.validatePasswordResetToken('invalid-token');

      expect(result).toBe(false);
      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'invalid-token', used: false },
      });
    });

    it('should return false if token has expired', async () => {
      const passwordResetToken = {
        id: '456',
        userId: '123',
        token: 'expired-token',
        expiresAt: new Date(Date.now() - 3600000), // 1 hour in the past
        used: false,
      };

      mockPasswordResetTokenRepository.findOne.mockResolvedValue(passwordResetToken);

      const result = await service.validatePasswordResetToken('expired-token');

      expect(result).toBe(false);
      expect(mockPasswordResetTokenRepository.findOne).toHaveBeenCalledWith({
        where: { token: 'expired-token', used: false },
      });
    });
  });
});
