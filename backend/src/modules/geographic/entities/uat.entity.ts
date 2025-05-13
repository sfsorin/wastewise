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
  @ManyToOne(() => Judet, judet => judet.uaturi)
  @JoinColumn({ name: 'judet_id' })
  judet: Judet;

  @OneToMany(() => DateIstorice, dateIstorice => dateIstorice.uat)
  dateIstorice: DateIstorice[];

  @OneToMany(() => PredictiiCantitati, predictiiCantitati => predictiiCantitati.uat)
  predictiiCantitati: PredictiiCantitati[];
}
