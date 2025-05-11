import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UAT } from '../entities/uat.entity';
import { CreateUATDto } from '../dto/create-uat.dto';
import { UpdateUATDto } from '../dto/update-uat.dto';
import { JudeteService } from './judete.service';

@Injectable()
export class UATService {
  constructor(
    @InjectRepository(UAT)
    private uatRepository: Repository<UAT>,
    private judeteService: JudeteService,
  ) {}

  async create(createUATDto: CreateUATDto): Promise<UAT> {
    // Verificare dacă județul există
    await this.judeteService.findOne(createUATDto.judetId);

    // Verificare dacă există deja un UAT cu același cod SIRUTA
    if (createUATDto.codSiruta) {
      const existingBySiruta = await this.uatRepository.findOne({
        where: { codSiruta: createUATDto.codSiruta },
      });
      if (existingBySiruta) {
        throw new ConflictException(`Există deja un UAT cu codul SIRUTA ${createUATDto.codSiruta}`);
      }
    }

    const uat = this.uatRepository.create(createUATDto);
    return this.uatRepository.save(uat);
  }

  async findAll(): Promise<UAT[]> {
    return this.uatRepository.find({
      relations: ['judet'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByJudet(judetId: string): Promise<UAT[]> {
    return this.uatRepository.find({
      where: { judetId },
      relations: ['judet'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<UAT> {
    const uat = await this.uatRepository.findOne({
      where: { id },
      relations: ['judet', 'dateIstorice', 'predictiiCantitati'],
    });

    if (!uat) {
      throw new NotFoundException(`UAT-ul cu ID-ul ${id} nu a fost găsit`);
    }

    return uat;
  }

  async update(id: string, updateUATDto: UpdateUATDto): Promise<UAT> {
    const uat = await this.findOne(id);

    // Verificare dacă județul există
    if (updateUATDto.judetId) {
      await this.judeteService.findOne(updateUATDto.judetId);
    }

    // Verificare dacă există deja un UAT cu același cod SIRUTA
    if (updateUATDto.codSiruta && updateUATDto.codSiruta !== uat.codSiruta) {
      const existingBySiruta = await this.uatRepository.findOne({
        where: { codSiruta: updateUATDto.codSiruta },
      });
      if (existingBySiruta && existingBySiruta.id !== id) {
        throw new ConflictException(`Există deja un UAT cu codul SIRUTA ${updateUATDto.codSiruta}`);
      }
    }

    Object.assign(uat, updateUATDto);
    return this.uatRepository.save(uat);
  }

  async remove(id: string): Promise<void> {
    const uat = await this.findOne(id);
    await this.uatRepository.remove(uat);
  }
}
