import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judet } from './entities/judet.entity';
import { Localitate } from './entities/localitate.entity';
import { UAT } from './entities/uat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judet, Localitate, UAT])],
  exports: [TypeOrmModule],
})
export class GeographicModule {}
