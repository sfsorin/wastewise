import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UAT } from '../entities/uat.entity';
import { UATService } from '../services/uat.service';
import { JudeteService } from '../services/judete.service';
import { ZoneADIService } from '../services/zone-adi.service';
import { ZoneIridexService } from '../services/zone-iridex.service';
import { CreateUATDto } from '../dto/create-uat.dto';
// UpdateUATDto nu este utilizat în acest fișier
// import { UpdateUATDto } from '../dto/update-uat.dto';
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

describe('UATService', () => {
  let service: UATService;
  let repository: MockRepository;
  let judeteService: JudeteService;
  let zoneADIService: ZoneADIService;
  let zoneIridexService: ZoneIridexService;

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
          provide: ZoneADIService,
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: ZoneIridexService,
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
    repository = module.get(getRepositoryToken(UAT));
    judeteService = module.get<JudeteService>(JudeteService);
    zoneADIService = module.get<ZoneADIService>(ZoneADIService);
    zoneIridexService = module.get<ZoneIridexService>(ZoneIridexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new UAT', async () => {
      const createUATDto: CreateUATDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        zonaADIId: '123e4567-e89b-12d3-a456-426614174003',
        zonaIridexId: '123e4567-e89b-12d3-a456-426614174004',
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
        localitati: [],
        zonaADI: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Zona ADI Alba',
          cod: 'ADI-AB',
          descriere: 'Zona ADI pentru județul Alba',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        zonaIridex: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          nume: 'Zona Iridex 1',
          cod: 'IR-01',
          descriere: 'Zona Iridex pentru colectare deșeuri menajere',
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

      jest.spyOn(zoneADIService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174003',
        nume: 'Zona ADI Alba',
        cod: 'ADI-AB',
        descriere: 'Zona ADI pentru județul Alba',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      });

      jest.spyOn(zoneIridexService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174004',
        nume: 'Zona Iridex 1',
        cod: 'IR-01',
        descriere: 'Zona Iridex pentru colectare deșeuri menajere',
        createdAt: new Date(),
        updatedAt: new Date(),
        uaturi: [],
      });

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(uat);
      repository.save.mockResolvedValue(uat);

      const result = await service.create(createUATDto);
      expect(result).toEqual(uat);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      expect(zoneADIService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174003');
      expect(zoneIridexService.findOne).toHaveBeenCalledWith(
        '123e4567-e89b-12d3-a456-426614174004',
      );
      expect(repository.create).toHaveBeenCalledWith(createUATDto);
      expect(repository.save).toHaveBeenCalledWith(uat);
    });

    it('should create a new UAT with localitati', async () => {
      const createUATDto: CreateUATDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
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
        localitati: [
          {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            uatId: '123e4567-e89b-12d3-a456-426614174001',
            codSiruta: '1001',
            tip: 'municipiu',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: '123e4567-e89b-12d3-a456-426614174005',
            nume: 'Micești',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            uatId: '123e4567-e89b-12d3-a456-426614174001',
            codSiruta: '1002',
            tip: 'sat',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
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
      // Verificăm că UAT-ul are localități asociate
      expect(result.localitati).toBeDefined();
      expect(result.localitati.length).toBe(2);
      expect(result.localitati[0].uatId).toBe(result.id);
      expect(result.localitati[1].uatId).toBe(result.id);
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

      await expect(service.create(createUATDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('findAll', () => {
    it('should return an array of UATs', async () => {
      const uats = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          zonaADIId: '123e4567-e89b-12d3-a456-426614174003',
          zonaIridexId: '123e4567-e89b-12d3-a456-426614174004',
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
          localitati: [
            {
              id: '123e4567-e89b-12d3-a456-426614174002',
              nume: 'Alba Iulia',
              judetId: '123e4567-e89b-12d3-a456-426614174000',
              uatId: '123e4567-e89b-12d3-a456-426614174001',
              codSiruta: '1001',
              tip: 'municipiu',
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          ],
          zonaADI: {
            id: '123e4567-e89b-12d3-a456-426614174003',
            nume: 'Zona ADI Alba',
            cod: 'ADI-AB',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          zonaIridex: {
            id: '123e4567-e89b-12d3-a456-426614174004',
            nume: 'Zona Iridex 1',
            cod: 'IR-01',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          dateIstorice: [],
          predictiiCantitati: [],
        },
      ];

      repository.find.mockResolvedValue(uats);

      const result = await service.findAll();
      expect(result).toEqual(uats);
      expect(repository.find).toHaveBeenCalledWith({
        relations: ['judet', 'localitati', 'zonaADI', 'zonaIridex'],
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
        zonaADIId: '123e4567-e89b-12d3-a456-426614174003',
        zonaIridexId: '123e4567-e89b-12d3-a456-426614174004',
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
        localitati: [
          {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            uatId: '123e4567-e89b-12d3-a456-426614174001',
            codSiruta: '1001',
            tip: 'municipiu',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        zonaADI: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Zona ADI Alba',
          cod: 'ADI-AB',
          descriere: 'Zona ADI pentru județul Alba',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        zonaIridex: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          nume: 'Zona Iridex 1',
          cod: 'IR-01',
          descriere: 'Zona Iridex pentru colectare deșeuri menajere',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        dateIstorice: [],
        predictiiCantitati: [],
      };

      repository.findOne.mockResolvedValue(uat);

      const result = await service.findOne('123e4567-e89b-12d3-a456-426614174001');
      expect(result).toEqual(uat);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: '123e4567-e89b-12d3-a456-426614174001' },
        relations: [
          'judet',
          'localitati',
          'zonaADI',
          'zonaIridex',
          'dateIstorice',
          'predictiiCantitati',
        ],
      });
    });

    it('should throw NotFoundException if UAT not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne('123e4567-e89b-12d3-a456-426614174001')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
