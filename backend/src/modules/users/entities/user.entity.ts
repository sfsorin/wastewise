import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  OPERATOR = 'operator',
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  PENDING = 'pending',
}

@Entity('users')
export class User {
  private static readonly logger = new Logger(User.name);
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
    description: 'Prenumele utilizatorului',
    example: 'John',
  })
  @Column({ length: 100, nullable: true })
  firstName: string;

  @ApiProperty({
    description: 'Numele de familie al utilizatorului',
    example: 'Doe',
  })
  @Column({ length: 100, nullable: true })
  lastName: string;

  @ApiProperty({
    description: 'Numele complet al utilizatorului',
    example: 'John Doe',
  })
  @Column({ length: 100, nullable: true })
  fullName: string;

  @ApiProperty({
    description: 'Adresa de email a utilizatorului',
    example: 'john.doe@example.com',
  })
  @Column({ length: 255, unique: true })
  email: string;

  @ApiHideProperty()
  @Column({ length: 255 })
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
    description: 'Statusul utilizatorului',
    enum: UserStatus,
    example: UserStatus.ACTIVE,
  })
  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @ApiProperty({
    description: 'Indică dacă utilizatorul este activ',
    example: true,
  })
  @Column({ default: true })
  isActive: boolean;

  @ApiProperty({
    description: 'Data ultimei autentificări',
    example: '2023-01-01T00:00:00Z',
  })
  @Column({ nullable: true })
  lastLogin: Date;

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

  @ManyToMany(() => Role, role => role.users, {
    cascade: ['insert', 'update'],
    eager: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Role[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    User.logger.debug(`Validare parolă pentru utilizatorul: ${this.username}`);
    User.logger.debug(`Hash parolă stocat: ${this.password}`);
    try {
      const isValid = await bcrypt.compare(password, this.password);
      User.logger.debug(`Rezultat comparare bcrypt: ${isValid}`);
      return isValid;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      User.logger.error(`Eroare la compararea parolelor: ${errorMessage}`);
      return false;
    }
  }

  // Metodă utilă pentru a genera numele complet din prenume și nume
  generateFullName(): void {
    if (this.firstName && this.lastName) {
      this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }
}
