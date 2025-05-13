import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategorieDeseuri } from '../entities/categorie-deseuri.entity';
import { CategorieDeseuriService } from '../services/categorie-deseuri.service';
import { CreateCategorieDeseuriDto } from '../dto/create-categorie-deseuri.dto';
import { UpdateCategorieDeseuriDto } from '../dto/update-categorie-deseuri.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('CategorieDeseuriService', () => {
  let service: CategorieDeseuriService;
  let repository: MockRepository<CategorieDeseuri>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategorieDeseuriService,
        {
          provide: getRepositoryToken(CategorieDeseuri),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<CategorieDeseuriService>(CategorieDeseuriService);
    repository = module.get<MockRepository<CategorieDeseuri>>(getRepositoryToken(CategorieDeseuri));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new categorie deseuri', async () => {
      const createCategorieDeseuriDto: CreateCategorieDeseuriDto = {
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
      };

      const categorieDeseuri = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createCategorieDeseuriDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.create.mockReturnValue(categorieDeseuri);
      repository.save.mockResolvedValue(categorieDeseuri);

      const result = await service.create(createCategorieDeseuriDto);
      expect(result).toEqual(categorieDeseuri);
      expect(repository.create).toHaveBeenCalledWith(createCategorieDeseuriDto);
      expect(repository.save).toHaveBeenCalledWith(categorieDeseuri);
    });

    it('should throw ConflictException if categorie deseuri with same name exists', async () => {
      const createCategorieDeseuriDto: CreateCategorieDeseuriDto = {
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
      };

      const existingCategorieDeseuri = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValueOnce(existingCategorieDeseuri);

      await expect(service.create(createCategorieDeseuriDto)).rejects.toThrow(
        ConflictException,
      );
    });

    it('should throw ConflictException if categorie deseuri with same codDeseu exists', async () => {
      const createCategorieDeseuriDto: CreateCategorieDeseuriDto = {
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
      };

      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere vechi',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      });

      await expect(service.create(createCategorieDeseuriDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of categorii deseuri', async () => {
      const categoriiDeseuri = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Deșeuri menajere',
          descriere: 'Deșeuri generate de activitățile casnice',
          codDeseu: '20 03 01',
          createdAt: new Date(),
          updatedAt: new Date(),
          dateIstorice: [],
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(categoriiDeseuri);

      const result = await service.findAll();
      expect(result).toEqual(categoriiDeseuri);
      expect(repository.find).toHaveBeenCalledWith({
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a categorie deseuri by id', async () => {
      const categorieDeseuri = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(categorieDeseuri);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(categorieDeseuri);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['dateIstorice', 'predictiiCantitati'],
      });
    });

    it('should throw NotFoundException if categorie deseuri not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.findOne('123e4567-e89b-12d3-a456-426614174000'),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a categorie deseuri', async () => {
      const updateCategorieDeseuriDto: UpdateCategorieDeseuriDto = {
        nume: 'Deșeuri menajere actualizate',
      };

      const categorieDeseuri = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      };

      const updatedCategorieDeseuri = {
        ...categorieDeseuri,
        nume: 'Deșeuri menajere actualizate',
      };

      repository.findOne.mockResolvedValueOnce(categorieDeseuri);
      repository.findOne.mockResolvedValueOnce(null);
      repository.findOne.mockResolvedValueOnce(null);
      repository.save.mockResolvedValue(updatedCategorieDeseuri);

      const result = await service.update('123e4567-e89b-12d3-a456-426614174000', updateCategorieDeseuriDto);
      expect(result).toEqual(updatedCategorieDeseuri);
      expect(repository.save).toHaveBeenCalledWith(updatedCategorieDeseuri);
    });
  });

  describe('remove', () => {
    it('should remove a categorie deseuri', async () => {
      const categorieDeseuri = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(categorieDeseuri);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(categorieDeseuri);
    });
  });
});
