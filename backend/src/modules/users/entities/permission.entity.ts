import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from './role.entity';

@Entity('permissions')
export class Permission {
  @ApiProperty({
    description: 'ID-ul unic al permisiunii',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele permisiunii',
    example: 'create:users',
  })
  @Column({ length: 100, unique: true })
  name: string;

  @ApiProperty({
    description: 'Descrierea permisiunii',
    example: 'Permite crearea utilizatorilor noi',
  })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({
    description: 'Data creării permisiunii',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ManyToMany(() => Role, role => role.permissions)
  roles: Role[];
}
