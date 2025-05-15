import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZonaIridex } from '../entities/zona-iridex.entity';
import { CreateZonaIridexDto } from '../dto/create-zona-iridex.dto';
import { UpdateZonaIridexDto } from '../dto/update-zona-iridex.dto';

@Injectable()
export class ZoneIridexService {
  constructor(
    @InjectRepository(ZonaIridex)
    private zonaIridexRepository: Repository<ZonaIridex>,
  ) {}

  async create(createZonaIridexDto: CreateZonaIridexDto): Promise<ZonaIridex> {
    // Verificare dacă există deja o zonă Iridex cu același nume
    const existingByName = await this.zonaIridexRepository.findOne({
      where: { nume: createZonaIridexDto.nume },
    });
    if (existingByName) {
      throw new ConflictException(
        `Există deja o zonă Iridex cu numele ${createZonaIridexDto.nume}`,
      );
    }

    // Verificare dacă există deja o zonă Iridex cu același cod
    if (createZonaIridexDto.cod) {
      const existingByCode = await this.zonaIridexRepository.findOne({
        where: { cod: createZonaIridexDto.cod },
      });
      if (existingByCode) {
        throw new ConflictException(
          `Există deja o zonă Iridex cu codul ${createZonaIridexDto.cod}`,
        );
      }
    }

    const zonaIridex = this.zonaIridexRepository.create(createZonaIridexDto);
    return this.zonaIridexRepository.save(zonaIridex);
  }

  async findAll(): Promise<ZonaIridex[]> {
    return this.zonaIridexRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ZonaIridex> {
    const zonaIridex = await this.zonaIridexRepository.findOne({
      where: { id },
      relations: ['uaturi'],
    });

    if (!zonaIridex) {
      throw new NotFoundException(`Zona Iridex cu ID-ul ${id} nu a fost găsită`);
    }

    return zonaIridex;
  }

  async findByCod(cod: string): Promise<ZonaIridex> {
    const zonaIridex = await this.zonaIridexRepository.findOne({
      where: { cod },
    });

    if (!zonaIridex) {
      throw new NotFoundException(`Zona Iridex cu codul ${cod} nu a fost găsită`);
    }

    return zonaIridex;
  }

  async update(id: string, updateZonaIridexDto: UpdateZonaIridexDto): Promise<ZonaIridex> {
    const zonaIridex = await this.findOne(id);

    // Verificare dacă există deja o zonă Iridex cu același nume
    if (updateZonaIridexDto.nume && updateZonaIridexDto.nume !== zonaIridex.nume) {
      const existingByName = await this.zonaIridexRepository.findOne({
        where: { nume: updateZonaIridexDto.nume },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(
          `Există deja o zonă Iridex cu numele ${updateZonaIridexDto.nume}`,
        );
      }
    }

    // Verificare dacă există deja o zonă Iridex cu același cod
    if (updateZonaIridexDto.cod && updateZonaIridexDto.cod !== zonaIridex.cod) {
      const existingByCode = await this.zonaIridexRepository.findOne({
        where: { cod: updateZonaIridexDto.cod },
      });
      if (existingByCode && existingByCode.id !== id) {
        throw new ConflictException(
          `Există deja o zonă Iridex cu codul ${updateZonaIridexDto.cod}`,
        );
      }
    }

    Object.assign(zonaIridex, updateZonaIridexDto);
    return this.zonaIridexRepository.save(zonaIridex);
  }

  async remove(id: string): Promise<void> {
    const zonaIridex = await this.findOne(id);
    await this.zonaIridexRepository.remove(zonaIridex);
  }
}
