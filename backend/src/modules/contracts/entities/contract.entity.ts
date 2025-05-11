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
import { ServiciuContractat } from './serviciu-contractat.entity';

@Entity('contracte')
export class Contract {
  @ApiProperty({
    description: 'ID-ul unic al contractului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  clientId: string;

  @ApiProperty({
    description: 'Numărul contractului',
    example: 'CTR-2023-001',
  })
  @Column({ length: 50, unique: true })
  numarContract: string;

  @ApiProperty({
    description: 'Data de început a contractului',
    example: '2023-01-01',
  })
  @Column({ type: 'date' })
  dataInceput: Date;

  @ApiProperty({
    description: 'Data de sfârșit a contractului',
    example: '2024-01-01',
  })
  @Column({ type: 'date', nullable: true })
  dataSfarsit: Date;

  @ApiProperty({
    description: 'Valoarea contractului',
    example: 10000.00,
  })
  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  valoare: number;

  @ApiProperty({
    description: 'Moneda',
    example: 'RON',
  })
  @Column({ length: 3, default: 'RON' })
  moneda: string;

  @ApiProperty({
    description: 'Statusul contractului',
    example: 'active',
  })
  @Column({ length: 20, default: 'active' })
  status: string;

  @ApiProperty({
    description: 'Detalii suplimentare',
    example: 'Contract pentru servicii de colectare deșeuri menajere',
  })
  @Column({ type: 'text', nullable: true })
  detalii: string;

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
  @ManyToOne(() => Client, (client) => client.contracte)
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @OneToMany(() => ServiciuContractat, (serviciuContractat) => serviciuContractat.contract)
  serviciiContractate: ServiciuContractat[];
}
