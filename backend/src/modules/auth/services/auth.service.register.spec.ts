import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/users.service';
import { MailService } from './mail.service';
import { RegisterDto } from '../dto/register.dto';
import { User, UserRole, UserStatus } from '../../users/entities/user.entity';

describe('AuthService - register', () => {
  let service: AuthService;
  let usersService: UsersService;

  const mockUser: Partial<User> = {
    id: '123',
    username: 'testuser',
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
    fullName: 'Test User',
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
  };

  const mockUsersService = {
    create: jest.fn(),
    findOneWithRoles: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('jwt-token'),
  };

  const mockConfigService = {
    get: jest.fn().mockReturnValue('24h'),
  };

  const mockMailService = {
    sendPasswordResetEmail: jest.fn(),
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
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should register a new user successfully', async () => {
    const registerDto: RegisterDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
      passwordConfirmation: 'Password123!',
      firstName: 'Test',
      lastName: 'User',
    };

    mockUsersService.create.mockResolvedValue(mockUser);
    mockUsersService.findOneWithRoles.mockResolvedValue({
      ...mockUser,
      roles: [
        {
          id: 'role1',
          name: 'user',
          permissions: [{ id: 'perm1', name: 'read:users' }],
        },
      ],
    });

    const result = await service.register(registerDto);

    expect(mockUsersService.create).toHaveBeenCalledWith({
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
      firstName: 'Test',
      lastName: 'User',
    });
    expect(mockJwtService.sign).toHaveBeenCalled();
    expect(result.access_token).toBe('jwt-token');
    expect(result.user).toEqual({
      id: '123',
      username: 'testuser',
      email: 'test@example.com',
      fullName: 'Test User',
      role: 'user',
      permissions: ['read:users'],
    });
  });

  it('should throw BadRequestException if passwords do not match', async () => {
    const registerDto: RegisterDto = {
      username: 'testuser',
      email: 'test@example.com',
      password: 'Password123!',
      passwordConfirmation: 'DifferentPassword123!',
      firstName: 'Test',
      lastName: 'User',
    };

    await expect(service.register(registerDto)).rejects.toThrow(BadRequestException);
    expect(mockUsersService.create).not.toHaveBeenCalled();
  });

  it('should pass through ConflictException from UsersService', async () => {
    const registerDto: RegisterDto = {
      username: 'existinguser',
      email: 'existing@example.com',
      password: 'Password123!',
      passwordConfirmation: 'Password123!',
      firstName: 'Test',
      lastName: 'User',
    };

    mockUsersService.create.mockRejectedValue(
      new ConflictException('Există deja un utilizator cu acest nume'),
    );

    await expect(service.register(registerDto)).rejects.toThrow(ConflictException);
  });
});
