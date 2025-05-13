import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DateIstorice } from '../entities/date-istorice.entity';
import { CreateDateIstoriceDto } from '../dto/create-date-istorice.dto';
import { UpdateDateIstoriceDto } from '../dto/update-date-istorice.dto';
import { UATService } from '../../geographic/services/uat.service';
import { CategorieDeseuriService } from '../../operational/services/categorie-deseuri.service';

// Interfață pentru datele de actualizare
interface UpdateData extends UpdateDateIstoriceDto {
  data?: Date;
}

@Injectable()
export class DateIstoriceService {
  constructor(
    @InjectRepository(DateIstorice)
    private dateIstoriceRepository: Repository<DateIstorice>,
    private uatService: UATService,
    private categorieDeseuriService: CategorieDeseuriService,
  ) {}

  async create(createDateIstoriceDto: CreateDateIstoriceDto): Promise<DateIstorice> {
    // Verificare dacă UAT-ul există
    await this.uatService.findOne(createDateIstoriceDto.uatId);

    // Verificare dacă categoria de deșeuri există
    await this.categorieDeseuriService.findOne(createDateIstoriceDto.categorieId);

    // Setare valori implicite
    if (!createDateIstoriceDto.unitateMasura) {
      createDateIstoriceDto.unitateMasura = 'kg';
    }

    if (createDateIstoriceDto.evenimentSpecial === undefined) {
      createDateIstoriceDto.evenimentSpecial = false;
    }

    // Conversie date din string în Date
    const dateIstorice = this.dateIstoriceRepository.create({
      ...createDateIstoriceDto,
      data: new Date(createDateIstoriceDto.data),
    });

    return this.dateIstoriceRepository.save(dateIstorice);
  }

  async findAll(): Promise<DateIstorice[]> {
    return this.dateIstoriceRepository.find({
      relations: ['uat', 'categorie'],
      order: {
        data: 'DESC',
      },
    });
  }

  async findByUAT(uatId: string): Promise<DateIstorice[]> {
    return this.dateIstoriceRepository.find({
      where: { uatId },
      relations: ['uat', 'categorie'],
      order: {
        data: 'DESC',
      },
    });
  }

  async findByCategorie(categorieId: string): Promise<DateIstorice[]> {
    return this.dateIstoriceRepository.find({
      where: { categorieId },
      relations: ['uat', 'categorie'],
      order: {
        data: 'DESC',
      },
    });
  }

  async findByPeriod(startDate: string, endDate: string): Promise<DateIstorice[]> {
    return this.dateIstoriceRepository.find({
      where: {
        data: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['uat', 'categorie'],
      order: {
        data: 'DESC',
      },
    });
  }

  async findByUATAndCategorie(uatId: string, categorieId: string): Promise<DateIstorice[]> {
    return this.dateIstoriceRepository.find({
      where: { uatId, categorieId },
      relations: ['uat', 'categorie'],
      order: {
        data: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<DateIstorice> {
    const dateIstorice = await this.dateIstoriceRepository.findOne({
      where: { id },
      relations: ['uat', 'categorie'],
    });

    if (!dateIstorice) {
      throw new NotFoundException(`Înregistrarea cu ID-ul ${id} nu a fost găsită`);
    }

    return dateIstorice;
  }

  async update(id: string, updateDateIstoriceDto: UpdateDateIstoriceDto): Promise<DateIstorice> {
    const dateIstorice = await this.findOne(id);

    // Verificare dacă UAT-ul există
    if (updateDateIstoriceDto.uatId) {
      await this.uatService.findOne(updateDateIstoriceDto.uatId);
    }

    // Verificare dacă categoria de deșeuri există
    if (updateDateIstoriceDto.categorieId) {
      await this.categorieDeseuriService.findOne(updateDateIstoriceDto.categorieId);
    }

    // Pregătire date pentru actualizare
    const updateData: UpdateData = { ...updateDateIstoriceDto };

    // Conversie date din string în Date
    if (updateDateIstoriceDto.data) {
      updateData.data = new Date(updateDateIstoriceDto.data);
    }

    Object.assign(dateIstorice, updateData);
    return this.dateIstoriceRepository.save(dateIstorice);
  }

  async remove(id: string): Promise<void> {
    const dateIstorice = await this.findOne(id);
    await this.dateIstoriceRepository.remove(dateIstorice);
  }
}
