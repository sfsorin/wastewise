import { Test, TestingModule } from '@nestjs/testing';
import { RbacController } from './rbac.controller';
import { PermissionsService } from '../../users/services/permissions.service';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { PermissionsGuard } from '../guards/permissions.guard';
import { Logger } from '@nestjs/common';

describe('RbacController', () => {
  let controller: RbacController;

  const mockPermissionsService = {
    hasPermission: jest.fn(),
    getUserPermissions: jest.fn(),
  };

  const mockLogger = {
    log: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
    debug: jest.fn(),
    verbose: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RbacController],
      providers: [
        {
          provide: PermissionsService,
          useValue: mockPermissionsService,
        },
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
        JwtAuthGuard,
        RolesGuard,
        PermissionsGuard,
      ],
    })
      .overrideProvider(Logger)
      .useValue(mockLogger)
      .compile();

    controller = module.get<RbacController>(RbacController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('public', () => {
    it('should return a message for public endpoint', () => {
      const result = controller.public();
      expect(result).toEqual({
        message: 'Acesta este un endpoint public care nu necesită autentificare',
      });
      expect(mockLogger.log).toHaveBeenCalledWith('Endpoint public accesat');
    });
  });

  describe('authenticated', () => {
    it('should return a message for authenticated endpoint', () => {
      const result = controller.authenticated();
      expect(result).toEqual({
        message: 'Acesta este un endpoint care necesită autentificare',
      });
      expect(mockLogger.log).toHaveBeenCalledWith('Endpoint autentificat accesat');
    });
  });

  describe('adminOnly', () => {
    it('should return a message for admin endpoint', () => {
      const result = controller.adminOnly();
      expect(result).toEqual({
        message: 'Acesta este un endpoint care necesită rolul de admin',
      });
      expect(mockLogger.log).toHaveBeenCalledWith('Endpoint admin accesat');
    });
  });

  describe('createUsersPermission', () => {
    it('should return a message for create:users permission endpoint', () => {
      const result = controller.createUsersPermission();
      expect(result).toEqual({
        message: 'Acesta este un endpoint care necesită permisiunea create:users',
      });
      expect(mockLogger.log).toHaveBeenCalledWith('Endpoint create:users accesat');
    });
  });

  describe('checkPermission', () => {
    it('should check if a user has a permission', async () => {
      const userId = '123';
      const permissionName = 'create:users';

      mockPermissionsService.hasPermission.mockResolvedValue(true);

      const result = await controller.checkPermission(userId, permissionName);
      expect(mockPermissionsService.hasPermission).toHaveBeenCalledWith(userId, permissionName);
      expect(result).toEqual({
        userId,
        permissionName,
        hasPermission: true,
      });
      expect(mockLogger.log).toHaveBeenCalledWith(
        `Verificare permisiune: ${userId} - ${permissionName} - true`,
      );
    });
  });

  describe('getUserPermissions', () => {
    it('should get all permissions for a user', async () => {
      const userId = '123';
      const permissions = ['create:users', 'read:users'];

      mockPermissionsService.getUserPermissions.mockResolvedValue(permissions);

      const result = await controller.getUserPermissions(userId);
      expect(mockPermissionsService.getUserPermissions).toHaveBeenCalledWith(userId);
      expect(result).toEqual({
        userId,
        permissions,
      });
      expect(mockLogger.log).toHaveBeenCalledWith(
        `Permisiuni utilizator ${userId}: ${permissions.length}`,
      );
    });
  });
});
