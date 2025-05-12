import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { MailService } from './mail.service';
import { User } from '../../users/entities/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  const mockUser = {
    id: '123',
    username: 'testuser',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'user',
    status: 'active',
    password: 'hashedPassword',
    validatePassword: jest.fn().mockResolvedValue(true),
  } as unknown as User;

  const mockUsersService = {
    findByUsernameOrEmail: jest.fn(),
    updateLastLogin: jest.fn(),
    create: jest.fn(),
    findOne: jest.fn(),
    createPasswordResetToken: jest.fn(),
    validatePasswordResetToken: jest.fn(),
    resetPassword: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('http://localhost:5173'),
  };

  const mockMailService = {
    sendPasswordResetEmail: jest.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MailService,
          useValue: mockMailService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user without password if validation is successful', async () => {
      mockUsersService.findByUsernameOrEmail.mockResolvedValue(mockUser);

      const result = await service.validateUser('testuser', 'password');

      expect(result).toBeDefined();
      expect(result.password).toBeUndefined();
      expect(result.id).toBe(mockUser.id);
      expect(mockUser.validatePassword).toHaveBeenCalledWith('password');
    });

    it('should return null if user is not found', async () => {
      mockUsersService.findByUsernameOrEmail.mockRejectedValue(new Error('User not found'));

      const result = await service.validateUser('nonexistent', 'password');

      expect(result).toBeNull();
    });

    it('should return null if password validation fails', async () => {
      mockUsersService.findByUsernameOrEmail.mockResolvedValue({
        ...mockUser,
        validatePassword: jest.fn().mockResolvedValue(false),
      });

      const result = await service.validateUser('testuser', 'wrongpassword');

      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user data if login is successful', async () => {
      const validateUserSpy = jest.spyOn(service, 'validateUser').mockResolvedValue({
        id: mockUser.id,
        username: mockUser.username,
        email: mockUser.email,
        fullName: mockUser.fullName,
        role: mockUser.role,
        status: 'active',
      });

      const result = await service.login({ username: 'testuser', password: 'password' });

      expect(validateUserSpy).toHaveBeenCalledWith('testuser', 'password');
      expect(mockUsersService.updateLastLogin).toHaveBeenCalledWith(mockUser.id);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result.access_token).toBe('jwt-token');
      expect(result.user).toBeDefined();
      expect(result.user.id).toBe(mockUser.id);
    });

    it('should throw UnauthorizedException if credentials are invalid', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue(null);

      await expect(
        service.login({ username: 'testuser', password: 'wrongpassword' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user account is inactive', async () => {
      jest.spyOn(service, 'validateUser').mockResolvedValue({
        ...mockUser,
        status: 'inactive',
      });

      await expect(service.login({ username: 'testuser', password: 'password' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });

  describe('register', () => {
    it('should create a new user and return access token and user data', async () => {
      mockUsersService.create.mockResolvedValue(mockUser);

      const registerDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };

      const result = await service.register(registerDto);

      expect(mockUsersService.create).toHaveBeenCalledWith(registerDto);
      expect(jwtService.sign).toHaveBeenCalled();
      expect(result.access_token).toBe('jwt-token');
      expect(result.user).toBeDefined();
      expect(result.user.id).toBe(mockUser.id);
    });
  });

  describe('forgotPassword', () => {
    it('should create a password reset token and send an email', async () => {
      mockUsersService.createPasswordResetToken.mockResolvedValue({
        token: 'reset-token',
        user: mockUser,
      });

      await service.forgotPassword({ email: 'test@example.com' });

      expect(mockUsersService.createPasswordResetToken).toHaveBeenCalledWith('test@example.com');
      expect(mockConfigService.get).toHaveBeenCalledWith('FRONTEND_URL');
      expect(mockMailService.sendPasswordResetEmail).toHaveBeenCalledWith(
        mockUser.email,
        'http://localhost:5173/reset-password?token=reset-token',
        mockUser.username,
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset the password if token is valid', async () => {
      mockUsersService.validatePasswordResetToken.mockResolvedValue(true);

      const resetPasswordDto = {
        token: 'valid-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };

      await service.resetPassword(resetPasswordDto);

      expect(mockUsersService.validatePasswordResetToken).toHaveBeenCalledWith('valid-token');
      expect(mockUsersService.resetPassword).toHaveBeenCalledWith('valid-token', 'NewPassword123!');
    });

    it('should throw BadRequestException if passwords do not match', async () => {
      const resetPasswordDto = {
        token: 'valid-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'DifferentPassword123!',
      };

      await expect(service.resetPassword(resetPasswordDto)).rejects.toThrow(BadRequestException);

      expect(mockUsersService.validatePasswordResetToken).not.toHaveBeenCalled();
      expect(mockUsersService.resetPassword).not.toHaveBeenCalled();
    });

    it('should throw BadRequestException if token is invalid', async () => {
      mockUsersService.validatePasswordResetToken.mockResolvedValue(false);

      const resetPasswordDto = {
        token: 'invalid-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };

      await expect(service.resetPassword(resetPasswordDto)).rejects.toThrow(BadRequestException);

      expect(mockUsersService.validatePasswordResetToken).toHaveBeenCalledWith('invalid-token');
      expect(mockUsersService.resetPassword).not.toHaveBeenCalled();
    });
  });

  describe('validateResetToken', () => {
    it('should return true if token is valid', async () => {
      mockUsersService.validatePasswordResetToken.mockResolvedValue(true);

      const result = await service.validateResetToken('valid-token');

      expect(result).toBe(true);
      expect(mockUsersService.validatePasswordResetToken).toHaveBeenCalledWith('valid-token');
    });

    it('should return false if token is invalid', async () => {
      mockUsersService.validatePasswordResetToken.mockResolvedValue(false);

      const result = await service.validateResetToken('invalid-token');

      expect(result).toBe(false);
      expect(mockUsersService.validatePasswordResetToken).toHaveBeenCalledWith('invalid-token');
    });
  });
});
