import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UAT } from './uat.entity';

@Entity('zone_adi')
export class ZonaADI {
  @ApiProperty({
    description: 'ID-ul unic al zonei ADI',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele zonei ADI',
    example: 'Zona ADI Alba',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Codul zonei ADI',
    example: 'ADI-AB',
  })
  @Column({ length: 20, unique: true, nullable: true })
  cod: string;

  @ApiProperty({
    description: 'Descrierea zonei ADI',
    example: 'Zona ADI pentru județul Alba',
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
  @OneToMany(() => UAT, uat => uat.zonaADI)
  uaturi: UAT[];
}
