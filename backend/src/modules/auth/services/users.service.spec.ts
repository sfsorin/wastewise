import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, UserStatus } from '../../users/entities/user.entity';
import { PasswordResetToken } from '../entities/password-reset-token.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

// Interfețe pentru obiecte mock
interface MockUser {
  id: string;
  username?: string;
  email?: string;
  fullName?: string;
  status?: string;
  password?: string;
}

interface MockPasswordResetToken {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  used: boolean;
  user?: { id: string };
}

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;

  const mockUserRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
  };

  const mockPasswordResetTokenRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
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
          provide: getRepositoryToken(PasswordResetToken),
          useValue: mockPasswordResetTokenRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };

      const user = {
        id: '123',
        ...registerDto,
      };

      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValue(user);
      mockUserRepository.save.mockResolvedValue(user);

      const result = await service.create(registerDto);

      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockUserRepository.create).toHaveBeenCalledWith(registerDto);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
      expect(result).toEqual(user);
    });

    it('should throw ConflictException if username already exists', async () => {
      const registerDto = {
        username: 'existinguser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };

      mockUserRepository.findOne.mockResolvedValueOnce({
        id: '123',
        username: 'existinguser',
      });

      await expect(service.create(registerDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(1);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });

    it('should throw ConflictException if email already exists', async () => {
      const registerDto = {
        username: 'testuser',
        email: 'existing@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };

      mockUserRepository.findOne.mockResolvedValueOnce(null);
      mockUserRepository.findOne.mockResolvedValueOnce({
        id: '123',
        email: 'existing@example.com',
      });

      await expect(service.create(registerDto)).rejects.toThrow(ConflictException);
      expect(mockUserRepository.findOne).toHaveBeenCalledTimes(2);
      expect(mockUserRepository.create).not.toHaveBeenCalled();
      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [
        { id: '1', username: 'user1' },
        { id: '2', username: 'user2' },
      ];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();

      expect(mockUserRepository.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: '123', username: 'testuser' };
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne('123');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: '123' },
        select: expect.any(Array),
      });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 'nonexistent' },
        select: expect.any(Array),
      });
    });
  });

  describe('createPasswordResetToken', () => {
    it('should create a password reset token for an active user', async () => {
      const user: MockUser = {
        id: '123',
        email: 'test@example.com',
        username: 'testuser',
        status: UserStatus.ACTIVE,
      };
      const token = 'reset-token';
      const passwordResetToken: MockPasswordResetToken = {
        id: '456',
        userId: user.id,
        token,
        expiresAt: expect.any(Date),
        used: false,
      };

      mockUserRepository.findOne.mockResolvedValue(user);
      mockPasswordResetTokenRepository.create.mockReturnValue(passwordResetToken);
      mockPasswordResetTokenRepository.save.mockResolvedValue(passwordResetToken);

      // Mock crypto.randomBytes
      jest.spyOn(crypto, 'randomBytes').mockImplementation(
        () =>
          ({
            toString: (): string => token,
          }) as Buffer,
      );

      const result = await service.createPasswordResetToken('test@example.com');

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com', status: 'active' },
      });
      expect(mockPasswordResetTokenRepository.update).toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.create).toHaveBeenCalledWith({
        userId: user.id,
        token,
        expiresAt: expect.any(Date),
        used: false,
      });
      expect(mockPasswordResetTokenRepository.save).toHaveBeenCalledWith(passwordResetToken);
      expect(result).toEqual({ token, user });
    });

    it('should throw NotFoundException if user is not found or inactive', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);

      await expect(service.createPasswordResetToken('nonexistent@example.com')).rejects.toThrow(
        NotFoundException,
      );
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'nonexistent@example.com', status: 'active' },
      });
      expect(mockPasswordResetTokenRepository.update).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.create).not.toHaveBeenCalled();
      expect(mockPasswordResetTokenRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('resetPassword', () => {
    it('should reset the password if token is valid', async () => {
      const passwordResetToken: MockPasswordResetToken = {
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
      const passwordResetToken: MockPasswordResetToken = {
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
});
