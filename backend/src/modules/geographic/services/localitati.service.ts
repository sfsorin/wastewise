import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localitate } from '../entities/localitate.entity';
import { CreateLocalitateDto } from '../dto/create-localitate.dto';
import { UpdateLocalitateDto } from '../dto/update-localitate.dto';
import { JudeteService } from './judete.service';

@Injectable()
export class LocalitatiService {
  constructor(
    @InjectRepository(Localitate)
    private localitatiRepository: Repository<Localitate>,
    private judeteService: JudeteService,
  ) {}

  async create(createLocalitateDto: CreateLocalitateDto): Promise<Localitate> {
    // Verificare dacă județul există
    await this.judeteService.findOne(createLocalitateDto.judetId);

    // Verificare dacă există deja o localitate cu același cod SIRUTA
    if (createLocalitateDto.codSiruta) {
      const existingBySiruta = await this.localitatiRepository.findOne({
        where: { codSiruta: createLocalitateDto.codSiruta },
      });
      if (existingBySiruta) {
        throw new ConflictException(
          `Există deja o localitate cu codul SIRUTA ${createLocalitateDto.codSiruta}`,
        );
      }
    }

    const localitate = this.localitatiRepository.create(createLocalitateDto);
    return this.localitatiRepository.save(localitate);
  }

  async findAll(): Promise<Localitate[]> {
    return this.localitatiRepository.find({
      relations: ['judet'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByJudet(judetId: string): Promise<Localitate[]> {
    return this.localitatiRepository.find({
      where: { judetId },
      relations: ['judet'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Localitate> {
    const localitate = await this.localitatiRepository.findOne({
      where: { id },
      relations: ['judet', 'puncteColectare', 'clienti'],
    });

    if (!localitate) {
      throw new NotFoundException(`Localitatea cu ID-ul ${id} nu a fost găsită`);
    }

    return localitate;
  }

  async update(id: string, updateLocalitateDto: UpdateLocalitateDto): Promise<Localitate> {
    const localitate = await this.findOne(id);

    // Verificare dacă județul există
    if (updateLocalitateDto.judetId) {
      await this.judeteService.findOne(updateLocalitateDto.judetId);
    }

    // Verificare dacă există deja o localitate cu același cod SIRUTA
    if (updateLocalitateDto.codSiruta && updateLocalitateDto.codSiruta !== localitate.codSiruta) {
      const existingBySiruta = await this.localitatiRepository.findOne({
        where: { codSiruta: updateLocalitateDto.codSiruta },
      });
      if (existingBySiruta && existingBySiruta.id !== id) {
        throw new ConflictException(
          `Există deja o localitate cu codul SIRUTA ${updateLocalitateDto.codSiruta}`,
        );
      }
    }

    Object.assign(localitate, updateLocalitateDto);
    return this.localitatiRepository.save(localitate);
  }

  async remove(id: string): Promise<void> {
    const localitate = await this.findOne(id);
    await this.localitatiRepository.remove(localitate);
  }
}
