import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ServiciuContractat } from './serviciu-contractat.entity';
import { CategorieDeseuri } from '../../operational/entities/categorie-deseuri.entity';

@Entity('servicii')
export class Serviciu {
  @ApiProperty({
    description: 'ID-ul unic al serviciului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele serviciului',
    example: 'Colectare deșeuri menajere',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Descrierea serviciului',
    example: 'Serviciu de colectare a deșeurilor menajere',
  })
  @Column({ type: 'text', nullable: true })
  descriere: string;

  @ApiProperty({
    description: 'Prețul unitar',
    example: 100.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  pretUnitar: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'tonă',
  })
  @Column({ length: 20, nullable: true })
  unitateMasura: string;

  @ApiProperty({
    description: 'ID-ul categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column({ nullable: true })
  categorieId: string;

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
  @ManyToOne(() => CategorieDeseuri)
  @JoinColumn({ name: 'categorie_id' })
  categorie: CategorieDeseuri;

  @OneToMany(() => ServiciuContractat, serviciuContractat => serviciuContractat.serviciu)
  serviciiContractate: ServiciuContractat[];
}
