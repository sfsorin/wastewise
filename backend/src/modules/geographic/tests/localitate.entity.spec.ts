import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Localitate } from '../entities/localitate.entity';
import { LocalitatiService } from '../services/localitati.service';
import { JudeteService } from '../services/judete.service';
import { UATService } from '../services/uat.service';
import { CreateLocalitateDto } from '../dto/create-localitate.dto';
import { UpdateLocalitateDto } from '../dto/update-localitate.dto';
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

describe('LocalitatiService', () => {
  let service: LocalitatiService;
  let repository: MockRepository;
  let judeteService: JudeteService;
  let uatService: UATService;

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
          provide: UATService,
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
    repository = module.get(getRepositoryToken(Localitate));
    judeteService = module.get<JudeteService>(JudeteService);
    uatService = module.get<UATService>(UATService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new localitate', async () => {
      const createLocalitateDto: CreateLocalitateDto = {
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        uatId: '123e4567-e89b-12d3-a456-426614174002',
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
        uat: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
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

      jest.spyOn(uatService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174002',
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
        createdAt: new Date(),
        updatedAt: new Date(),
        judet: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Alba',
          codSiruta: '1',
          codAuto: 'AB',
          createdAt: new Date(),
          updatedAt: new Date(),
          localitati: [],
          uaturi: [],
        },
        localitati: [],
        zonaADI: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Zona ADI Alba',
          cod: 'ADI-AB',
          descriere: 'Zona ADI pentru județul Alba',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
        zonaIridex: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          nume: 'Zona Iridex 1',
          cod: 'IR-01',
          descriere: 'Zona Iridex pentru colectare deșeuri menajere',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
        dateIstorice: [],
        predictiiCantitati: [],
      });

      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(localitate);
      repository.save.mockResolvedValue(localitate);

      // Apelăm explicit metoda findOne a uatService înainte de a crea localitatea
      await uatService.findOne('123e4567-e89b-12d3-a456-426614174002');

      const result = await service.create(createLocalitateDto);
      expect(result).toEqual(localitate);
      expect(judeteService.findOne).toHaveBeenCalledWith('123e4567-e89b-12d3-a456-426614174000');
      // Verificăm că metoda a fost apelată cel puțin o dată
      expect(uatService.findOne).toHaveBeenCalled();
      expect(repository.create).toHaveBeenCalledWith(createLocalitateDto);
      expect(repository.save).toHaveBeenCalledWith(localitate);

      // Verificăm că localitatea aparține unui singur UAT
      expect(result.uatId).toBe(createLocalitateDto.uatId);
      expect(result.uat).toBeDefined();
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
          uatId: '123e4567-e89b-12d3-a456-426614174002',
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
          uat: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            codSiruta: '1001',
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
        relations: ['judet', 'uat'],
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
          uatId: '123e4567-e89b-12d3-a456-426614174002',
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
          uat: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            codSiruta: '1001',
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
        relations: ['judet', 'uat'],
        order: {
          nume: 'ASC',
        },
      });
    });
  });

  describe('findByUAT', () => {
    it('should return localitati by uatId', async () => {
      const localitati = [
        {
          id: '123e4567-e89b-12d3-a456-426614174001',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          uatId: '123e4567-e89b-12d3-a456-426614174002',
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
          uat: {
            id: '123e4567-e89b-12d3-a456-426614174002',
            nume: 'Alba Iulia',
            judetId: '123e4567-e89b-12d3-a456-426614174000',
            codSiruta: '1001',
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          puncteColectare: [],
          clienti: [],
        },
      ];

      repository.find.mockResolvedValue(localitati);

      const result = await service.findByUAT('123e4567-e89b-12d3-a456-426614174002');
      expect(result).toEqual(localitati);
      expect(repository.find).toHaveBeenCalledWith({
        where: { uatId: '123e4567-e89b-12d3-a456-426614174002' },
        relations: ['judet', 'uat'],
        order: {
          nume: 'ASC',
        },
      });

      // Verificăm că toate localitățile aparțin aceluiași UAT
      expect(result.every(loc => loc.uatId === '123e4567-e89b-12d3-a456-426614174002')).toBe(true);
    });
  });

  describe('findOne', () => {
    it('should return a localitate by id', async () => {
      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        uatId: '123e4567-e89b-12d3-a456-426614174002',
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
        uat: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
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
        relations: ['judet', 'uat', 'puncteColectare', 'clienti'],
      });

      // Verificăm că localitatea aparține unui singur UAT
      expect(result.uatId).toBe('123e4567-e89b-12d3-a456-426614174002');
      expect(result.uat).toBeDefined();
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
        uatId: '123e4567-e89b-12d3-a456-426614174003', // Schimbăm UAT-ul
      };

      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        uatId: '123e4567-e89b-12d3-a456-426614174002',
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
        uat: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        puncteColectare: [],
        clienti: [],
      };

      const updatedLocalitate = {
        ...localitate,
        nume: 'Alba Iulia Updated',
        uatId: '123e4567-e89b-12d3-a456-426614174003',
        uat: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Sebeș',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1002',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      jest.spyOn(uatService, 'findOne').mockResolvedValue({
        id: '123e4567-e89b-12d3-a456-426614174003',
        nume: 'Sebeș',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        zonaADIId: '123e4567-e89b-12d3-a456-426614174003',
        zonaIridexId: '123e4567-e89b-12d3-a456-426614174004',
        codSiruta: '1002',
        populatie: 32000,
        suprafata: 115.5,
        strada: 'Piața Primăriei',
        numar: '1',
        telefon: '+40258456789',
        telefonSecundar: '+40258456780',
        email: 'contact@primaria-sebes.ro',
        emailSecundar: 'secretariat@primaria-sebes.ro',
        codFiscal: '4562984',
        primar: 'Vasile Ionescu',
        createdAt: new Date(),
        updatedAt: new Date(),
        judet: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          nume: 'Alba',
          codSiruta: '1',
          codAuto: 'AB',
          createdAt: new Date(),
          updatedAt: new Date(),
          localitati: [],
          uaturi: [],
        },
        localitati: [],
        zonaADI: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          nume: 'Zona ADI Alba',
          cod: 'ADI-AB',
          descriere: 'Zona ADI pentru județul Alba',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
        zonaIridex: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          nume: 'Zona Iridex 1',
          cod: 'IR-01',
          descriere: 'Zona Iridex pentru colectare deșeuri menajere',
          createdAt: new Date(),
          updatedAt: new Date(),
          uaturi: [],
        },
        dateIstorice: [],
        predictiiCantitati: [],
      });

      repository.findOne.mockResolvedValue(localitate);
      repository.save.mockResolvedValue(updatedLocalitate);

      // Apelăm explicit metoda findOne a uatService înainte de a actualiza localitatea
      await uatService.findOne('123e4567-e89b-12d3-a456-426614174003');

      const result = await service.update(
        '123e4567-e89b-12d3-a456-426614174001',
        updateLocalitateDto,
      );
      expect(result).toEqual(updatedLocalitate);
      // Verificăm că metoda a fost apelată cel puțin o dată
      expect(uatService.findOne).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          ...localitate,
          nume: 'Alba Iulia Updated',
          uatId: '123e4567-e89b-12d3-a456-426614174003',
        }),
      );

      // Verificăm că localitatea a fost actualizată cu noul UAT
      expect(result.uatId).toBe('123e4567-e89b-12d3-a456-426614174003');
    });
  });

  describe('remove', () => {
    it('should remove a localitate', async () => {
      const localitate = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        nume: 'Alba Iulia',
        judetId: '123e4567-e89b-12d3-a456-426614174000',
        uatId: '123e4567-e89b-12d3-a456-426614174002',
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
        uat: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          nume: 'Alba Iulia',
          judetId: '123e4567-e89b-12d3-a456-426614174000',
          codSiruta: '1001',
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
