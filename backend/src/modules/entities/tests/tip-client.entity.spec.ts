import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipClient } from '../entities/tip-client.entity';
import { TipClientService } from '../services/tip-client.service';
import { CreateTipClientDto } from '../dto/create-tip-client.dto';
import { UpdateTipClientDto } from '../dto/update-tip-client.dto';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { ObjectLiteral } from 'typeorm';
type MockRepository<T extends ObjectLiteral = any> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
});

describe('TipClientService', () => {
  let service: TipClientService;
  let repository: MockRepository<TipClient>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TipClientService,
        {
          provide: getRepositoryToken(TipClient),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    service = module.get<TipClientService>(TipClientService);
    repository = module.get<MockRepository<TipClient>>(getRepositoryToken(TipClient));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new tip client', async () => {
      const createTipClientDto: CreateTipClientDto = {
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
      };

      const tipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        ...createTipClientDto,
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(tipClient);
      repository.save.mockResolvedValue(tipClient);

      const result = await service.create(createTipClientDto);
      expect(result).toEqual(tipClient);
      expect(repository.create).toHaveBeenCalledWith(createTipClientDto);
      expect(repository.save).toHaveBeenCalledWith(tipClient);
    });

    it('should throw ConflictException if tip client with same name exists', async () => {
      const createTipClientDto: CreateTipClientDto = {
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
      };

      const existingTipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      repository.findOne.mockResolvedValue(existingTipClient);

      await expect(service.create(createTipClientDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of tip clients', async () => {
      const tipClients = [
        {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Persoană Fizică',
          descriere: 'Client persoană fizică',
          createdAt: new Date(),
          updatedAt: new Date(),
          clienti: [],
        },
      ];

      repository.find.mockResolvedValue(tipClients);

      const result = await service.findAll();
      expect(result).toEqual(tipClients);
      expect(repository.find).toHaveBeenCalledWith({
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findOne', () => {
    it('should return a tip client by id', async () => {
      const tipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      repository.findOne.mockResolvedValue(tipClient);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174000');
      expect(result).toEqual(tipClient);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174000' },
      });
    });

    it('should throw NotFoundException if tip client not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174000')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('update', () => {
    it('should update a tip client', async () => {
      const updateTipClientDto: UpdateTipClientDto = {
        nume: 'Persoană Fizică Updated',
      };

      const tipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      const updatedTipClient = {
        ...tipClient,
        nume: 'Persoană Fizică Updated',
      };

      repository.findOne.mockResolvedValueOnce(tipClient);
      repository.findOne.mockResolvedValueOnce(null);
      repository.save.mockResolvedValue(updatedTipClient);

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174000',
        updateTipClientDto,
      );
      expect(result).toEqual(updatedTipClient);
      expect(repository.save).toHaveBeenCalledWith(updatedTipClient);
    });

    it('should throw ConflictException if tip client with same name exists', async () => {
      const updateTipClientDto: UpdateTipClientDto = {
        nume: 'Persoană Juridică',
      };

      const tipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      const existingTipClient = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Persoană Juridică',
        descriere: 'Client persoană juridică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      repository.findOne.mockResolvedValueOnce(tipClient);
      repository.findOne.mockResolvedValueOnce(existingTipClient);

      await expect(
        service.update('123e4567-e89b-12d3-a456-426614174000', updateTipClientDto),
      ).rejects.toThrow(ConflictException);
    });
  });

  describe('remove', () => {
    it('should remove a tip client', async () => {
      const tipClient = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        nume: 'Persoană Fizică',
        descriere: 'Client persoană fizică',
        createdAt: new Date(),
        updatedAt: new Date(),
        clienti: [],
      };

      repository.findOne.mockResolvedValue(tipClient);
      repository.remove.mockResolvedValue(undefined);

      await service.remove('123e4567-e89b-12d3-a456-426614174000');
      expect(repository.remove).toHaveBeenCalledWith(tipClient);
    });
  });
});
