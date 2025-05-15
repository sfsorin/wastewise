import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PunctColectare } from '../entities/punct-colectare.entity';
import { CreatePunctColectareDto } from '../dto/create-punct-colectare.dto';
import { UpdatePunctColectareDto } from '../dto/update-punct-colectare.dto';
import { JudeteService } from '../../geographic/services/judete.service';
import { LocalitatiService } from '../../geographic/services/localitati.service';
import { ClientService } from '../../entities/services/client.service';

@Injectable()
export class PunctColectareService {
  constructor(
    @InjectRepository(PunctColectare)
    private punctColectareRepository: Repository<PunctColectare>,
    private judeteService: JudeteService,
    private localitatiService: LocalitatiService,
    private clientService: ClientService,
  ) {}

  async create(createPunctColectareDto: CreatePunctColectareDto): Promise<PunctColectare> {
    // Verificare dacă județul există
    if (createPunctColectareDto.judetId) {
      await this.judeteService.findOne(createPunctColectareDto.judetId);
    }

    // Verificare dacă localitatea există
    if (createPunctColectareDto.localitateId) {
      await this.localitatiService.findOne(createPunctColectareDto.localitateId);
    }

    // Verificare dacă clientul există
    if (createPunctColectareDto.clientId) {
      await this.clientService.findOne(createPunctColectareDto.clientId);
    }

    // Setare status implicit dacă nu este furnizat
    if (!createPunctColectareDto.status) {
      createPunctColectareDto.status = 'active';
    }

    const punctColectare = this.punctColectareRepository.create(createPunctColectareDto);
    return this.punctColectareRepository.save(punctColectare);
  }

  async findAll(): Promise<PunctColectare[]> {
    return this.punctColectareRepository.find({
      relations: ['client', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByClient(clientId: string): Promise<PunctColectare[]> {
    return this.punctColectareRepository.find({
      where: { clientId },
      relations: ['client', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByLocalitate(localitateId: string): Promise<PunctColectare[]> {
    return this.punctColectareRepository.find({
      where: { localitateId },
      relations: ['client', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByJudet(judetId: string): Promise<PunctColectare[]> {
    return this.punctColectareRepository.find({
      where: { judetId },
      relations: ['client', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<PunctColectare> {
    const punctColectare = await this.punctColectareRepository.findOne({
      where: { id },
      relations: ['client', 'judet', 'localitate', 'predictiiCantitati'],
    });

    if (!punctColectare) {
      throw new NotFoundException(`Punctul de colectare cu ID-ul ${id} nu a fost găsit`);
    }

    return punctColectare;
  }

  async update(
    id: string,
    updatePunctColectareDto: UpdatePunctColectareDto,
  ): Promise<PunctColectare> {
    const punctColectare = await this.findOne(id);

    // Verificare dacă județul există
    if (updatePunctColectareDto.judetId) {
      await this.judeteService.findOne(updatePunctColectareDto.judetId);
    }

    // Verificare dacă localitatea există
    if (updatePunctColectareDto.localitateId) {
      await this.localitatiService.findOne(updatePunctColectareDto.localitateId);
    }

    // Verificare dacă clientul există
    if (updatePunctColectareDto.clientId) {
      await this.clientService.findOne(updatePunctColectareDto.clientId);
    }

    Object.assign(punctColectare, updatePunctColectareDto);
    return this.punctColectareRepository.save(punctColectare);
  }

  async remove(id: string): Promise<void> {
    const punctColectare = await this.findOne(id);
    await this.punctColectareRepository.remove(punctColectare);
  }
}
