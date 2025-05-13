import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UAT } from '../entities/uat.entity';
import { UATService } from '../services/uat.service';
import { JudeteService } from '../services/judete.service';
import { LocalitatiService } from '../services/localitati.service';
import { CreateUATDto } from '../dto/create-uat.dto';
import { UpdateUATDto } from '../dto/update-uat.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('UATService', () => {
  let service: UATService;
  let repository: MockRepository<UAT>;
  let judeteService: JudeteService;
  let localitatiService: LocalitatiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UATService,
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
          provide: getRepositoryToken(UAT),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<UATService>(UATService);
    repository = module.get<MockRepository<UAT>>(getRepositoryToken(UAT));
    judeteService = module.get<JudeteService>(JudeteService);
    localitatiService = module.get<LocalitatiService>(LocalitatiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new UAT', async () => {
      const createUATDto: CreateUATDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        populatie: 74000,
        suprafata: 103.65,
        strada: 'Calea Moților',
        numar: '5A',
        telefon: '+40258123456',
        telefonSecundar: '+40258123457',
        email: 'contact@primaria-albaiulia.ro',
        emailSecundar: 'secretariat@primaria-albaiulia.ro',
        codFiscal: '4562983',
        primar: 'Ion Popescu',
      };

      const uat = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createUATDto,
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
        localitate: null,
        dateIstorice: [],
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

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(uat);
      repository.save.mockResolvedValue(uat);

      const result = await service.create(createUATDto);
      expect(result).toEqual(uat);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.create).toHaveBeenCalledWith(createUATDto);
      expect(repository.save).toHaveBeenCalledWith(uat);
    });

    it('should create a new UAT with localitate', async () => {
      const createUATDto: CreateUATDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        localitateId: '123e4567-e89b-12d3-a456-426614174002',
        codSiruta: '1001',
      };

      const uat = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createUATDto,
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
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          tip: 'municipiu',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        dateIstorice: [],
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
        id: '123e4567-e89b-12d3-a456-426614174002',
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

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(uat);
      repository.save.mockResolvedValue(uat);

      const result = await service.create(createUATDto);
      expect(result).toEqual(uat);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(localitatiService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174002');
      expect(repository.create).toHaveBeenCalledWith(createUATDto);
      expect(repository.save).toHaveBeenCalledWith(uat);
    });

    it('should throw ConflictException if UAT with same codSiruta exists', async () => {
      const createUATDto: CreateUATDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
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

      repository.findOne.mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createUATDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of UATs', async () => {
      const uats = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
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
          localitate: null,
          dateIstorice: [],
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(uats);

      const result = await service.findAll();
      expect(result).toEqual(uats);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['judet', 'localitate'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a UAT by id', async () => {
      const uat = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
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
        localitate: null,
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(uat);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(uat);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: ['judet', 'localitate', 'dateIstorice', 'predictiiCantitati'],
      });
    });

    it('should throw NotFoundException if UAT not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne('123e4567-e89b-12d3-a456-426614174001'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
