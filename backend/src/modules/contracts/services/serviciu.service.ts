import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serviciu } from '../entities/serviciu.entity';
import { CreateServiciuDto } from '../dto/create-serviciu.dto';
import { UpdateServiciuDto } from '../dto/update-serviciu.dto';

@Injectable()
export class ServiciuService {
  constructor(
    @InjectRepository(Serviciu)
    private serviciuRepository: Repository<Serviciu>,
  ) {}

  async create(createServiciuDto: CreateServiciuDto): Promise<Serviciu> {
    // Verificare dacă există deja un serviciu cu același nume
    const existingByName = await this.serviciuRepository.findOne({
      where: { nume: createServiciuDto.nume },
    });
    if (existingByName) {
      throw new ConflictException(`Există deja un serviciu cu numele ${createServiciuDto.nume}`);
    }

    const serviciu = this.serviciuRepository.create(createServiciuDto);
    return this.serviciuRepository.save(serviciu);
  }

  async findAll(): Promise<Serviciu[]> {
    return this.serviciuRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Serviciu> {
    const serviciu = await this.serviciuRepository.findOne({
      where: { id },
      relations: ['serviciiContractate'],
    });

    if (!serviciu) {
      throw new NotFoundException(`Serviciul cu ID-ul ${id} nu a fost găsit`);
    }

    return serviciu;
  }

  async update(id: string, updateServiciuDto: UpdateServiciuDto): Promise<Serviciu> {
    const serviciu = await this.findOne(id);

    // Verificare dacă există deja un serviciu cu același nume
    if (updateServiciuDto.nume && updateServiciuDto.nume !== serviciu.nume) {
      const existingByName = await this.serviciuRepository.findOne({
        where: { nume: updateServiciuDto.nume },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(`Există deja un serviciu cu numele ${updateServiciuDto.nume}`);
      }
    }

    Object.assign(serviciu, updateServiciuDto);
    return this.serviciuRepository.save(serviciu);
  }

  async remove(id: string): Promise<void> {
    const serviciu = await this.findOne(id);
    await this.serviciuRepository.remove(serviciu);
  }
}
