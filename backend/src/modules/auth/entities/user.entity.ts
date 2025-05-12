import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @ApiProperty({
    description: 'ID-ul unic al utilizatorului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Numele de utilizator',
    example: 'john.doe',
  })
  @Column({ length: 50, unique: true })
  username: string;

  @ApiProperty({
    description: 'Adresa de email',
    example: 'john.doe@example.com',
  })
  @Column({ length: 255, unique: true })
  email: string;

  @Column({ length: 255 })
  password: string;

  @ApiProperty({
    description: 'Numele complet al utilizatorului',
    example: 'John Doe',
  })
  @Column({ length: 100, nullable: true })
  fullName: string;

  @ApiProperty({
    description: 'Rolul utilizatorului',
    example: 'admin',
  })
  @Column({ length: 20, default: 'user' })
  role: string;

  @ApiProperty({
    description: 'Statusul utilizatorului',
    example: 'active',
  })
  @Column({ length: 20, default: 'active' })
  status: string;

  @ApiProperty({
    description: 'Data ultimei autentificări',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({ nullable: true })
  lastLogin: Date;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // Verificăm dacă parola a fost modificată
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
