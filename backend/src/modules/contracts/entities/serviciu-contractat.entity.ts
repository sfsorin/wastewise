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
import { Contract } from './contract.entity';
import { Serviciu } from './serviciu.entity';

@Entity('servicii_contractate')
export class ServiciuContractat {
  @ApiProperty({
    description: 'ID-ul unic al serviciului contractat',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul contractului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  contractId: string;

  @ApiProperty({
    description: 'ID-ul serviciului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  serviciuId: string;

  @ApiProperty({
    description: 'Cantitatea contractată',
    example: 10.00,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  cantitate: number;

  @ApiProperty({
    description: 'Prețul unitar negociat',
    example: 100.00,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pretUnitar: number;

  @ApiProperty({
    description: 'Discount-ul aplicat',
    example: 10.00,
  })
  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  discount: number;

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
  @ManyToOne(() => Contract, (contract) => contract.serviciiContractate)
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @ManyToOne(() => Serviciu, (serviciu) => serviciu.serviciiContractate)
  @JoinColumn({ name: 'serviciu_id' })
  serviciu: Serviciu;
}
