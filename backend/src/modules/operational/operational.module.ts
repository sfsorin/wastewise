import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieDeseuri } from './entities/categorie-deseuri.entity';
import { PunctColectare } from './entities/punct-colectare.entity';
import { CategorieDeseuriService } from './services/categorie-deseuri.service';
import { PunctColectareService } from './services/punct-colectare.service';
import { CategorieDeseuriController } from './controllers/categorie-deseuri.controller';
import { PunctColectareController } from './controllers/punct-colectare.controller';
import { GeographicModule } from '../geographic/geographic.module';
import { EntitiesModule } from '../entities/entities.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategorieDeseuri, PunctColectare]),
    GeographicModule,
    EntitiesModule,
  ],
  controllers: [CategorieDeseuriController, PunctColectareController],
  providers: [CategorieDeseuriService, PunctColectareService],
  exports: [TypeOrmModule, CategorieDeseuriService, PunctColectareService],
})
export class OperationalModule {}
