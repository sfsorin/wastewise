import { Controller, Get, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from '../decorators/roles.decorator';
import { Permissions } from '../decorators/permissions.decorator';
import { Public } from '../decorators/public.decorator';
import { PermissionsService } from '../../users/services/permissions.service';

/**
 * Controller pentru testarea funcționalităților RBAC
 */
@ApiTags('rbac')
@Controller('rbac')
@ApiBearerAuth('JWT-auth')
export class RbacController {
  private readonly logger = new Logger(RbacController.name);

  constructor(private readonly permissionsService: PermissionsService) {}

  /**
   * Endpoint public care nu necesită autentificare
   */
  @Get('public')
  @Public()
  @ApiOperation({ summary: 'Endpoint public care nu necesită autentificare' })
  @ApiResponse({
    status: 200,
    description: 'Endpoint public accesat cu succes',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  public(): { message: string } {
    this.logger.log('Endpoint public accesat');
    return { message: 'Acesta este un endpoint public care nu necesită autentificare' };
  }

  /**
   * Endpoint care necesită autentificare, dar nu necesită roluri sau permisiuni specifice
   */
  @Get('authenticated')
  @ApiOperation({ summary: 'Endpoint care necesită doar autentificare' })
  @ApiResponse({
    status: 200,
    description: 'Endpoint accesat cu succes',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  authenticated(): { message: string } {
    this.logger.log('Endpoint autentificat accesat');
    return { message: 'Acesta este un endpoint care necesită autentificare' };
  }

  /**
   * Endpoint care necesită rolul de admin
   */
  @Get('admin')
  @Roles('admin')
  @ApiOperation({ summary: 'Endpoint care necesită rolul de admin' })
  @ApiResponse({
    status: 200,
    description: 'Endpoint accesat cu succes',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  adminOnly(): { message: string } {
    this.logger.log('Endpoint admin accesat');
    return { message: 'Acesta este un endpoint care necesită rolul de admin' };
  }

  /**
   * Endpoint care necesită permisiunea de a crea utilizatori
   */
  @Get('permissions/create-users')
  @Permissions('create:users')
  @ApiOperation({ summary: 'Endpoint care necesită permisiunea de a crea utilizatori' })
  @ApiResponse({
    status: 200,
    description: 'Endpoint accesat cu succes',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  })
  createUsersPermission(): { message: string } {
    this.logger.log('Endpoint create:users accesat');
    return { message: 'Acesta este un endpoint care necesită permisiunea create:users' };
  }

  /**
   * Endpoint care verifică dacă utilizatorul are o anumită permisiune
   */
  @Get('check-permission/:userId/:permissionName')
  @Roles('admin')
  @ApiOperation({ summary: 'Verifică dacă un utilizator are o anumită permisiune' })
  @ApiParam({
    name: 'userId',
    description: 'ID-ul utilizatorului',
    type: 'string',
  })
  @ApiParam({
    name: 'permissionName',
    description: 'Numele permisiunii',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Verificare efectuată cu succes',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        permissionName: { type: 'string' },
        hasPermission: { type: 'boolean' },
      },
    },
  })
  async checkPermission(
    @Param('userId') userId: string,
    @Param('permissionName') permissionName: string,
  ): Promise<{ userId: string; permissionName: string; hasPermission: boolean }> {
    const hasPermission = await this.permissionsService.hasPermission(userId, permissionName);
    this.logger.log(`Verificare permisiune: ${userId} - ${permissionName} - ${hasPermission}`);

    return {
      userId,
      permissionName,
      hasPermission,
    };
  }

  /**
   * Endpoint care obține toate permisiunile unui utilizator
   */
  @Get('user-permissions/:userId')
  @Roles('admin')
  @ApiOperation({ summary: 'Obține toate permisiunile unui utilizator' })
  @ApiParam({
    name: 'userId',
    description: 'ID-ul utilizatorului',
    type: 'string',
  })
  @ApiResponse({
    status: 200,
    description: 'Permisiuni obținute cu succes',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        permissions: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async getUserPermissions(
    @Param('userId') userId: string,
  ): Promise<{ userId: string; permissions: string[] }> {
    const permissions = await this.permissionsService.getUserPermissions(userId);
    this.logger.log(`Permisiuni utilizator ${userId}: ${permissions.length}`);

    return {
      userId,
      permissions,
    };
  }
}
