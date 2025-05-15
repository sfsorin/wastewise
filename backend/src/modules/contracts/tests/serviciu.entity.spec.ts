import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Serviciu } from '../entities/serviciu.entity';
import { ServiciuService } from '../services/serviciu.service';
import { CategorieDeseuriService } from '../../operational/services/categorie-deseuri.service';
import { CreateServiciuDto } from '../dto/create-serviciu.dto';
import { UpdateServiciuDto } from '../dto/update-serviciu.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('ServiciuService', () => {
  let service: ServiciuService;
  let repository: MockRepository<Serviciu>;
  let categorieDeseuriService: CategorieDeseuriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiciuService,
        {
          provide: CategorieDeseuriService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Serviciu),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<ServiciuService>(ServiciuService);
    repository = module.get<MockRepository<Serviciu>>(getRepositoryToken(Serviciu));
    categorieDeseuriService = module.get<CategorieDeseuriService>(CategorieDeseuriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new serviciu', async () => {
      const createServiciuDto: CreateServiciuDto = {
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
        categorieId: '123e4567-e89b-12d3-a456-426614174000',
      };

      const serviciu = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        ...createServiciuDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        categorie: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Deșeuri menajere',
          descriere: 'Deșeuri generate de activitățile casnice',
          codDeseu: '20 03 01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        serviciiContractate: [],
      };

      jest.spyOn(categorieDeseuriService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Deșeuri menajere',
        descriere: 'Deșeuri generate de activitățile casnice',
        codDeseu: '20 03 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      });

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(serviciu);
      repository.save.mockResolvedValue(serviciu);

      const result = await service.create(createServiciuDto);
      expect(result).toEqual(serviciu);
      expect(categorieDeseuriService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174000',
      );
      expect(repository.create).toHaveBeenCalledWith(createServiciuDto);
      expect(repository.save).toHaveBeenCalledWith(serviciu);
    });

    it('should throw ConflictException if serviciu with same name exists', async () => {
      const createServiciuDto: CreateServiciuDto = {
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
      };

      repository.findOne.mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await expect(service.create(createServiciuDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of servicii', async () => {
      const servicii = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Colectare deșeuri menajere',
          descriere: 'Serviciu de colectare a deșeurilor menajere',
          pretUnitar: 100,
          unitateMasura: 'tonă',
          categorieId: '123e4567-e89b-12d3-a456-426614174000',
          createdAt: new Date(),
          updatedAt: new Date(),
          categorie: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Deșeuri menajere',
            descriere: 'Deșeuri generate de activitățile casnice',
            codDeseu: '20 03 01',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          serviciiContractate: [],
        },
      ];

      repository.find.mockResolvedValue(servicii);

      const result = await service.findAll();
      expect(result).toEqual(servicii);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['categorie'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findByCategorie', () => {
    it('should return servicii by categorieId', async () => {
      const servicii = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Colectare deșeuri menajere',
          descriere: 'Serviciu de colectare a deșeurilor menajere',
          pretUnitar: 100,
          unitateMasura: 'tonă',
          categorieId: '123e4567-e89b-12d3-a456-426614174000',
          createdAt: new Date(),
          updatedAt: new Date(),
          categorie: {
            id: '123e4567-e89b-12d3-a456-426614174000',
            nume: 'Deșeuri menajere',
            descriere: 'Deșeuri generate de activitățile casnice',
            codDeseu: '20 03 01',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          serviciiContractate: [],
        },
      ];

      repository.find.mockResolvedValue(servicii);

      const result = await service.findByCategorie('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(servicii);
      expect(repository.find).toHaveBeenCalledWith({
        where: { categorieId: '123e4567-e89b-12d3-a456-426614174000' },
        relations: ['categorie'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a serviciu by id', async () => {
      const serviciu = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
        categorieId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date(),
        updatedAt: new Date(),
        categorie: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Deșeuri menajere',
          descriere: 'Deșeuri generate de activitățile casnice',
          codDeseu: '20 03 01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        serviciiContractate: [],
      };

      repository.findOne.mockResolvedValue(serviciu);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(serviciu);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: ['categorie', 'serviciiContractate'],
      });
    });

    it('should throw NotFoundException if serviciu not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a serviciu', async () => {
      const updateServiciuDto: UpdateServiciuDto = {
        nume: 'Colectare deșeuri menajere actualizat',
        categorieId: '123e4567-e89b-12d3-a456-426614174002',
      };

      const serviciu = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
        categorieId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date(),
        updatedAt: new Date(),
        categorie: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Deșeuri menajere',
          descriere: 'Deșeuri generate de activitățile casnice',
          codDeseu: '20 03 01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        serviciiContractate: [],
      };

      const updatedServiciu = {
        ...serviciu,
        nume: 'Colectare deșeuri menajere actualizat',
        categorieId: '123e4567-e89b-12d3-a456-426614174002',
      };

      repository.findOne.mockResolvedValueOnce(serviciu);
      repository.findOne.mockResolvedValueOnce(null);
      jest.spyOn(categorieDeseuriService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174002',
        nume: 'Deșeuri reciclabile',
        descriere: 'Deșeuri care pot fi reciclate',
        codDeseu: '20 01 01',
        createdAt: new Date(),
        updatedAt: new Date(),
        dateIstorice: [],
        predictiiCantitati: [],
      });
      repository.save.mockResolvedValue(updatedServiciu);

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174001',
        updateServiciuDto,
      );
      expect(result).toEqual(updatedServiciu);
      expect(categorieDeseuriService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174002',
      );
      expect(repository.save).toHaveBeenCalledWith(updatedServiciu);
    });
  });

  describe('remove', () => {
    it('should remove a serviciu', async () => {
      const serviciu = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Colectare deșeuri menajere',
        descriere: 'Serviciu de colectare a deșeurilor menajere',
        pretUnitar: 100,
        unitateMasura: 'tonă',
        categorieId: '123e4567-e89b-12d3-a456-426614174000',
        createdAt: new Date(),
        updatedAt: new Date(),
        categorie: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Deșeuri menajere',
          descriere: 'Deșeuri generate de activitățile casnice',
          codDeseu: '20 03 01',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        serviciiContractate: [],
      };

      repository.findOne.mockResolvedValue(serviciu);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174001');
      expect(repository.remove).toHaveBeenCalledWith(serviciu);
    });
  });
});
