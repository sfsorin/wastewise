import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judet } from './entities/judet.entity';
import { Localitate } from './entities/localitate.entity';
import { UAT } from './entities/uat.entity';
import { JudeteService } from './services/judete.service';
import { LocalitatiService } from './services/localitati.service';
import { UATService } from './services/uat.service';
import { JudeteController } from './controllers/judete.controller';
import { LocalitatiController } from './controllers/localitati.controller';
import { UATController } from './controllers/uat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Judet, Localitate, UAT])],
  controllers: [JudeteController, LocalitatiController, UATController],
  providers: [JudeteService, LocalitatiService, UATService],
  exports: [TypeOrmModule, JudeteService, LocalitatiService, UATService],
})
export class GeographicModule {}
