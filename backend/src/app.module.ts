import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from '@config/index';
import { UsersModule } from '@modules/users/users.module';
import { ProfilesModule } from '@modules/profiles/profiles.module';
import { GeographicModule } from '@modules/geographic/geographic.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { OperationalModule } from '@modules/operational/operational.module';
import { ContractsModule } from '@modules/contracts/contracts.module';
import { MLModule } from '@modules/ml/ml.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
    }),
    UsersModule,
    ProfilesModule,
    GeographicModule,
    ClientsModule,
    OperationalModule,
    ContractsModule,
    MLModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
