import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { CreatePermissionDto } from '../dto/create-permission.dto';
import { UpdatePermissionDto } from '../dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
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
  }
}
