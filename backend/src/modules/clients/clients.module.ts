import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { TipClient } from './entities/tip-client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, TipClient])],
  exports: [TypeOrmModule],
})
export class ClientsModule {}
