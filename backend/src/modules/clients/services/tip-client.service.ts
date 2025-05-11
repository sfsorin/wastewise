import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipClient } from '../entities/tip-client.entity';
import { CreateTipClientDto } from '../dto/create-tip-client.dto';
import { UpdateTipClientDto } from '../dto/update-tip-client.dto';

@Injectable()
export class TipClientService {
  constructor(
    @InjectRepository(TipClient)
    private tipClientRepository: Repository<TipClient>,
  ) {}

  async create(createTipClientDto: CreateTipClientDto): Promise<TipClient> {
    // Verificare dacă există deja un tip de client cu același nume
    const existingByName = await this.tipClientRepository.findOne({
      where: { nume: createTipClientDto.nume },
    });
    if (existingByName) {
      throw new ConflictException(`Există deja un tip de client cu numele ${createTipClientDto.nume}`);
    }

    const tipClient = this.tipClientRepository.create(createTipClientDto);
    return this.tipClientRepository.save(tipClient);
  }

  async findAll(): Promise<TipClient[]> {
    return this.tipClientRepository.find({
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<TipClient> {
    const tipClient = await this.tipClientRepository.findOne({
      where: { id },
      relations: ['clienti'],
    });

    if (!tipClient) {
      throw new NotFoundException(`Tipul de client cu ID-ul ${id} nu a fost găsit`);
    }

    return tipClient;
  }

  async update(id: string, updateTipClientDto: UpdateTipClientDto): Promise<TipClient> {
    const tipClient = await this.findOne(id);

    // Verificare dacă există deja un tip de client cu același nume
    if (updateTipClientDto.nume && updateTipClientDto.nume !== tipClient.nume) {
      const existingByName = await this.tipClientRepository.findOne({
        where: { nume: updateTipClientDto.nume },
      });
      if (existingByName && existingByName.id !== id) {
        throw new ConflictException(`Există deja un tip de client cu numele ${updateTipClientDto.nume}`);
      }
    }

    Object.assign(tipClient, updateTipClientDto);
    return this.tipClientRepository.save(tipClient);
  }

  async remove(id: string): Promise<void> {
    const tipClient = await this.findOne(id);
    await this.tipClientRepository.remove(tipClient);
  }
}
