import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from './client.entity';

@Entity('tipuri_client')
export class TipClient {
  @ApiProperty({
    description: 'ID-ul unic al tipului de client',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele tipului de client',
    example: 'Persoană Fizică',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Descrierea tipului de client',
    example: 'Client persoană fizică',
  })
  @Column({ type: 'text', nullable: true })
  descriere: string;

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
  @OneToMany(() => Client, (client) => client.tipClient)
  clienti: Client[];
}
