import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Localitate } from './localitate.entity';
import { UAT } from './uat.entity';

@Entity('judete')
export class Judet {
  @ApiProperty({
    description: 'ID-ul unic al județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele județului',
    example: 'Alba',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Codul SIRUTA al județului',
    example: '1',
  })
  @Column({ length: 10, unique: true, nullable: true })
  codSiruta: string;

  @ApiProperty({
    description: 'Codul auto al județului',
    example: 'AB',
  })
  @Column({ length: 2, unique: true, nullable: true })
  codAuto: string;

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
  @OneToMany(() => Localitate, localitate => localitate.judet)
  localitati: Localitate[];

  @OneToMany(() => UAT, uat => uat.judet)
  uaturi: UAT[];
}
