import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Judet } from '../entities/judet.entity';
import { JudeteService } from '../services/judete.service';
import { CreateJudetDto } from '../dto/create-judet.dto';
import { UpdateJudetDto } from '../dto/update-judet.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('JudeteService', () => {
  let service: JudeteService;
  let repository: MockRepository<Judet>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JudeteService,
        {
          provide: getRepositoryToken(Judet),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<JudeteService>(JudeteService);
    repository = module.get<MockRepository<Judet>>(getRepositoryToken(Judet));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new judet', async () => {
      const createJudetDto: CreateJudetDto = {
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
      };

      const judet = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createJudetDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.create.mockReturnValue(judet);
      repository.save.mockResolvedValue(judet);

      const result = await service.create(createJudetDto);
      expect(result).toEqual(judet);
      expect(repository.create).toHaveBeenCalledWith(createJudetDto);
      expect(repository.save).toHaveBeenCalledWith(judet);
    });

    it('should throw ConflictException if judet with same codSiruta exists', async () => {
      const createJudetDto: CreateJudetDto = {
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
      };

      const existingJudet = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      };

      repository.findOne.mockResolvedValueOnce(existingJudet);

      await expect(service.create(createJudetDto)).rejects.toThrow(ConflictException);
    });

    it('should throw ConflictException if judet with same codAuto exists', async () => {
      const createJudetDto: CreateJudetDto = {
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '2',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      });

      await expect(service.create(createJudetDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of judete', async () => {
      const judete = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Alba',
          codSiruta: '1',
          codAuto: 'AB',
          createdAt: new Date(),
          updatedAt: new Date(),
          localitati: [],
          uaturi: [],
        },
      ];

      repository.find.mockResolvedValue(judete);

      const result = await service.findAll();
      expect(result).toEqual(judete);
      expect(repository.find).toHaveBeenCalledWith({
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a judet by id', async () => {
      const judet = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(judet);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(judet);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['localitati', 'uaturi'],
      });
    });

    it('should throw NotFoundException if judet not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a judet', async () => {
      const updateJudetDto: UpdateJudetDto = {
        nume: 'Alba Updated',
      };

      const judet = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      };

      const updatedJudet = {
        ...judet,
        nume: 'Alba Updated',
      };

      repository.findOne.mockResolvedValueOnce(judet);
      repository.save.mockResolvedValue(updatedJudet);

      const result = await service.update('123e4567-e89b-12d3-a456-426614174000', updateJudetDto);
      expect(result).toEqual(updatedJudet);
      expect(repository.save).toHaveBeenCalledWith(updatedJudet);
    });
  });

  describe('remove', () => {
    it('should remove a judet', async () => {
      const judet = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Alba',
        codSiruta: '1',
        codAuto: 'AB',
        createdAt: new Date(),
        updatedAt: new Date(),
        localitati: [],
        uaturi: [],
      };

      repository.findOne.mockResolvedValue(judet);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(judet);
    });
  });
});
