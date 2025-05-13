import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../entities/contract.entity';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { ClientService } from '../../clients/services/client.service';

// Interfață pentru datele de actualizare
interface UpdateData {
  clientId?: string;
  numarContract?: string;
  dataInceput?: Date;
  dataSfarsit?: Date;
  valoare?: number;
  moneda?: string;
  status?: string;
  detalii?: string;
}

@Injectable()
export class ContractService {
  constructor(
    @InjectRepository(Contract)
    private contractRepository: Repository<Contract>,
    private clientService: ClientService,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    // Verificare dacă clientul există
    await this.clientService.findOne(createContractDto.clientId);

    // Verificare dacă există deja un contract cu același număr
    const existingByNumber = await this.contractRepository.findOne({
      where: { numarContract: createContractDto.numarContract },
    });
    if (existingByNumber) {
      throw new ConflictException(
        `Există deja un contract cu numărul ${createContractDto.numarContract}`,
      );
    }

    // Setare valori implicite
    if (!createContractDto.moneda) {
      createContractDto.moneda = 'RON';
    }

    if (!createContractDto.status) {
      createContractDto.status = 'active';
    }

    // Creăm un obiect nou pentru contract
    const contract = new Contract();

    // Copiem proprietățile din DTO
    contract.clientId = createContractDto.clientId;
    contract.numarContract = createContractDto.numarContract;
    contract.dataInceput = new Date(createContractDto.dataInceput);
    contract.dataSfarsit = createContractDto.dataSfarsit
      ? new Date(createContractDto.dataSfarsit)
      : null;
    contract.valoare = createContractDto.valoare || null;
    contract.moneda = createContractDto.moneda || 'RON';
    contract.status = createContractDto.status || 'active';
    contract.detalii = createContractDto.detalii || null;

    // Salvăm contractul
    return this.contractRepository.save(contract);
  }

  async findAll(): Promise<Contract[]> {
    return this.contractRepository.find({
      relations: ['client'],
      order: {
        numarContract: 'ASC',
      },
    });
  }

  async findByClient(clientId: string): Promise<Contract[]> {
    return this.contractRepository.find({
      where: { clientId },
      relations: ['client', 'serviciiContractate'],
      order: {
        dataInceput: 'DESC',
      },
    });
  }

  async findActive(): Promise<Contract[]> {
    return this.contractRepository.find({
      where: { status: 'active' },
      relations: ['client'],
      order: {
        dataInceput: 'DESC',
      },
    });
  }

  async findByNumber(numarContract: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { numarContract },
      relations: ['client', 'serviciiContractate', 'serviciiContractate.serviciu'],
    });

    if (!contract) {
      throw new NotFoundException(`Contractul cu numărul ${numarContract} nu a fost găsit`);
    }

    return contract;
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractRepository.findOne({
      where: { id },
      relations: ['client', 'serviciiContractate', 'serviciiContractate.serviciu'],
    });

    if (!contract) {
      throw new NotFoundException(`Contractul cu ID-ul ${id} nu a fost găsit`);
    }

    return contract;
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const contract = await this.findOne(id);

    // Verificare dacă clientul există
    if (updateContractDto.clientId) {
      await this.clientService.findOne(updateContractDto.clientId);
    }

    // Verificare dacă există deja un contract cu același număr
    if (
      updateContractDto.numarContract &&
      updateContractDto.numarContract !== contract.numarContract
    ) {
      const existingByNumber = await this.contractRepository.findOne({
        where: { numarContract: updateContractDto.numarContract },
      });
      if (existingByNumber && existingByNumber.id !== id) {
        throw new ConflictException(
          `Există deja un contract cu numărul ${updateContractDto.numarContract}`,
        );
      }
    }

    // Pregătire date pentru actualizare
    const updateData: UpdateData = {
      clientId: updateContractDto.clientId,
      numarContract: updateContractDto.numarContract,
      valoare: updateContractDto.valoare,
      moneda: updateContractDto.moneda,
      status: updateContractDto.status,
      detalii: updateContractDto.detalii,
    };

    // Conversie date din string în Date
    if (updateContractDto.dataInceput) {
      updateData.dataInceput = new Date(updateContractDto.dataInceput);
    }

    if (updateContractDto.dataSfarsit) {
      updateData.dataSfarsit = new Date(updateContractDto.dataSfarsit);
    }

    Object.assign(contract, updateData);
    return this.contractRepository.save(contract);
  }

  async remove(id: string): Promise<void> {
    const contract = await this.findOne(id);
    await this.contractRepository.remove(contract);
  }
}
