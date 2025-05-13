import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UAT } from '../../geographic/entities/uat.entity';
import { Client } from '../../clients/entities/client.entity';
import { PunctColectare } from '../../operational/entities/punct-colectare.entity';
import { CategorieDeseuri } from '../../operational/entities/categorie-deseuri.entity';

@Entity('predictii_cantitati')
export class PredictiiCantitati {
  @ApiProperty({
    description: 'ID-ul unic al predicției',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  uatId: string;

  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  clientId: string;

  @ApiProperty({
    description: 'ID-ul punctului de colectare',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  punctColectareId: string;

  @ApiProperty({
    description: 'ID-ul categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  categorieId: string;

  @ApiProperty({
    description: 'Data efectuării predicției',
    example: '2023-01-01',
  })
  @Column({ type: 'date' })
  dataPredictie: Date;

  @ApiProperty({
    description: 'Data de început a perioadei de predicție',
    example: '2023-01-01',
  })
  @Column({ type: 'date' })
  perioadaStart: Date;

  @ApiProperty({
    description: 'Data de sfârșit a perioadei de predicție',
    example: '2023-12-31',
  })
  @Column({ type: 'date' })
  perioadaEnd: Date;

  @ApiProperty({
    description: 'Cantitatea estimată de deșeuri',
    example: 1000.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantitateEstimata: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'kg',
  })
  @Column({ length: 10, default: 'kg' })
  unitateMasura: string;

  @ApiProperty({
    description: 'Limita inferioară a intervalului de încredere',
    example: 900.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  intervalIncredereMin: number;

  @ApiProperty({
    description: 'Limita superioară a intervalului de încredere',
    example: 1100.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  intervalIncredereMax: number;

  @ApiProperty({
    description: 'Acuratețea predicției (%)',
    example: 85.5,
  })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  acuratetePredictie: number;

  @ApiProperty({
    description: 'Modelul ML utilizat',
    example: 'RandomForest',
  })
  @Column({ length: 100, nullable: true })
  modelUtilizat: string;

  @ApiProperty({
    description: 'Parametrii modelului',
    example: { n_estimators: 100, max_depth: 10 },
  })
  @Column({ type: 'jsonb', nullable: true })
  parametriModel: Record<string, any>;

  @ApiProperty({
    description: 'Data creării înregistrării',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data ultimei actualizări',
    example: '2023-01-01T00:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  // Relații
  @ManyToOne(() => UAT, uat => uat.predictiiCantitati)
  @JoinColumn({ name: 'uat_id' })
  uat: UAT;

  @ManyToOne(() => Client, client => client.predictiiCantitati)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => PunctColectare, punctColectare => punctColectare.predictiiCantitati)
  @JoinColumn({ name: 'punct_colectare_id' })
  punctColectare: PunctColectare;

  @ManyToOne(() => CategorieDeseuri, categorieDeseuri => categorieDeseuri.predictiiCantitati)
  @JoinColumn({ name: 'categorie_id' })
  categorie: CategorieDeseuri;
}
