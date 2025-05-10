import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  OPERATOR = 'operator',
}

@Entity('users')
export class User {
  @ApiProperty({
    description: 'ID-ul unic al utilizatorului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Prenumele utilizatorului',
    example: 'John',
  })
  @Column({ length: 100 })
  firstName: string;

  @ApiProperty({
    description: 'Numele de familie al utilizatorului',
    example: 'Doe',
  })
  @Column({ length: 100 })
  lastName: string;

  @ApiProperty({
    description: 'Adresa de email a utilizatorului',
    example: 'john.doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiHideProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    description: 'Rolul utilizatorului',
    enum: UserRole,
    example: UserRole.USER,
  })
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @ApiProperty({
    description: 'Indică dacă utilizatorul este activ',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Data creării utilizatorului',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Data ultimei actualizări a utilizatorului',
    example: '2023-01-01T00:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
