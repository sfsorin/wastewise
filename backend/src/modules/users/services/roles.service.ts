import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Verificare dacă există deja un rol cu același nume
    const existingByName = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });
    if (existingByName) {
      throw new ConflictException(`Există deja un rol cu numele ${createRoleDto.name}`);
    }

    const role = this.roleRepository.create({
      name: createRoleDto.name,
      description: createRoleDto.description,
    });

    // Adăugare permisiuni dacă sunt specificate
    if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
      const permissions = await Promise.all(
        createRoleDto.permissionIds.map(id => this.permissionRepository.findOne({ where: { id } })),
      );
      role.permissions = permissions.filter(p => p !== null);
    }

    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find({
      relations: ['permissions', 'users'],
      order: {
        name: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: ['permissions', 'users'],
    });

    if (!role) {
      throw new NotFoundException(`Rolul cu ID-ul ${id} nu a fost găsit`);
    }

    return role;
  }

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { name },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException(`Rolul cu numele ${name} nu a fost găsit`);
    }

    return role;
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Verificare dacă există deja un rol cu același nume
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingByName = await this.roleRepository.findOne({
        where: { name: updateRoleDto.name },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(`Există deja un rol cu numele ${updateRoleDto.name}`);
      }
    }

    // Actualizare proprietăți de bază
    if (updateRoleDto.name) {
      role.name = updateRoleDto.name;
    }
    if (updateRoleDto.description !== undefined) {
      role.description = updateRoleDto.description;
    }

    // Actualizare permisiuni dacă sunt specificate
    if (updateRoleDto.permissionIds) {
      await this.updatePermissions(id, updateRoleDto.permissionIds);
      return this.findOne(id);
    }

    return this.roleRepository.save(role);
  }

  async updatePermissions(roleId: string, permissionIds: string[]): Promise<Role> {
    const role = await this.findOne(roleId);

    if (permissionIds.length === 0) {
      role.permissions = [];
    } else {
      const permissions = await Promise.all(
        permissionIds.map(id => this.permissionRepository.findOne({ where: { id } })),
      );

      const validPermissions = permissions.filter(p => p !== null);

      if (validPermissions.length !== permissionIds.length) {
        const foundIds = validPermissions.map(p => p.id);
        const missingIds = permissionIds.filter(id => !foundIds.includes(id));
        throw new NotFoundException(
          `Permisiunile cu ID-urile ${missingIds.join(', ')} nu au fost găsite`,
        );
      }

      role.permissions = validPermissions;
    }

    return this.roleRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);
    await this.roleRepository.remove(role);
  }
}
