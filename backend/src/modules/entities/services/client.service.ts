import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { TipClientService } from './tip-client.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
    private tipClientService: TipClientService,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    // Verificare dacă tipul de client există
    await this.tipClientService.findOne(createClientDto.tipClientId);

    // Verificare dacă există deja un client cu același CUI sau CNP
    if (createClientDto.cui) {
      const existingByCui = await this.clientRepository.findOne({
        where: { cui: createClientDto.cui },
      });
      if (existingByCui) {
        throw new ConflictException(`Există deja un client cu CUI-ul ${createClientDto.cui}`);
      }
    }

    if (createClientDto.cnp) {
      const existingByCnp = await this.clientRepository.findOne({
        where: { cnp: createClientDto.cnp },
      });
      if (existingByCnp) {
        throw new ConflictException(`Există deja un client cu CNP-ul ${createClientDto.cnp}`);
      }
    }

    if (createClientDto.codClient) {
      const existingByCodClient = await this.clientRepository.findOne({
        where: { codClient: createClientDto.codClient },
      });
      if (existingByCodClient) {
        throw new ConflictException(`Există deja un client cu codul ${createClientDto.codClient}`);
      }
    }

    // Setare status implicit dacă nu este furnizat
    if (!createClientDto.status) {
      createClientDto.status = 'active';
    }

    const client = this.clientRepository.create(createClientDto);
    return this.clientRepository.save(client);
  }

  async findAll(): Promise<Client[]> {
    return this.clientRepository.find({
      relations: ['tipClient', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findByTipClient(tipClientId: string): Promise<Client[]> {
    return this.clientRepository.find({
      where: { tipClientId },
      relations: ['tipClient', 'judet', 'localitate'],
      order: {
        nume: 'ASC',
      },
    });
  }

  async findOne(id: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { id },
      relations: ['tipClient', 'judet', 'localitate', 'puncteColectare', 'contracte'],
    });

    if (!client) {
      throw new NotFoundException(`Clientul cu ID-ul ${id} nu a fost găsit`);
    }

    return client;
  }

  async findByCui(cui: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { cui },
      relations: ['tipClient', 'judet', 'localitate'],
    });

    if (!client) {
      throw new NotFoundException(`Clientul cu CUI-ul ${cui} nu a fost găsit`);
    }

    return client;
  }

  async findByCnp(cnp: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { cnp },
      relations: ['tipClient', 'judet', 'localitate'],
    });

    if (!client) {
      throw new NotFoundException(`Clientul cu CNP-ul ${cnp} nu a fost găsit`);
    }

    return client;
  }

  async findByCodClient(codClient: string): Promise<Client> {
    const client = await this.clientRepository.findOne({
      where: { codClient },
      relations: ['tipClient', 'judet', 'localitate'],
    });

    if (!client) {
      throw new NotFoundException(`Clientul cu codul ${codClient} nu a fost găsit`);
    }

    return client;
  }

  async update(id: string, updateClientDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    // Verificare dacă tipul de client există
    if (updateClientDto.tipClientId) {
      await this.tipClientService.findOne(updateClientDto.tipClientId);
    }

    // Verificare dacă există deja un client cu același CUI sau CNP
    if (updateClientDto.cui && updateClientDto.cui !== client.cui) {
      const existingByCui = await this.clientRepository.findOne({
        where: { cui: updateClientDto.cui },
      });
      if (existingByCui && existingByCui.id !== id) {
        throw new ConflictException(`Există deja un client cu CUI-ul ${updateClientDto.cui}`);
      }
    }

    if (updateClientDto.cnp && updateClientDto.cnp !== client.cnp) {
      const existingByCnp = await this.clientRepository.findOne({
        where: { cnp: updateClientDto.cnp },
      });
      if (existingByCnp && existingByCnp.id !== id) {
        throw new ConflictException(`Există deja un client cu CNP-ul ${updateClientDto.cnp}`);
      }
    }

    if (updateClientDto.codClient && updateClientDto.codClient !== client.codClient) {
      const existingByCodClient = await this.clientRepository.findOne({
        where: { codClient: updateClientDto.codClient },
      });
      if (existingByCodClient && existingByCodClient.id !== id) {
        throw new ConflictException(`Există deja un client cu codul ${updateClientDto.codClient}`);
      }
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    const client = await this.findOne(id);
    await this.clientRepository.remove(client);
  }
}
