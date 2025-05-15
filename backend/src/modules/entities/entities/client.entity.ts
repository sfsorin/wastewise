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
import { TipClient } from './tip-client.entity';
import { Judet } from '../../geographic/entities/judet.entity';
import { Localitate } from '../../geographic/entities/localitate.entity';
import { PunctColectare } from '../../operational/entities/punct-colectare.entity';
import { Contract } from '../../contracts/entities/contract.entity';
import { PredictiiCantitati } from '../../ml/entities/predictii-cantitati.entity';

@Entity('clienti')
export class Client {
  @ApiProperty({
    description: 'ID-ul unic al clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul tipului de client',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  tipClientId: string;

  @ApiProperty({
    description: 'Numele clientului',
    example: 'SC Example SRL',
  })
  @Column({ length: 200 })
  nume: string;

  @ApiProperty({
    description: 'Codul Unic de Identificare (pentru persoane juridice)',
    example: 'RO12345678',
  })
  @Column({ length: 20, unique: true, nullable: true })
  cui: string;

  @ApiProperty({
    description: 'Codul Numeric Personal (pentru persoane fizice)',
    example: '1234567890123',
  })
  @Column({ length: 13, unique: true, nullable: true })
  cnp: string;

  @ApiProperty({
    description: 'Adresa clientului',
    example: 'Str. Exemplu, Nr. 123, Bl. A1, Sc. 1, Ap. 10',
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
    description: 'Codul poștal',
    example: '123456',
  })
  @Column({ length: 10, nullable: true })
  codPostal: string;

  @ApiProperty({
    description: 'Adresa de email',
    example: 'contact@example.com',
  })
  @Column({ length: 255, nullable: true })
  email: string;

  @ApiProperty({
    description: 'Numărul de telefon',
    example: '+40712345678',
  })
  @Column({ length: 20, nullable: true })
  telefon: string;

  @ApiProperty({
    description: 'Persoana de contact',
    example: 'John Doe',
  })
  @Column({ length: 100, nullable: true })
  persoanaContact: string;

  @ApiProperty({
    description: 'Telefonul persoanei de contact',
    example: '+40712345678',
  })
  @Column({ length: 20, nullable: true })
  telefonContact: string;

  @ApiProperty({
    description: 'Email-ul persoanei de contact',
    example: 'john.doe@example.com',
  })
  @Column({ length: 255, nullable: true })
  emailContact: string;

  @ApiProperty({
    description: 'Codul unic al clientului',
    example: 'CL-12345',
  })
  @Column({ length: 50, unique: true, nullable: true })
  codClient: string;

  @ApiProperty({
    description: 'Statusul clientului',
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
  @ManyToOne(() => TipClient, tipClient => tipClient.clienti, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'tip_client_id' })
  tipClient: TipClient;

  @ManyToOne(() => Judet, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'judet_id' })
  judet: Judet;

  @ManyToOne(() => Localitate, localitate => localitate.clienti, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'localitate_id' })
  localitate: Localitate;

  @OneToMany(() => PunctColectare, punctColectare => punctColectare.client, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  puncteColectare: PunctColectare[];

  @OneToMany(() => Contract, contract => contract.client, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  contracte: Contract[];

  @OneToMany(() => PredictiiCantitati, predictiiCantitati => predictiiCantitati.client, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  predictiiCantitati: PredictiiCantitati[];
}
