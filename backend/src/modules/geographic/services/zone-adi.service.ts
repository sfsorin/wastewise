import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZonaADI } from '../entities/zona-adi.entity';
import { CreateZonaADIDto } from '../dto/create-zona-adi.dto';
import { UpdateZonaADIDto } from '../dto/update-zona-adi.dto';

@Injectable()
export class ZoneADIService {
  constructor(
    @InjectRepository(ZonaADI)
    private zonaADIRepository: Repository<ZonaADI>,
  ) {}

  async create(createZonaADIDto: CreateZonaADIDto): Promise<ZonaADI> {
    // Verificare dacă există deja o zonă ADI cu același nume
    const existingByName = await this.zonaADIRepository.findOne({
      where: { nume: createZonaADIDto.nume },
    });
    if (existingByName) {
      throw new ConflictException(`Există deja o zonă ADI cu numele ${createZonaADIDto.nume}`);
    }

    // Verificare dacă există deja o zonă ADI cu același cod
    if (createZonaADIDto.cod) {
      const existingByCode = await this.zonaADIRepository.findOne({
        where: { cod: createZonaADIDto.cod },
      });
      if (existingByCode) {
        throw new ConflictException(`Există deja o zonă ADI cu codul ${createZonaADIDto.cod}`);
      }
    }

    const zonaADI = this.zonaADIRepository.create(createZonaADIDto);
    return this.zonaADIRepository.save(zonaADI);
  }

  async findAll(): Promise<ZonaADI[]> {
    return this.zonaADIRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<ZonaADI> {
    const zonaADI = await this.zonaADIRepository.findOne({
      where: { id },
      relations: ['uaturi'],
    });

    if (!zonaADI) {
      throw new NotFoundException(`Zona ADI cu ID-ul ${id} nu a fost găsită`);
    }

    return zonaADI;
  }

  async findByCod(cod: string): Promise<ZonaADI> {
    const zonaADI = await this.zonaADIRepository.findOne({
      where: { cod },
    });

    if (!zonaADI) {
      throw new NotFoundException(`Zona ADI cu codul ${cod} nu a fost găsită`);
    }

    return zonaADI;
  }

  async update(id: string, updateZonaADIDto: UpdateZonaADIDto): Promise<ZonaADI> {
    const zonaADI = await this.findOne(id);

    // Verificare dacă există deja o zonă ADI cu același nume
    if (updateZonaADIDto.nume && updateZonaADIDto.nume !== zonaADI.nume) {
      const existingByName = await this.zonaADIRepository.findOne({
        where: { nume: updateZonaADIDto.nume },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(`Există deja o zonă ADI cu numele ${updateZonaADIDto.nume}`);
      }
    }

    // Verificare dacă există deja o zonă ADI cu același cod
    if (updateZonaADIDto.cod && updateZonaADIDto.cod !== zonaADI.cod) {
      const existingByCode = await this.zonaADIRepository.findOne({
        where: { cod: updateZonaADIDto.cod },
      });
      if (existingByCode && existingByCode.id !== id) {
        throw new ConflictException(`Există deja o zonă ADI cu codul ${updateZonaADIDto.cod}`);
      }
    }

    Object.assign(zonaADI, updateZonaADIDto);
    return this.zonaADIRepository.save(zonaADI);
  }

  async remove(id: string): Promise<void> {
    const zonaADI = await this.findOne(id);
    await this.zonaADIRepository.remove(zonaADI);
  }
}
