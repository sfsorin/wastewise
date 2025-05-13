import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PunctColectare } from '../entities/punct-colectare.entity';
import { PunctColectareService } from '../services/punct-colectare.service';
import { JudeteService } from '../../geographic/services/judete.service';
import { LocalitatiService } from '../../geographic/services/localitati.service';
import { ClientService } from '../../clients/services/client.service';
import { CreatePunctColectareDto } from '../dto/create-punct-colectare.dto';
import { UpdatePunctColectareDto } from '../dto/update-punct-colectare.dto';
import { NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('PunctColectareService', () => {
  let service: PunctColectareService;
  let repository: MockRepository<PunctColectare>;
  let judeteService: JudeteService;
  let localitatiService: LocalitatiService;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PunctColectareService,
        {
          provide: JudeteService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: LocalitatiService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ClientService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(PunctColectare),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<PunctColectareService>(PunctColectareService);
    repository = module.get<MockRepository<PunctColectare>>(getRepositoryToken(PunctColectare));
    judeteService = module.get<JudeteService>(JudeteService);
    localitatiService = module.get<LocalitatiService>(LocalitatiService);
    clientService = module.get<ClientService>(ClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new punct colectare', async () => {
      const createPunctColectareDto: CreatePunctColectareDto = {
        nume: 'Punct Colectare Centru',
        adresa: 'Str. Exemplu, Nr. 123',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        localitateId: '123e4567-e89b-12d3-a456-426614174001',
        clientId: '123e4567-e89b-12d3-a456-426614174002',
        latitudine: 46.0688,
        longitudine: 23.5702,
        program: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
      };

      const punctColectare = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        ...createPunctColectareDto,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        judet: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Alba',
          codSiruta: '1',
          codAuto: 'AB',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        localitate: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          tip: 'municipiu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        client: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'SC Example SRL',
          tipClientId: '123e4567-e89b-12d3-a456-426614174004',
          cui: 'RO12345678',
          adresa: 'Str. Exemplu, Nr. 123',
          email: 'contact@example.com',
          telefon: '+40712345678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        predictiiCantitati: [],
      };

      jest.spyOn(judeteService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      });

      jest.spyOn(localitatiService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
        createdAt: new Date(),
        updatedAt: new Date(),
        judet: null,
        puncteColectare: [],
        clienti: [],
      });

      jest.spyOn(clientService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174002',
        nume: 'SC Example SRL',
        tipClientId: '123e4567-e89b-12d3-a456-426614174004',
        cui: 'RO12345678',
        adresa: 'Str. Exemplu, Nr. 123',
        email: 'contact@example.com',
        telefon: '+40712345678',
        createdAt: new Date(),
        updatedAt: new Date(),
        tipClient: null,
        judet: null,
        localitate: null,
        puncteColectare: [],
        contracte: [],
        predictiiCantitati: [],
      });

      repository.create.mockReturnValue(punctColectare);
      repository.save.mockResolvedValue(punctColectare);

      const result = await service.create(createPunctColectareDto);
      expect(result).toEqual(punctColectare);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(localitatiService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174001');
      expect(clientService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174002');
      expect(repository.create).toHaveBeenCalledWith({
        ...createPunctColectareDto,
        status: 'active',
      });
      expect(repository.save).toHaveBeenCalledWith(punctColectare);
    });
  });

  describe('findAll', () => {
    it('should return an array of puncte colectare', async () => {
      const puncteColectare = [
        {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Punct Colectare Centru',
          adresa: 'Str. Exemplu, Nr. 123',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          localitateId: '123e4567-e89b-12d3-a456-426614174001',
          clientId: '123e4567-e89b-12d3-a456-426614174002',
          latitudine: 46.0688,
          longitudine: 23.5702,
          program: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          judet: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Alba',
            codSiruta: '1',
            codAuto: 'AB',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          localitate: {
            id: '123e4567-e89b-12d3-a456-426614174001',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            codSiruta: '1001',
            tip: 'municipiu',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          client: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'SC Example SRL',
            tipClientId: '123e4567-e89b-12d3-a456-426614174004',
            cui: 'RO12345678',
            adresa: 'Str. Exemplu, Nr. 123',
            email: 'contact@example.com',
            telefon: '+40712345678',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(puncteColectare);

      const result = await service.findAll();
      expect(result).toEqual(puncteColectare);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['client', 'judet', 'localitate'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findByClient', () => {
    it('should return puncte colectare by clientId', async () => {
      const puncteColectare = [
        {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Punct Colectare Centru',
          adresa: 'Str. Exemplu, Nr. 123',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          localitateId: '123e4567-e89b-12d3-a456-426614174001',
          clientId: '123e4567-e89b-12d3-a456-426614174002',
          latitudine: 46.0688,
          longitudine: 23.5702,
          program: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
          status: 'active',
          createdAt: new Date(),
          updatedAt: new Date(),
          judet: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Alba',
            codSiruta: '1',
            codAuto: 'AB',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          localitate: {
            id: '123e4567-e89b-12d3-a456-426614174001',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            codSiruta: '1001',
            tip: 'municipiu',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          client: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'SC Example SRL',
            tipClientId: '123e4567-e89b-12d3-a456-426614174004',
            cui: 'RO12345678',
            adresa: 'Str. Exemplu, Nr. 123',
            email: 'contact@example.com',
            telefon: '+40712345678',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(puncteColectare);

      const result = await service.findByClient('123e4567-e89b-12d3-a456-426614174002');
      expect(result).toEqual(puncteColectare);
      expect(repository.find).toHaveBeenCalledWith({
        where: { clientId: '123e4567-e89b-12d3-a456-426614174002' },
        relations: ['client', 'judet', 'localitate'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a punct colectare by id', async () => {
      const punctColectare = {
        id: '123e4567-e89b-12d3-a456-426614174003',
        nume: 'Punct Colectare Centru',
        adresa: 'Str. Exemplu, Nr. 123',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        localitateId: '123e4567-e89b-12d3-a456-426614174001',
        clientId: '123e4567-e89b-12d3-a456-426614174002',
        latitudine: 46.0688,
        longitudine: 23.5702,
        program: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
        judet: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Alba',
          codSiruta: '1',
          codAuto: 'AB',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        localitate: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          tip: 'municipiu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        client: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'SC Example SRL',
          tipClientId: '123e4567-e89b-12d3-a456-426614174004',
          cui: 'RO12345678',
          adresa: 'Str. Exemplu, Nr. 123',
          email: 'contact@example.com',
          telefon: '+40712345678',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(punctColectare);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174003');
      expect(result).toEqual(punctColectare);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174003' },
        relations: ['client', 'judet', 'localitate'],
      });
    });

    it('should throw NotFoundException if punct colectare not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne('123e4567-e89b-12d3-a456-426614174003'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
