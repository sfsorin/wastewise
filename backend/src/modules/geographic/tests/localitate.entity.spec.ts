import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Localitate } from '../entities/localitate.entity';
import { LocalitatiService } from '../services/localitati.service';
import { JudeteService } from '../services/judete.service';
import { CreateLocalitateDto } from '../dto/create-localitate.dto';
import { UpdateLocalitateDto } from '../dto/update-localitate.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { createMockRepository, MockRepository } from '../../../shared/testing/repository.mock';

describe('LocalitatiService', () => {
  let service: LocalitatiService;
  let repository: MockRepository<Localitate>;
  let judeteService: JudeteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocalitatiService,
        {
          provide: JudeteService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Localitate),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<LocalitatiService>(LocalitatiService);
    repository = module.get<MockRepository<Localitate>>(getRepositoryToken(Localitate));
    judeteService = module.get<JudeteService>(JudeteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new localitate', async () => {
      const createLocalitateDto: CreateLocalitateDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
      };

      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createLocalitateDto,
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
        puncteColectare: [],
        clienti: [],
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
      repository.create.mockReturnValue(localitate);
      repository.save.mockResolvedValue(localitate);

      const result = await service.create(createLocalitateDto);
      expect(result).toEqual(localitate);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.create).toHaveBeenCalledWith(createLocalitateDto);
      expect(repository.save).toHaveBeenCalledWith(localitate);
    });

    it('should throw ConflictException if localitate with same codSiruta exists', async () => {
      const createLocalitateDto: CreateLocalitateDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
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
        tip: 'municipiu',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createLocalitateDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of localitati', async () => {
      const localitati = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          tip: 'municipiu',
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
          puncteColectare: [],
          clienti: [],
        },
      ];

      repository.find.mockResolvedValue(localitati);

      const result = await service.findAll();
      expect(result).toEqual(localitati);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['judet'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findByJudet', () => {
    it('should return localitati by judetId', async () => {
      const localitati = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          tip: 'municipiu',
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
          puncteColectare: [],
          clienti: [],
        },
      ];

      repository.find.mockResolvedValue(localitati);

      const result = await service.findByJudet('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(localitati);
      expect(repository.find).toHaveBeenCalledWith({
        where: { judetId: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['judet'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a localitate by id', async () => {
      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
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
        puncteColectare: [],
        clienti: [],
      };

      repository.findOne.mockResolvedValue(localitate);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(localitate);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: ['judet', 'puncteColectare', 'clienti'],
      });
    });

    it('should throw NotFoundException if localitate not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a localitate', async () => {
      const updateLocalitateDto: UpdateLocalitateDto = {
        nume: 'Alba Iulia Updated',
      };

      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
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
        puncteColectare: [],
        clienti: [],
      };

      const updatedLocalitate = {
        ...localitate,
        nume: 'Alba Iulia Updated',
      };

      repository.findOne.mockResolvedValue(localitate);
      repository.save.mockResolvedValue(updatedLocalitate);

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174001',
        updateLocalitateDto,
      );
      expect(result).toEqual(updatedLocalitate);
      expect(repository.save).toHaveBeenCalledWith(updatedLocalitate);
    });
  });

  describe('remove', () => {
    it('should remove a localitate', async () => {
      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        codSiruta: '1001',
        tip: 'municipiu',
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
        puncteColectare: [],
        clienti: [],
      };

      repository.findOne.mockResolvedValue(localitate);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174001');
      expect(repository.remove).toHaveBeenCalledWith(localitate);
    });
  });
});
