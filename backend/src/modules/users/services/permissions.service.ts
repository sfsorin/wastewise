import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
  CACHE_MANAGER,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class PermissionsService {
  private readonly logger = new Logger(PermissionsService.name);
  private readonly CACHE_TTL = 3600000; // 1 oră în milisecunde
  private readonly CACHE_PREFIX = 'permissions:';

  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(createPermissionDto: CreatePermissionDto): Promise<Permission> {
    // Verificare dacă există deja o permisiune cu același nume
    const existingByName = await this.permissionRepository.findOne({
      where: { name: createPermissionDto.name },
    });
    if (existingByName) {
      throw new ConflictException(`Există deja o permisiune cu numele ${createPermissionDto.name}`);
    }

    const permission = this.permissionRepository.create(createPermissionDto);
    return this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find({
      relations: ['roles'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { id },
      relations: ['roles'],
    });

    if (!permission) {
      throw new NotFoundException(`Permisiunea cu ID-ul ${id} nu a fost găsită`);
    }

    return permission;
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.permissionRepository.findOne({
      where: { name },
      relations: ['roles'],
    });

    if (!permission) {
      throw new NotFoundException(`Permisiunea cu numele ${name} nu a fost găsită`);
    }

    return permission;
  }

  async update(id: string, updatePermissionDto: UpdatePermissionDto): Promise<Permission> {
    const permission = await this.findOne(id);

    // Verificare dacă există deja o permisiune cu același nume
    if (updatePermissionDto.name && updatePermissionDto.name !== permission.name) {
      const existingByName = await this.permissionRepository.findOne({
        where: { name: updatePermissionDto.name },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(
          `Există deja o permisiune cu numele ${updatePermissionDto.name}`,
        );
      }
    }

    Object.assign(permission, updatePermissionDto);
    return this.permissionRepository.save(permission);
  }

  async remove(id: string): Promise<void> {
    const permission = await this.findOne(id);
    await this.permissionRepository.remove(permission);

    // Invalidăm cache-ul pentru această permisiune
    await this.cacheManager.del(`${this.CACHE_PREFIX}${id}`);
    await this.cacheManager.del(`${this.CACHE_PREFIX}name:${permission.name}`);
    this.logger.log(`Cache invalidat pentru permisiunea ${permission.name}`);
  }

  /**
   * Verifică dacă un utilizator are o anumită permisiune
   * @param userId ID-ul utilizatorului
   * @param permissionName Numele permisiunii
   * @returns true dacă utilizatorul are permisiunea, false în caz contrar
   */
  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    // Verificăm mai întâi în cache
    const cacheKey = `${this.CACHE_PREFIX}user:${userId}:${permissionName}`;
    const cachedResult = await this.cacheManager.get<boolean>(cacheKey);

    if (cachedResult !== undefined) {
      this.logger.debug(`Rezultat din cache pentru ${cacheKey}: ${cachedResult}`);
      return cachedResult;
    }

    try {
      // Verificăm în baza de date
      const result = await this.permissionRepository
        .createQueryBuilder('permission')
        .innerJoin('permission.roles', 'role')
        .innerJoin('role.users', 'user')
        .where('permission.name = :permissionName', { permissionName })
        .andWhere('user.id = :userId', { userId })
        .getCount();

      const hasPermission = result > 0;

      // Salvăm rezultatul în cache
      await this.cacheManager.set(cacheKey, hasPermission, this.CACHE_TTL);
      this.logger.debug(`Rezultat salvat în cache pentru ${cacheKey}: ${hasPermission}`);

      return hasPermission;
    } catch (error) {
      this.logger.error(`Eroare la verificarea permisiunii: ${error.message}`);
      return false;
    }
  }

  /**
   * Obține toate permisiunile unui utilizator
   * @param userId ID-ul utilizatorului
   * @returns Lista de permisiuni ale utilizatorului
   */
  async getUserPermissions(userId: string): Promise<string[]> {
    // Verificăm mai întâi în cache
    const cacheKey = `${this.CACHE_PREFIX}user:${userId}:all`;
    const cachedPermissions = await this.cacheManager.get<string[]>(cacheKey);

    if (cachedPermissions) {
      this.logger.debug(
        `Permisiuni din cache pentru utilizatorul ${userId}: ${cachedPermissions.length}`,
      );
      return cachedPermissions;
    }

    try {
      // Obținem permisiunile din baza de date
      const permissions = await this.permissionRepository
        .createQueryBuilder('permission')
        .innerJoin('permission.roles', 'role')
        .innerJoin('role.users', 'user')
        .where('user.id = :userId', { userId })
        .select('permission.name', 'name')
        .distinct(true)
        .getRawMany();

      const permissionNames = permissions.map(p => p.name);

      // Salvăm rezultatul în cache
      await this.cacheManager.set(cacheKey, permissionNames, this.CACHE_TTL);
      this.logger.debug(
        `Permisiuni salvate în cache pentru utilizatorul ${userId}: ${permissionNames.length}`,
      );

      return permissionNames;
    } catch (error) {
      this.logger.error(`Eroare la obținerea permisiunilor utilizatorului: ${error.message}`);
      return [];
    }
  }

  /**
   * Invalidează cache-ul de permisiuni pentru un utilizator
   * @param userId ID-ul utilizatorului
   */
  async invalidateUserPermissionsCache(userId: string): Promise<void> {
    const cacheKey = `${this.CACHE_PREFIX}user:${userId}:all`;
    await this.cacheManager.del(cacheKey);
    this.logger.log(`Cache invalidat pentru permisiunile utilizatorului ${userId}`);
  }
}
