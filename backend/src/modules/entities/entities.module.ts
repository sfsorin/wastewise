import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { TipClient } from './entities/tip-client.entity';
import { TipClientService } from './services/tip-client.service';
import { ClientService } from './services/client.service';
import { TipClientController } from './controllers/tip-client.controller';
import { ClientController } from './controllers/client.controller';
import { GeographicModule } from '../geographic/geographic.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client, TipClient]), GeographicModule],
  controllers: [TipClientController, ClientController],
  providers: [TipClientService, ClientService],
  exports: [TypeOrmModule, TipClientService, ClientService],
})
export class EntitiesModule {}
