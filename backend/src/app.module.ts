import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configs from '@config/index';
import { UsersModule } from '@modules/users/users.module';
import { ProfilesModule } from '@modules/profiles/profiles.module';
import { GeographicModule } from '@modules/geographic/geographic.module';
import { EntitiesModule } from '@modules/entities/entities.module';
import { OperationalModule } from '@modules/operational/operational.module';
import { ContractsModule } from '@modules/contracts/contracts.module';
import { MLModule } from '@modules/ml/ml.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthModule } from './health/health.module';

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
      useFactory: (configService: ConfigService): Record<string, unknown> => {
        const dbConfig = configService.get<Record<string, unknown>>('database');
        return dbConfig ? { ...dbConfig } : {};
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ttl: configService.get<number>('security.rateLimiting.ttl') || 60,
          limit: configService.get<number>('security.rateLimiting.limit') || 10,
        };
      },
    }),
    UsersModule,
    ProfilesModule,
    GeographicModule,
    EntitiesModule,
    OperationalModule,
    ContractsModule,
    MLModule,
    AuthModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
