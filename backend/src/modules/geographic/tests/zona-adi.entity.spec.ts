import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ZonaADI } from '../entities/zona-adi.entity';
import { ZoneADIService } from '../services/zone-adi.service';
import { CreateZonaADIDto } from '../dto/create-zona-adi.dto';
import { UpdateZonaADIDto } from '../dto/update-zona-adi.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

// Definim tipul MockRepository
type MockRepository = {
  find: jest.Mock;
  findOne: jest.Mock;
  create: jest.Mock;
  save: jest.Mock;
  remove: jest.Mock;
};
const createMockRepository = (): MockRepository => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('ZoneADIService', () => {
  let service: ZoneADIService;
  let repository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ZoneADIService,
        {
          provide: getRepositoryToken(ZonaADI),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ZoneADIService>(ZoneADIService);
    repository = module.get(getRepositoryToken(ZonaADI));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new zona ADI', async () => {
      const createZonaADIDto: CreateZonaADIDto = {
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
      };

      const zonaADI = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createZonaADIDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.create.mockReturnValue(zonaADI);
      repository.save.mockResolvedValue(zonaADI);

      const result = await service.create(createZonaADIDto);
      expect(result).toEqual(zonaADI);
      expect(repository.create).toHaveBeenCalledWith(createZonaADIDto);
      expect(repository.save).toHaveBeenCalledWith(zonaADI);
    });

    it('should throw ConflictException if zona ADI with same name exists', async () => {
      const createZonaADIDto: CreateZonaADIDto = {
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
      };

      const existingZonaADI = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(existingZonaADI);

      await expect(service.create(createZonaADIDto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if zona ADI with same cod exists', async () => {
      const createZonaADIDto: CreateZonaADIDto = {
        nume: 'Zona ADI Alba Nouă',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      });

      await expect(service.create(createZonaADIDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of zone ADI', async () => {
      const zoneADI = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Zona ADI Alba',
          cod: 'ADI-AB',
          descriere: 'Zona ADI pentru județul Alba',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
      ];

      repository.find.mockResolvedValue(zoneADI);

      const result = await service.findAll();
      expect(result).toEqual(zoneADI);
      expect(repository.find).toHaveBeenCalledWith({
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a zona ADI by id', async () => {
      const zonaADI = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(zonaADI);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(zonaADI);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['uaturi'],
      });
    });

    it('should throw NotFoundException if zona ADI not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a zona ADI', async () => {
      const updateZonaADIDto: UpdateZonaADIDto = {
        nume: 'Zona ADI Alba Actualizată',
      };

      const zonaADI = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      const updatedZonaADI = {
        ...zonaADI,
        nume: 'Zona ADI Alba Actualizată',
      };

      repository.findOne.mockResolvedValueOnce(zonaADI);
      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.save.mockResolvedValue(updatedZonaADI);

      const result = await service.update('123e4567-e89b-12d3-a456-426614174000', updateZonaADIDto);
      expect(result).toEqual(updatedZonaADI);
      expect(repository.save).toHaveBeenCalledWith(updatedZonaADI);
    });
  });

  describe('remove', () => {
    it('should remove a zona ADI', async () => {
      const zonaADI = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(zonaADI);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(zonaADI);
    });
  });
});
