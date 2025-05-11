import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategorieDeseuri } from './entities/categorie-deseuri.entity';
import { PunctColectare } from './entities/punct-colectare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CategorieDeseuri, PunctColectare])],
  exports: [TypeOrmModule],
})
export class OperationalModule {}
