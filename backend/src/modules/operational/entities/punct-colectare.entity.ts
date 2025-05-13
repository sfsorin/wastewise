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
import { Client } from '../../clients/entities/client.entity';
import { Judet } from '../../geographic/entities/judet.entity';
import { Localitate } from '../../geographic/entities/localitate.entity';
import { PredictiiCantitati } from '../../ml/entities/predictii-cantitati.entity';

@Entity('puncte_colectare')
export class PunctColectare {
  @ApiProperty({
    description: 'ID-ul unic al punctului de colectare',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  clientId: string;

  @ApiProperty({
    description: 'Numele punctului de colectare',
    example: 'Punct Colectare Centru',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Adresa punctului de colectare',
    example: 'Str. Exemplu, Nr. 123',
  })
  @Column({ type: 'text' })
  adresa: string;

  @ApiProperty({
    description: 'ID-ul județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  judetId: string;

  @ApiProperty({
    description: 'ID-ul localității',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  localitateId: string;

  @ApiProperty({
    description: 'Latitudinea geografică',
    example: 46.0688,
  })
  @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
  latitudine: number;

  @ApiProperty({
    description: 'Longitudinea geografică',
    example: 23.5702,
  })
  @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
  longitudine: number;

  @ApiProperty({
    description: 'Programul de funcționare',
    example: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
  })
  @Column({ type: 'text', nullable: true })
  program: string;

  @ApiProperty({
    description: 'Statusul punctului de colectare',
    example: 'active',
  })
  @Column({ length: 20, default: 'active' })
  status: string;

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
  @ManyToOne(() => Client, client => client.puncteColectare, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Judet, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'judet_id' })
  judet: Judet;

  @ManyToOne(() => Localitate, localitate => localitate.puncteColectare, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'localitate_id' })
  localitate: Localitate;

  @OneToMany(() => PredictiiCantitati, predictiiCantitati => predictiiCantitati.punctColectare, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  predictiiCantitati: PredictiiCantitati[];
}
