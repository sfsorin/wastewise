import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judet } from './entities/judet.entity';
import { Localitate } from './entities/localitate.entity';
import { UAT } from './entities/uat.entity';
import { ZonaADI } from './entities/zona-adi.entity';
import { ZonaIridex } from './entities/zona-iridex.entity';
import { JudeteService } from './services/judete.service';
import { LocalitatiService } from './services/localitati.service';
import { UATService } from './services/uat.service';
import { ZoneADIService } from './services/zone-adi.service';
import { ZoneIridexService } from './services/zone-iridex.service';
import { JudeteController } from './controllers/judete.controller';
import { LocalitatiController } from './controllers/localitati.controller';
import { UATController } from './controllers/uat.controller';
import { ZoneADIController } from './controllers/zone-adi.controller';
import { ZoneIridexController } from './controllers/zone-iridex.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Judet, Localitate, UAT, ZonaADI, ZonaIridex])],
  controllers: [
    JudeteController,
    LocalitatiController,
    UATController,
    ZoneADIController,
    ZoneIridexController,
  ],
  providers: [JudeteService, LocalitatiService, UATService, ZoneADIService, ZoneIridexService],
  exports: [
    TypeOrmModule,
    JudeteService,
    LocalitatiService,
    UATService,
    ZoneADIService,
    ZoneIridexService,
  ],
})
export class GeographicModule {}
