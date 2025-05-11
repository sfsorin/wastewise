import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateIstorice } from './entities/date-istorice.entity';
import { PredictiiCantitati } from './entities/predictii-cantitati.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DateIstorice, PredictiiCantitati])],
  exports: [TypeOrmModule],
})
export class MLModule {}
