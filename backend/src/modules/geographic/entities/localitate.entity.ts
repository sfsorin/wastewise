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
import { PunctColectare } from '../../operational/entities/punct-colectare.entity';
import { Client } from '../../clients/entities/client.entity';

@Entity('localitati')
export class Localitate {
  @ApiProperty({
    description: 'ID-ul unic al localității',
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

  @ApiProperty({
    description: 'Numele localității',
    example: 'Alba Iulia',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Codul SIRUTA al localității',
    example: '1001',
  })
  @Column({ length: 10, unique: true, nullable: true })
  codSiruta: string;

  @ApiProperty({
    description: 'Tipul localității',
    example: 'municipiu',
  })
  @Column({ length: 50, nullable: true })
  tip: string;

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
  @ManyToOne(() => Judet, judet => judet.localitati, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'judet_id' })
  judet: Judet;

  @OneToMany(() => PunctColectare, punctColectare => punctColectare.localitate, {
    cascade: true,
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  puncteColectare: PunctColectare[];

  @OneToMany(() => Client, client => client.localitate, {
    cascade: false,
    eager: false,
  })
  clienti: Client[];
}
