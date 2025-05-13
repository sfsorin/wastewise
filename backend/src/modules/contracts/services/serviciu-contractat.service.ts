import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiciuContractat } from '../entities/serviciu-contractat.entity';
import { CreateServiciuContractatDto } from '../dto/create-serviciu-contractat.dto';
import { UpdateServiciuContractatDto } from '../dto/update-serviciu-contractat.dto';
import { ContractService } from './contract.service';
import { ServiciuService } from './serviciu.service';

@Injectable()
export class ServiciuContractatService {
  constructor(
    @InjectRepository(ServiciuContractat)
    private serviciuContractatRepository: Repository<ServiciuContractat>,
    private contractService: ContractService,
    private serviciuService: ServiciuService,
  ) {}

  async create(
    createServiciuContractatDto: CreateServiciuContractatDto,
  ): Promise<ServiciuContractat> {
    // Verificare dacă contractul există
    await this.contractService.findOne(createServiciuContractatDto.contractId);

    // Verificare dacă serviciul există
    await this.serviciuService.findOne(createServiciuContractatDto.serviciuId);

    // Setare discount implicit dacă nu este furnizat
    if (createServiciuContractatDto.discount === undefined) {
      createServiciuContractatDto.discount = 0;
    }

    const serviciuContractat = this.serviciuContractatRepository.create(
      createServiciuContractatDto,
    );
    return this.serviciuContractatRepository.save(serviciuContractat);
  }

  async findAll(): Promise<ServiciuContractat[]> {
    return this.serviciuContractatRepository.find({
      relations: ['contract', 'serviciu'],
    });
  }

  async findByContract(contractId: string): Promise<ServiciuContractat[]> {
    return this.serviciuContractatRepository.find({
      where: { contractId },
      relations: ['contract', 'serviciu'],
    });
  }

  async findByServiciu(serviciuId: string): Promise<ServiciuContractat[]> {
    return this.serviciuContractatRepository.find({
      where: { serviciuId },
      relations: ['contract', 'serviciu'],
    });
  }

  async findOne(id: string): Promise<ServiciuContractat> {
    const serviciuContractat = await this.serviciuContractatRepository.findOne({
      where: { id },
      relations: ['contract', 'serviciu'],
    });

    if (!serviciuContractat) {
      throw new NotFoundException(`Serviciul contractat cu ID-ul ${id} nu a fost găsit`);
    }

    return serviciuContractat;
  }

  async update(
    id: string,
    updateServiciuContractatDto: UpdateServiciuContractatDto,
  ): Promise<ServiciuContractat> {
    const serviciuContractat = await this.findOne(id);

    // Verificare dacă contractul există
    if (updateServiciuContractatDto.contractId) {
      await this.contractService.findOne(updateServiciuContractatDto.contractId);
    }

    // Verificare dacă serviciul există
    if (updateServiciuContractatDto.serviciuId) {
      await this.serviciuService.findOne(updateServiciuContractatDto.serviciuId);
    }

    Object.assign(serviciuContractat, updateServiciuContractatDto);
    return this.serviciuContractatRepository.save(serviciuContractat);
  }

  async remove(id: string): Promise<void> {
    const serviciuContractat = await this.findOne(id);
    await this.serviciuContractatRepository.remove(serviciuContractat);
  }
}
