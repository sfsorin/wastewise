import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateIstorice } from './entities/date-istorice.entity';
import { PredictiiCantitati } from './entities/predictii-cantitati.entity';
import { DateIstoriceService } from './services/date-istorice.service';
import { PredictiiCantitatiService } from './services/predictii-cantitati.service';
import { DateIstoriceController } from './controllers/date-istorice.controller';
import { PredictiiCantitatiController } from './controllers/predictii-cantitati.controller';
import { GeographicModule } from '../geographic/geographic.module';
import { ClientsModule } from '../clients/clients.module';
import { OperationalModule } from '../operational/operational.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DateIstorice, PredictiiCantitati]),
    GeographicModule,
    ClientsModule,
    OperationalModule,
  ],
  controllers: [DateIstoriceController, PredictiiCantitatiController],
  providers: [DateIstoriceService, PredictiiCantitatiService],
  exports: [TypeOrmModule, DateIstoriceService, PredictiiCantitatiService],
})
export class MLModule {}
