import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for public routes', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({}),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);

      expect(guard.canActivate(context)).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it('should call super.canActivate for non-public routes', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({}),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      // Mock the AuthGuard's canActivate method that would be called by super
      const superCanActivate = jest.fn().mockReturnValue(true);

      // Save original prototype
      const originalPrototype = Object.getPrototypeOf(JwtAuthGuard.prototype);

      // Mock the prototype to replace the AuthGuard's canActivate
      Object.setPrototypeOf(JwtAuthGuard.prototype, {
        canActivate: superCanActivate,
      });

      expect(guard.canActivate(context)).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      expect(superCanActivate).toHaveBeenCalledWith(context);

      // Restore original prototype
      Object.setPrototypeOf(JwtAuthGuard.prototype, originalPrototype);
    });
  });

  describe('handleRequest', () => {
    it('should return the user when authentication is successful', () => {
      const user = { id: '1', username: 'test' };

      const result = guard.handleRequest(null, user, null);

      expect(result).toBe(user);
    });

    it('should throw UnauthorizedException when there is an error', () => {
      const error = new Error('Authentication error');

      expect(() => guard.handleRequest(error, null, null)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException when user is not authenticated', () => {
      expect(() => guard.handleRequest(null, null, null)).toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException with info message when available', () => {
      const info = { message: 'Token expired' };

      expect(() => guard.handleRequest(null, null, info)).toThrow(UnauthorizedException);
      expect(() => guard.handleRequest(null, null, info)).toThrow(info.message);
    });
  });
});
