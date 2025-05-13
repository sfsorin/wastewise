import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { User } from '../../users/entities/user.entity';
import { LoginDto } from '../dto/login.dto';
import { RegisterDto } from '../dto/register.dto';
import { ForgotPasswordDto } from '../dto/forgot-password.dto';
import { ResetPasswordDto } from '../dto/reset-password.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockUser: Partial<User> = {
    id: '123',
    username: 'testuser',
    email: 'test@example.com',
    fullName: 'Test User',
    role: 'user',
  };

  const mockAuthService = {
    login: jest.fn(),
    register: jest.fn(),
    getProfile: jest.fn(),
    forgotPassword: jest.fn(),
    resetPassword: jest.fn(),
    validateResetToken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return the result of authService.login', async () => {
      const loginDto: LoginDto = { username: 'testuser', password: 'password' };
      const expectedResult: { access_token: string; user: Partial<User> } = {
        access_token: 'jwt-token',
        user: mockUser,
      };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(loginDto);

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.login).toHaveBeenCalledWith(loginDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should return the result of authService.register', async () => {
      const registerDto: RegisterDto = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Password123!',
        fullName: 'Test User',
      };
      const expectedResult: { access_token: string; user: Partial<User> } = {
        access_token: 'jwt-token',
        user: mockUser,
      };

      mockAuthService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerDto);

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getProfile', () => {
    it('should return the result of authService.getProfile', async () => {
      const req: { user: { id: string } } = { user: { id: '123' } };

      mockAuthService.getProfile.mockResolvedValue(mockUser);

      const result = await controller.getProfile(req);

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.getProfile).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockUser);
    });
  });

  describe('forgotPassword', () => {
    it('should call authService.forgotPassword and return success message', async () => {
      const forgotPasswordDto: ForgotPasswordDto = { email: 'test@example.com' };

      mockAuthService.forgotPassword.mockResolvedValue(undefined);

      const result = await controller.forgotPassword(forgotPasswordDto);

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.forgotPassword).toHaveBeenCalledWith(forgotPasswordDto);
      expect(result).toEqual({
        message: 'Email-ul de resetare a parolei a fost trimis cu succes.',
      });
    });
  });

  describe('resetPassword', () => {
    it('should call authService.resetPassword and return success message', async () => {
      const resetPasswordDto: ResetPasswordDto = {
        token: 'reset-token',
        password: 'NewPassword123!',
        passwordConfirmation: 'NewPassword123!',
      };

      mockAuthService.resetPassword.mockResolvedValue(undefined);

      const result = await controller.resetPassword(resetPasswordDto);

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.resetPassword).toHaveBeenCalledWith(resetPasswordDto);
      expect(result).toEqual({ message: 'Parola a fost resetată cu succes.' });
    });
  });

  describe('validateResetToken', () => {
    it('should return valid=true if token is valid', async () => {
      mockAuthService.validateResetToken.mockResolvedValue(true);

      const result = await controller.validateResetToken('valid-token');

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.validateResetToken).toHaveBeenCalledWith('valid-token');
      expect(result).toEqual({ valid: true });
    });

    it('should return valid=false if token is invalid', async () => {
      mockAuthService.validateResetToken.mockResolvedValue(false);

      const result = await controller.validateResetToken('invalid-token');

      // Folosim o funcție arrow pentru a evita eroarea unbound-method
      expect(authService.validateResetToken).toHaveBeenCalledWith('invalid-token');
      expect(result).toEqual({ valid: false });
    });
  });
});
