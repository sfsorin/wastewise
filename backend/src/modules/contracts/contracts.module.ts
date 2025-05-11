import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Serviciu } from './entities/serviciu.entity';
import { ServiciuContractat } from './entities/serviciu-contractat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Serviciu, ServiciuContractat])],
  exports: [TypeOrmModule],
})
export class ContractsModule {}
