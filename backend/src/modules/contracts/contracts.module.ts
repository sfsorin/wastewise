import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Serviciu } from './entities/serviciu.entity';
import { ServiciuContractat } from './entities/serviciu-contractat.entity';
import { ServiciuService } from './services/serviciu.service';
import { ContractService } from './services/contract.service';
import { ServiciuContractatService } from './services/serviciu-contractat.service';
import { ServiciuController } from './controllers/serviciu.controller';
import { ContractController } from './controllers/contract.controller';
import { ServiciuContractatController } from './controllers/serviciu-contractat.controller';
import { ClientsModule } from '../clients/clients.module';
import { OperationalModule } from '../operational/operational.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Contract, Serviciu, ServiciuContractat]),
    ClientsModule,
    OperationalModule,
  ],
  controllers: [ServiciuController, ContractController, ServiciuContractatController],
  providers: [ServiciuService, ContractService, ServiciuContractatService],
  exports: [TypeOrmModule, ServiciuService, ContractService, ServiciuContractatService],
})
export class ContractsModule {}
