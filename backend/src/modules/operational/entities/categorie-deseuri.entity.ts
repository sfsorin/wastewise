import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { DateIstorice } from '../../ml/entities/date-istorice.entity';
import { PredictiiCantitati } from '../../ml/entities/predictii-cantitati.entity';

@Entity('categorii_deseuri')
export class CategorieDeseuri {
  @ApiProperty({
    description: 'ID-ul unic al categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele categoriei',
    example: 'Hârtie și carton',
  })
  @Column({ length: 100 })
  nume: string;

  @ApiProperty({
    description: 'Descrierea categoriei',
    example: 'Deșeuri de hârtie și carton',
  })
  @Column({ type: 'text', nullable: true })
  descriere: string;

  @ApiProperty({
    description: 'Codul categoriei',
    example: 'H01',
  })
  @Column({ length: 20, unique: true, nullable: true })
  cod: string;

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
  @OneToMany(() => DateIstorice, dateIstorice => dateIstorice.categorie)
  dateIstorice: DateIstorice[];

  @OneToMany(() => PredictiiCantitati, predictiiCantitati => predictiiCantitati.categorie)
  predictiiCantitati: PredictiiCantitati[];
}
