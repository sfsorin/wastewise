import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Judet } from '../entities/judet.entity';
import { CreateJudetDto } from '../dto/create-judet.dto';
import { UpdateJudetDto } from '../dto/update-judet.dto';

@Injectable()
export class JudeteService {
  constructor(
    @InjectRepository(Judet)
    private judeteRepository: Repository<Judet>,
  ) {}

  async create(createJudetDto: CreateJudetDto): Promise<Judet> {
    // Verificare dacă există deja un județ cu același cod SIRUTA sau cod auto
    if (createJudetDto.codSiruta) {
      const existingBySiruta = await this.judeteRepository.findOne({
        where: { codSiruta: createJudetDto.codSiruta },
      });
      if (existingBySiruta) {
        throw new ConflictException(`Există deja un județ cu codul SIRUTA ${createJudetDto.codSiruta}`);
      }
    }

    if (createJudetDto.codAuto) {
      const existingByAuto = await this.judeteRepository.findOne({
        where: { codAuto: createJudetDto.codAuto },
      });
      if (existingByAuto) {
        throw new ConflictException(`Există deja un județ cu codul auto ${createJudetDto.codAuto}`);
      }
    }

    const judet = this.judeteRepository.create(createJudetDto);
    return this.judeteRepository.save(judet);
  }

  async findAll(): Promise<Judet[]> {
    return this.judeteRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Judet> {
    const judet = await this.judeteRepository.findOne({
      where: { id },
      relations: ['localitati', 'uaturi'],
    });

    if (!judet) {
      throw new NotFoundException(`Județul cu ID-ul ${id} nu a fost găsit`);
    }

    return judet;
  }

  async findByCodAuto(codAuto: string): Promise<Judet> {
    const judet = await this.judeteRepository.findOne({
      where: { codAuto },
    });

    if (!judet) {
      throw new NotFoundException(`Județul cu codul auto ${codAuto} nu a fost găsit`);
    }

    return judet;
  }

  async update(id: string, updateJudetDto: UpdateJudetDto): Promise<Judet> {
    const judet = await this.findOne(id);

    // Verificare dacă există deja un județ cu același cod SIRUTA sau cod auto
    if (updateJudetDto.codSiruta && updateJudetDto.codSiruta !== judet.codSiruta) {
      const existingBySiruta = await this.judeteRepository.findOne({
        where: { codSiruta: updateJudetDto.codSiruta },
      });
      if (existingBySiruta && existingBySiruta.id !== id) {
        throw new ConflictException(`Există deja un județ cu codul SIRUTA ${updateJudetDto.codSiruta}`);
      }
    }

    if (updateJudetDto.codAuto && updateJudetDto.codAuto !== judet.codAuto) {
      const existingByAuto = await this.judeteRepository.findOne({
        where: { codAuto: updateJudetDto.codAuto },
      });
      if (existingByAuto && existingByAuto.id !== id) {
        throw new ConflictException(`Există deja un județ cu codul auto ${updateJudetDto.codAuto}`);
      }
    }

    Object.assign(judet, updateJudetDto);
    return this.judeteRepository.save(judet);
  }

  async remove(id: string): Promise<void> {
    const judet = await this.findOne(id);
    await this.judeteRepository.remove(judet);
  }
}
