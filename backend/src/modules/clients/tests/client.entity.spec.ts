import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { ClientService } from '../services/client.service';
import { TipClientService } from '../services/tip-client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('ClientService', () => {
  let service: ClientService;
  let repository: MockRepository<Client>;
  let tipClientService: TipClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientService,
        {
          provide: TipClientService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Client),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ClientService>(ClientService);
    repository = module.get<MockRepository<Client>>(getRepositoryToken(Client));
    tipClientService = module.get<TipClientService>(TipClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new client', async () => {
      const createClientDto: CreateClientDto = {
        nume: 'SC Example SRL',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cui: 'RO12345678',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'contact@example.com',
        telefon: '+40712345678',
      };

      const client = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createClientDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        tipClient: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Persoană Juridică',
          descriere: 'Client persoană juridică',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        judet: null,
        localitate: null,
        puncteColectare: [],
        contracte: [],
        predictiiCantitati: [],
      };

      jest.spyOn(tipClientService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Juridică',
        descriere: 'Client persoană juridică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      });

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(client);
      repository.save.mockResolvedValue(client);

      const result = await service.create(createClientDto);
      expect(result).toEqual(client);
      expect(tipClientService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.create).toHaveBeenCalledWith(createClientDto);
      expect(repository.save).toHaveBeenCalledWith(client);
    });

    it('should throw ConflictException if client with same CUI exists', async () => {
      const createClientDto: CreateClientDto = {
        nume: 'SC Example SRL',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cui: 'RO12345678',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'contact@example.com',
        telefon: '+40712345678',
      };

      jest.spyOn(tipClientService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Juridică',
        descriere: 'Client persoană juridică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      });

      repository.findOne.mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'SC Example SRL',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cui: 'RO12345678',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'contact@example.com',
        telefon: '+40712345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createClientDto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if client with same CNP exists', async () => {
      const createClientDto: CreateClientDto = {
        nume: 'John Doe',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cnp: '1234567890123',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'john.doe@example.com',
        telefon: '+40712345678',
      };

      jest.spyOn(tipClientService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      });

      repository.findOne.mockResolvedValueOnce(null); // pentru CUI
      repository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'John Doe',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cnp: '1234567890123',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'john.doe@example.com',
        telefon: '+40712345678',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createClientDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      const clients = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'SC Example SRL',
          tipClientId: '123e4567-e89b-12d3-a456-426614174000',
          cui: 'RO12345678',
          adresa: 'Str. Exemplu, Nr. 123',
          email: 'contact@example.com',
          telefon: '+40712345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          tipClient: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Persoană Juridică',
            descriere: 'Client persoană juridică',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          judet: null,
          localitate: null,
          puncteColectare: [],
          contracte: [],
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(clients);

      const result = await service.findAll();
      expect(result).toEqual(clients);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['tipClient', 'judet', 'localitate'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findByTipClient', () => {
    it('should return clients by tipClientId', async () => {
      const clients = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'SC Example SRL',
          tipClientId: '123e4567-e89b-12d3-a456-426614174000',
          cui: 'RO12345678',
          adresa: 'Str. Exemplu, Nr. 123',
          email: 'contact@example.com',
          telefon: '+40712345678',
          createdAt: new Date(),
          updatedAt: new Date(),
          tipClient: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Persoană Juridică',
            descriere: 'Client persoană juridică',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          judet: null,
          localitate: null,
          puncteColectare: [],
          contracte: [],
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(clients);

      const result = await service.findByTipClient('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(clients);
      expect(repository.find).toHaveBeenCalledWith({
        where: { tipClientId: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['tipClient', 'judet', 'localitate'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a client by id', async () => {
      const client = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'SC Example SRL',
        tipClientId: '123e4567-e89b-12d3-a456-426614174000',
        cui: 'RO12345678',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'contact@example.com',
        telefon: '+40712345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        tipClient: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Persoană Juridică',
          descriere: 'Client persoană juridică',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        judet: null,
        localitate: null,
        puncteColectare: [],
        contracte: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(client);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(client);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: ['tipClient', 'judet', 'localitate', 'puncteColectare', 'contracte'],
      });
    });

    it('should throw NotFoundException if client not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
