import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Judet } from './judet.entity';
import { Localitate } from './localitate.entity';
import { ZonaADI } from './zona-adi.entity';
import { ZonaIridex } from './zona-iridex.entity';
import { DateIstorice } from '../../ml/entities/date-istorice.entity';
import { PredictiiCantitati } from '../../ml/entities/predictii-cantitati.entity';

@Entity('uat')
export class UAT {
  @ApiProperty({
    description: 'ID-ul unic al UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  judetId: string;

  // Eliminăm coloana localitateId deoarece acum UAT are mai multe localități

  @ApiProperty({
    description: 'ID-ul zonei ADI',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  zonaADIId: string;

  @ApiProperty({
    description: 'ID-ul zonei Iridex',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  zonaIridexId: string;

  @ApiProperty({
    description: 'Numele UAT-ului',
    example: 'Alba Iulia',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Codul SIRUTA al UAT-ului',
    example: '1001',
  })
  @Column({ length: 10, unique: true, nullable: true })
  codSiruta: string;

  @ApiProperty({
    description: 'Populația UAT-ului',
    example: 74000,
  })
  @Column({ nullable: true })
  populatie: number;

  @ApiProperty({
    description: 'Suprafața UAT-ului (km²)',
    example: 103.65,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  suprafata: number;

  @ApiProperty({
    description: 'Strada',
    example: 'Calea Moților',
  })
  @Column({ length: 200, nullable: true })
  strada: string;

  @ApiProperty({
    description: 'Număr',
    example: '5A',
  })
  @Column({ length: 20, nullable: true })
  numar: string;

  @ApiProperty({
    description: 'Telefon',
    example: '+40258123456',
  })
  @Column({ length: 20, nullable: true })
  telefon: string;

  @ApiProperty({
    description: 'Telefon secundar',
    example: '+40258123457',
  })
  @Column({ length: 20, nullable: true })
  telefonSecundar: string;

  @ApiProperty({
    description: 'Email',
    example: 'contact@primaria-albaiulia.ro',
  })
  @Column({ length: 100, nullable: true })
  email: string;

  @ApiProperty({
    description: 'Email secundar',
    example: 'secretariat@primaria-albaiulia.ro',
  })
  @Column({ length: 100, nullable: true })
  emailSecundar: string;

  @ApiProperty({
    description: 'Cod fiscal',
    example: '4562983',
  })
  @Column({ length: 20, nullable: true })
  codFiscal: string;

  @ApiProperty({
    description: 'Primar',
    example: 'Ion Popescu',
  })
  @Column({ length: 100, nullable: true })
  primar: string;

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
  @ManyToOne(() => Judet, judet => judet.uaturi, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'judet_id' })
  judet: Judet;

  @OneToMany(() => Localitate, localitate => localitate.uat, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  localitati: Localitate[];

  @ManyToOne(() => ZonaADI, zonaADI => zonaADI.uaturi, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zona_adi_id' })
  zonaADI: ZonaADI;

  @ManyToOne(() => ZonaIridex, zonaIridex => zonaIridex.uaturi, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'zona_iridex_id' })
  zonaIridex: ZonaIridex;

  @OneToMany(() => DateIstorice, dateIstorice => dateIstorice.uat, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  dateIstorice: DateIstorice[];

  @OneToMany(() => PredictiiCantitati, predictiiCantitati => predictiiCantitati.uat, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  predictiiCantitati: PredictiiCantitati[];
}
