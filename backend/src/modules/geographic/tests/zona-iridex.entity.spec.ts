import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZonaIridex } from '../entities/zona-iridex.entity';
import { ZoneIridexService } from '../services/zone-iridex.service';
import { CreateZonaIridexDto } from '../dto/create-zona-iridex.dto';
import { UpdateZonaIridexDto } from '../dto/update-zona-iridex.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('ZoneIridexService', () => {
  let service: ZoneIridexService;
  let repository: MockRepository<ZonaIridex>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZoneIridexService,
        {
          provide: getRepositoryToken(ZonaIridex),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ZoneIridexService>(ZoneIridexService);
    repository = module.get<MockRepository<ZonaIridex>>(getRepositoryToken(ZonaIridex));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new zona Iridex', async () => {
      const createZonaIridexDto: CreateZonaIridexDto = {
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
      };

      const zonaIridex = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createZonaIridexDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.create.mockReturnValue(zonaIridex);
      repository.save.mockResolvedValue(zonaIridex);

      const result = await service.create(createZonaIridexDto);
      expect(result).toEqual(zonaIridex);
      expect(repository.create).toHaveBeenCalledWith(createZonaIridexDto);
      expect(repository.save).toHaveBeenCalledWith(zonaIridex);
    });

    it('should throw ConflictException if zona Iridex with same name exists', async () => {
      const createZonaIridexDto: CreateZonaIridexDto = {
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
      };

      const existingZonaIridex = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(existingZonaIridex);

      await expect(service.create(createZonaIridexDto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if zona Iridex with same cod exists', async () => {
      const createZonaIridexDto: CreateZonaIridexDto = {
        nume: 'Zona Iridex 2',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri reciclabile',
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      });

      await expect(service.create(createZonaIridexDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of zone Iridex', async () => {
      const zoneIridex = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Zona Iridex 1',
          cod: 'IR-01',
          descriere: 'Zona Iridex pentru colectare deșeuri menajere',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
      ];

      repository.find.mockResolvedValue(zoneIridex);

      const result = await service.findAll();
      expect(result).toEqual(zoneIridex);
      expect(repository.find).toHaveBeenCalledWith({
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a zona Iridex by id', async () => {
      const zonaIridex = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(zonaIridex);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(zonaIridex);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['uaturi'],
      });
    });

    it('should throw NotFoundException if zona Iridex not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a zona Iridex', async () => {
      const updateZonaIridexDto: UpdateZonaIridexDto = {
        nume: 'Zona Iridex 1 Actualizată',
      };

      const zonaIridex = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      const updatedZonaIridex = {
        ...zonaIridex,
        nume: 'Zona Iridex 1 Actualizată',
      };

      repository.findOne.mockResolvedValueOnce(zonaIridex);
      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.save.mockResolvedValue(updatedZonaIridex);

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174000',
        updateZonaIridexDto,
      );
      expect(result).toEqual(updatedZonaIridex);
      expect(repository.save).toHaveBeenCalledWith(updatedZonaIridex);
    });
  });

  describe('remove', () => {
    it('should remove a zona Iridex', async () => {
      const zonaIridex = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(zonaIridex);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(zonaIridex);
    });
  });
});
