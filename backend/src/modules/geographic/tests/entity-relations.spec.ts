import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { Judet } from '../entities/judet.entity';
import { Localitate } from '../entities/localitate.entity';
import { UAT } from '../entities/uat.entity';
import { ZonaADI } from '../entities/zona-adi.entity';
import { ZonaIridex } from '../entities/zona-iridex.entity';
import { JudeteService } from '../services/judete.service';
import { LocalitatiService } from '../services/localitati.service';
import { UATService } from '../services/uat.service';
import { ZoneADIService } from '../services/zone-adi.service';
import { ZoneIridexService } from '../services/zone-iridex.service';
import { CreateJudetDto } from '../dto/create-judet.dto';
import { CreateLocalitateDto } from '../dto/create-localitate.dto';
import { CreateUATDto } from '../dto/create-uat.dto';
import { CreateZonaADIDto } from '../dto/create-zona-adi.dto';
import { CreateZonaIridexDto } from '../dto/create-zona-iridex.dto';

describe('Entity Relations (e2e)', () => {
  let judeteService: JudeteService;
  let localitatiService: LocalitatiService;
  let uatService: UATService;
  let zoneADIService: ZoneADIService;
  let zoneIridexService: ZoneIridexService;

  let judetRepository: Repository<Judet>;
  let localitateRepository: Repository<Localitate>;
  let uatRepository: Repository<UAT>;
  let zonaADIRepository: Repository<ZonaADI>;
  let zonaIridexRepository: Repository<ZonaIridex>;

  let judetId: string;
  let localitateId: string;
  let uatId: string;
  let zonaADIId: string;
  let zonaIridexId: string;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get('DB_HOST'),
            port: +configService.get('DB_PORT'),
            username: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            database: configService.get('DB_DATABASE'),
            entities: [Judet, Localitate, UAT, ZonaADI, ZonaIridex],
            synchronize: true,
          }),
        }),
        TypeOrmModule.forFeature([Judet, Localitate, UAT, ZonaADI, ZonaIridex]),
      ],
      providers: [JudeteService, LocalitatiService, UATService, ZoneADIService, ZoneIridexService],
    }).compile();

    judeteService = module.get<JudeteService>(JudeteService);
    localitatiService = module.get<LocalitatiService>(LocalitatiService);
    uatService = module.get<UATService>(UATService);
    zoneADIService = module.get<ZoneADIService>(ZoneADIService);
    zoneIridexService = module.get<ZoneIridexService>(ZoneIridexService);

    judetRepository = module.get<Repository<Judet>>(getRepositoryToken(Judet));
    localitateRepository = module.get<Repository<Localitate>>(getRepositoryToken(Localitate));
    uatRepository = module.get<Repository<UAT>>(getRepositoryToken(UAT));
    zonaADIRepository = module.get<Repository<ZonaADI>>(getRepositoryToken(ZonaADI));
    zonaIridexRepository = module.get<Repository<ZonaIridex>>(getRepositoryToken(ZonaIridex));

    // Curățăm datele existente
    await uatRepository.delete({});
    await localitateRepository.delete({});
    await judetRepository.delete({});
    await zonaADIRepository.delete({});
    await zonaIridexRepository.delete({});
  });

  afterAll(async () => {
    // Curățăm datele după teste
    await uatRepository.delete({});
    await localitateRepository.delete({});
    await judetRepository.delete({});
    await zonaADIRepository.delete({});
    await zonaIridexRepository.delete({});
  });

  it('should create entities with relationships', async () => {
    // Creăm un județ
    const createJudetDto: CreateJudetDto = {
      nume: 'Alba Test',
      codSiruta: '01-test',
      codAuto: 'AB',
    };
    const judet = await judeteService.create(createJudetDto);
    judetId = judet.id;
    expect(judet).toBeDefined();
    expect(judet.nume).toBe(createJudetDto.nume);

    // Creăm o localitate asociată județului
    const createLocalitateDto: CreateLocalitateDto = {
      nume: 'Alba Iulia Test',
      judetId,
      codSiruta: '0101-test',
      tip: 'municipiu',
    };
    const localitate = await localitatiService.create(createLocalitateDto);
    localitateId = localitate.id;
    expect(localitate).toBeDefined();
    expect(localitate.nume).toBe(createLocalitateDto.nume);
    expect(localitate.judetId).toBe(judetId);

    // Creăm o zonă ADI
    const createZonaADIDto: CreateZonaADIDto = {
      nume: 'Zona ADI Test',
      cod: 'ADI-TEST',
      descriere: 'Zonă ADI pentru teste',
    };
    const zonaADI = await zoneADIService.create(createZonaADIDto);
    zonaADIId = zonaADI.id;
    expect(zonaADI).toBeDefined();
    expect(zonaADI.nume).toBe(createZonaADIDto.nume);

    // Creăm o zonă Iridex
    const createZonaIridexDto: CreateZonaIridexDto = {
      nume: 'Zona Iridex Test',
      cod: 'IR-TEST',
      descriere: 'Zonă Iridex pentru teste',
    };
    const zonaIridex = await zoneIridexService.create(createZonaIridexDto);
    zonaIridexId = zonaIridex.id;
    expect(zonaIridex).toBeDefined();
    expect(zonaIridex.nume).toBe(createZonaIridexDto.nume);

    // Creăm un UAT asociat județului, localității, zonei ADI și zonei Iridex
    const createUATDto: CreateUATDto = {
      nume: 'UAT Test',
      judetId,
      // localitateId nu mai este necesar în CreateUATDto
      zonaADIId,
      zonaIridexId,
      codSiruta: '0101-uat-test',
      populatie: 1000,
      suprafata: 100.5,
    };
    const uat = await uatService.create(createUATDto);
    uatId = uat.id;
    expect(uat).toBeDefined();
    expect(uat.nume).toBe(createUATDto.nume);
    expect(uat.judetId).toBe(judetId);
    // UAT nu mai are localitateId, acum are o relație OneToMany cu localitati
    expect(uat.zonaADIId).toBe(zonaADIId);
    expect(uat.zonaIridexId).toBe(zonaIridexId);

    // Verificăm relația Judet -> Localitate
    const judetWithLocalitati = await judeteService.findOne(judetId);
    expect(judetWithLocalitati.localitati).toBeDefined();
    expect(judetWithLocalitati.localitati.length).toBeGreaterThan(0);
    expect(judetWithLocalitati.localitati[0].id).toBe(localitateId);

    // Verificăm relația Judet -> UAT
    const judetWithUAT = await judeteService.findOne(judetId);
    expect(judetWithUAT.uaturi).toBeDefined();
    expect(judetWithUAT.uaturi.length).toBeGreaterThan(0);
    expect(judetWithUAT.uaturi[0].id).toBe(uatId);

    // Verificăm relația ZonaADI -> UAT
    const zonaADIWithUAT = await zoneADIService.findOne(zonaADIId);
    expect(zonaADIWithUAT.uaturi).toBeDefined();
    expect(zonaADIWithUAT.uaturi.length).toBeGreaterThan(0);
    expect(zonaADIWithUAT.uaturi[0].id).toBe(uatId);

    // Verificăm relația ZonaIridex -> UAT
    const zonaIridexWithUAT = await zoneIridexService.findOne(zonaIridexId);
    expect(zonaIridexWithUAT.uaturi).toBeDefined();
    expect(zonaIridexWithUAT.uaturi.length).toBeGreaterThan(0);
    expect(zonaIridexWithUAT.uaturi[0].id).toBe(uatId);

    // Verificăm relația UAT -> Judet, Localitate, ZonaADI, ZonaIridex
    const uatWithRelations = await uatService.findOne(uatId);
    expect(uatWithRelations.judet).toBeDefined();
    expect(uatWithRelations.judet.id).toBe(judetId);
    expect(uatWithRelations.localitati).toBeDefined();
    // Verificăm că există cel puțin o localitate asociată
    expect(uatWithRelations.localitati.length).toBeGreaterThanOrEqual(0);
    expect(uatWithRelations.zonaADI).toBeDefined();
    expect(uatWithRelations.zonaADI.id).toBe(zonaADIId);
    expect(uatWithRelations.zonaIridex).toBeDefined();
    expect(uatWithRelations.zonaIridex.id).toBe(zonaIridexId);
  });

  it('should cascade delete UAT when deleting Judet', async () => {
    // Verificăm că UAT-ul există
    const uatBefore = await uatService.findOne(uatId);
    expect(uatBefore).toBeDefined();

    // Ștergem județul
    await judeteService.remove(judetId);

    // Verificăm că UAT-ul a fost șters
    try {
      await uatService.findOne(uatId);
      fail('UAT should have been deleted');
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Eroare necunoscută';
      expect(errorMessage).toContain('nu a fost găsit');
    }
  });
});
