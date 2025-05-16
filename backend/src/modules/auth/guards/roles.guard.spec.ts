import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { ROLES_KEY } from '../decorators/roles.decorator';
<<<<<<< HEAD
import { UserRole } from '../../users/entities/user.entity';
=======
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<RolesGuard>(RolesGuard);
    reflector = module.get<Reflector>(Reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true when no roles are required', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({}),
        }),
      } as unknown as ExecutionContext;

      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(null);

      expect(guard.canActivate(context)).toBe(true);
      expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
    });

    it('should return false when user is not defined', () => {
      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({}),
        }),
      } as unknown as ExecutionContext;

<<<<<<< HEAD
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
=======
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare

      expect(guard.canActivate(context)).toBe(false);
    });

    it('should return true when user has required role', () => {
      const user = {
        id: '1',
        username: 'admin',
        email: 'admin@example.com',
<<<<<<< HEAD
        role: UserRole.ADMIN,
=======
        role: 'admin',
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare
      };

      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user }),
        }),
      } as unknown as ExecutionContext;

<<<<<<< HEAD
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
=======
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare

      expect(guard.canActivate(context)).toBe(true);
    });

    it('should return false when user does not have required role', () => {
      const user = {
        id: '1',
        username: 'user',
        email: 'user@example.com',
<<<<<<< HEAD
        role: UserRole.USER,
=======
        role: 'user',
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare
      };

      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user }),
        }),
      } as unknown as ExecutionContext;

<<<<<<< HEAD
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([UserRole.ADMIN]);
=======
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin']);
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare

      expect(guard.canActivate(context)).toBe(false);
    });

    it('should return true when user has one of the required roles', () => {
      const user = {
        id: '1',
<<<<<<< HEAD
        username: 'operator',
        email: 'operator@example.com',
        role: UserRole.OPERATOR,
=======
        username: 'manager',
        email: 'manager@example.com',
        role: 'manager',
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare
      };

      const context = {
        getHandler: jest.fn(),
        getClass: jest.fn(),
        switchToHttp: jest.fn().mockReturnValue({
          getRequest: jest.fn().mockReturnValue({ user }),
        }),
      } as unknown as ExecutionContext;

<<<<<<< HEAD
      jest
        .spyOn(reflector, 'getAllAndOverride')
        .mockReturnValue([UserRole.ADMIN, UserRole.OPERATOR]);
=======
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['admin', 'manager']);
>>>>>>> faza/2.2.6-implementare-guards-decoratori-autorizare

      expect(guard.canActivate(context)).toBe(true);
    });
  });
});
