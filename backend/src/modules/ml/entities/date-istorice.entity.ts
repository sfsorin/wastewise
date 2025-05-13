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
import { UAT } from '../../geographic/entities/uat.entity';
import { CategorieDeseuri } from '../../operational/entities/categorie-deseuri.entity';

@Entity('date_istorice')
export class DateIstorice {
  @ApiProperty({
    description: 'ID-ul unic al înregistrării',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  uatId: string;

  @ApiProperty({
    description: 'ID-ul categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  categorieId: string;

  @ApiProperty({
    description: 'Data înregistrării',
    example: '2023-01-01',
  })
  @Column({ type: 'date' })
  data: Date;

  @ApiProperty({
    description: 'Cantitatea de deșeuri',
    example: 100.0,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cantitate: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'kg',
  })
  @Column({ length: 10, default: 'kg' })
  unitateMasura: string;

  @ApiProperty({
    description: 'Temperatura medie în ziua respectivă',
    example: 22.5,
  })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  temperatura: number;

  @ApiProperty({
    description: 'Cantitatea de precipitații',
    example: 10.5,
  })
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  precipitatii: number;

  @ApiProperty({
    description: 'Sezonul',
    example: 'vară',
  })
  @Column({ length: 20, nullable: true })
  sezon: string;

  @ApiProperty({
    description: 'Indicator pentru evenimente speciale',
    example: true,
  })
  @Column({ default: false })
  evenimentSpecial: boolean;

  @ApiProperty({
    description: 'Descrierea evenimentului special',
    example: 'Sărbători de iarnă',
  })
  @Column({ type: 'text', nullable: true })
  descriereEveniment: string;

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
  @ManyToOne(() => UAT, uat => uat.dateIstorice)
  @JoinColumn({ name: 'uat_id' })
  uat: UAT;

  @ManyToOne(() => CategorieDeseuri, categorieDeseuri => categorieDeseuri.dateIstorice)
  @JoinColumn({ name: 'categorie_id' })
  categorie: CategorieDeseuri;
}
