import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PredictiiCantitati } from '../entities/predictii-cantitati.entity';
import { CreatePredictiiCantitatiDto } from '../dto/create-predictii-cantitati.dto';
import { UpdatePredictiiCantitatiDto } from '../dto/update-predictii-cantitati.dto';
import { UATService } from '../../geographic/services/uat.service';
import { ClientService } from '../../entities/services/client.service';
import { PunctColectareService } from '../../operational/services/punct-colectare.service';
import { CategorieDeseuriService } from '../../operational/services/categorie-deseuri.service';

// Interfață pentru datele de actualizare
interface UpdateData {
  uatId?: string;
  clientId?: string;
  punctColectareId?: string;
  categorieId?: string;
  dataPredictie?: Date;
  perioadaStart?: Date;
  perioadaEnd?: Date;
  cantitateEstimata?: number;
  unitateMasura?: string;
  limitaInferioara?: number;
  limitaSuperioara?: number;
  intervalIncredere?: number;
  acuratetePredictie?: number;
  modelUtilizat?: string;
  parametriModel?: Record<string, number | string | boolean | null>;
}

@Injectable()
export class PredictiiCantitatiService {
  constructor(
    @InjectRepository(PredictiiCantitati)
    private predictiiCantitatiRepository: Repository<PredictiiCantitati>,
    private uatService: UATService,
    private clientService: ClientService,
    private punctColectareService: PunctColectareService,
    private categorieDeseuriService: CategorieDeseuriService,
  ) {}

  async create(
    createPredictiiCantitatiDto: CreatePredictiiCantitatiDto,
  ): Promise<PredictiiCantitati> {
    // Verificare dacă UAT-ul există
    if (createPredictiiCantitatiDto.uatId) {
      await this.uatService.findOne(createPredictiiCantitatiDto.uatId);
    }

    // Verificare dacă clientul există
    if (createPredictiiCantitatiDto.clientId) {
      await this.clientService.findOne(createPredictiiCantitatiDto.clientId);
    }

    // Verificare dacă punctul de colectare există
    if (createPredictiiCantitatiDto.punctColectareId) {
      await this.punctColectareService.findOne(createPredictiiCantitatiDto.punctColectareId);
    }

    // Verificare dacă categoria de deșeuri există
    await this.categorieDeseuriService.findOne(createPredictiiCantitatiDto.categorieId);

    // Setare valori implicite
    if (!createPredictiiCantitatiDto.unitateMasura) {
      createPredictiiCantitatiDto.unitateMasura = 'kg';
    }

    // Conversie date din string în Date
    const predictiiCantitati = this.predictiiCantitatiRepository.create({
      ...createPredictiiCantitatiDto,
      dataPredictie: new Date(createPredictiiCantitatiDto.dataPredictie),
      perioadaStart: new Date(createPredictiiCantitatiDto.perioadaStart),
      perioadaEnd: new Date(createPredictiiCantitatiDto.perioadaEnd),
    });

    return this.predictiiCantitatiRepository.save(predictiiCantitati);
  }

  async findAll(): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      relations: ['uat', 'client', 'punctColectare', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findByUAT(uatId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      where: { uatId },
      relations: ['uat', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findByClient(clientId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      where: { clientId },
      relations: ['client', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findByPunctColectare(punctColectareId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      where: { punctColectareId },
      relations: ['punctColectare', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findByCategorie(categorieId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      where: { categorieId },
      relations: ['uat', 'client', 'punctColectare', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findByPeriod(startDate: string, endDate: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiRepository.find({
      where: {
        perioadaStart: Between(new Date(startDate), new Date(endDate)),
        perioadaEnd: Between(new Date(startDate), new Date(endDate)),
      },
      relations: ['uat', 'client', 'punctColectare', 'categorie'],
      order: {
        dataPredictie: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<PredictiiCantitati> {
    const predictiiCantitati = await this.predictiiCantitatiRepository.findOne({
      where: { id },
      relations: ['uat', 'client', 'punctColectare', 'categorie'],
    });

    if (!predictiiCantitati) {
      throw new NotFoundException(`Predicția cu ID-ul ${id} nu a fost găsită`);
    }

    return predictiiCantitati;
  }

  async update(
    id: string,
    updatePredictiiCantitatiDto: UpdatePredictiiCantitatiDto,
  ): Promise<PredictiiCantitati> {
    const predictiiCantitati = await this.findOne(id);

    // Verificare dacă UAT-ul există
    if (updatePredictiiCantitatiDto.uatId) {
      await this.uatService.findOne(updatePredictiiCantitatiDto.uatId);
    }

    // Verificare dacă clientul există
    if (updatePredictiiCantitatiDto.clientId) {
      await this.clientService.findOne(updatePredictiiCantitatiDto.clientId);
    }

    // Verificare dacă punctul de colectare există
    if (updatePredictiiCantitatiDto.punctColectareId) {
      await this.punctColectareService.findOne(updatePredictiiCantitatiDto.punctColectareId);
    }

    // Verificare dacă categoria de deșeuri există
    if (updatePredictiiCantitatiDto.categorieId) {
      await this.categorieDeseuriService.findOne(updatePredictiiCantitatiDto.categorieId);
    }

    // Pregătire date pentru actualizare
    const updateData: UpdateData = {
      uatId: updatePredictiiCantitatiDto.uatId,
      clientId: updatePredictiiCantitatiDto.clientId,
      punctColectareId: updatePredictiiCantitatiDto.punctColectareId,
      categorieId: updatePredictiiCantitatiDto.categorieId,
      cantitateEstimata: updatePredictiiCantitatiDto.cantitateEstimata,
      unitateMasura: updatePredictiiCantitatiDto.unitateMasura,
      acuratetePredictie: updatePredictiiCantitatiDto.acuratetePredictie,
      modelUtilizat: updatePredictiiCantitatiDto.modelUtilizat,
      parametriModel: updatePredictiiCantitatiDto.parametriModel,
    };

    // Adăugare proprietăți pentru intervalul de încredere
    if (updatePredictiiCantitatiDto.intervalIncredereMin !== undefined) {
      updateData.limitaInferioara = updatePredictiiCantitatiDto.intervalIncredereMin;
    }

    if (updatePredictiiCantitatiDto.intervalIncredereMax !== undefined) {
      updateData.limitaSuperioara = updatePredictiiCantitatiDto.intervalIncredereMax;
    }

    // Conversie date din string în Date
    if (updatePredictiiCantitatiDto.dataPredictie) {
      updateData.dataPredictie = new Date(updatePredictiiCantitatiDto.dataPredictie);
    }

    if (updatePredictiiCantitatiDto.perioadaStart) {
      updateData.perioadaStart = new Date(updatePredictiiCantitatiDto.perioadaStart);
    }

    if (updatePredictiiCantitatiDto.perioadaEnd) {
      updateData.perioadaEnd = new Date(updatePredictiiCantitatiDto.perioadaEnd);
    }

    Object.assign(predictiiCantitati, updateData);
    return this.predictiiCantitatiRepository.save(predictiiCantitati);
  }

  async remove(id: string): Promise<void> {
    const predictiiCantitati = await this.findOne(id);
    await this.predictiiCantitatiRepository.remove(predictiiCantitati);
  }
}
