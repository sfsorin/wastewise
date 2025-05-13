import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieDeseuri } from '../entities/categorie-deseuri.entity';
import { CreateCategorieDeseuriDto } from '../dto/create-categorie-deseuri.dto';
import { UpdateCategorieDeseuriDto } from '../dto/update-categorie-deseuri.dto';

@Injectable()
export class CategorieDeseuriService {
  constructor(
    @InjectRepository(CategorieDeseuri)
    private categorieDeseuriRepository: Repository<CategorieDeseuri>,
  ) {}

  async create(createCategorieDeseuriDto: CreateCategorieDeseuriDto): Promise<CategorieDeseuri> {
    // Verificare dacă există deja o categorie cu același nume sau cod
    const existingByName = await this.categorieDeseuriRepository.findOne({
      where: { nume: createCategorieDeseuriDto.nume },
    });
    if (existingByName) {
      throw new ConflictException(
        `Există deja o categorie cu numele ${createCategorieDeseuriDto.nume}`,
      );
    }

    if (createCategorieDeseuriDto.cod) {
      const existingByCode = await this.categorieDeseuriRepository.findOne({
        where: { cod: createCategorieDeseuriDto.cod },
      });
      if (existingByCode) {
        throw new ConflictException(
          `Există deja o categorie cu codul ${createCategorieDeseuriDto.cod}`,
        );
      }
    }

    const categorieDeseuri = this.categorieDeseuriRepository.create(createCategorieDeseuriDto);
    return this.categorieDeseuriRepository.save(categorieDeseuri);
  }

  async findAll(): Promise<CategorieDeseuri[]> {
    return this.categorieDeseuriRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<CategorieDeseuri> {
    const categorieDeseuri = await this.categorieDeseuriRepository.findOne({
      where: { id },
      relations: ['dateIstorice', 'predictiiCantitati'],
    });

    if (!categorieDeseuri) {
      throw new NotFoundException(`Categoria de deșeuri cu ID-ul ${id} nu a fost găsită`);
    }

    return categorieDeseuri;
  }

  async findByCod(cod: string): Promise<CategorieDeseuri> {
    const categorieDeseuri = await this.categorieDeseuriRepository.findOne({
      where: { cod },
    });

    if (!categorieDeseuri) {
      throw new NotFoundException(`Categoria de deșeuri cu codul ${cod} nu a fost găsită`);
    }

    return categorieDeseuri;
  }

  async update(
    id: string,
    updateCategorieDeseuriDto: UpdateCategorieDeseuriDto,
  ): Promise<CategorieDeseuri> {
    const categorieDeseuri = await this.findOne(id);

    // Verificare dacă există deja o categorie cu același nume sau cod
    if (
      updateCategorieDeseuriDto.nume &&
      updateCategorieDeseuriDto.nume !== categorieDeseuri.nume
    ) {
      const existingByName = await this.categorieDeseuriRepository.findOne({
        where: { nume: updateCategorieDeseuriDto.nume },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(
          `Există deja o categorie cu numele ${updateCategorieDeseuriDto.nume}`,
        );
      }
    }

    if (updateCategorieDeseuriDto.cod && updateCategorieDeseuriDto.cod !== categorieDeseuri.cod) {
      const existingByCode = await this.categorieDeseuriRepository.findOne({
        where: { cod: updateCategorieDeseuriDto.cod },
      });
      if (existingByCode && existingByCode.id !== id) {
        throw new ConflictException(
          `Există deja o categorie cu codul ${updateCategorieDeseuriDto.cod}`,
        );
      }
    }

    Object.assign(categorieDeseuri, updateCategorieDeseuriDto);
    return this.categorieDeseuriRepository.save(categorieDeseuri);
  }

  async remove(id: string): Promise<void> {
    const categorieDeseuri = await this.findOne(id);
    await this.categorieDeseuriRepository.remove(categorieDeseuri);
  }
}
