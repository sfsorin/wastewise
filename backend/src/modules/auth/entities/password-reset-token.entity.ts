import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

@Entity('password_reset_tokens')
export class PasswordResetToken {
  @ApiProperty({
    description: 'ID-ul unic al token-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'ID-ul utilizatorului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Column()
  userId: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'Token-ul de resetare a parolei',
    example: 'abcdef123456',
  })
  @Column({ length: 100, unique: true })
  @Index()
  token: string;

  @ApiProperty({
    description: 'Data expirării token-ului',
    example: '2023-01-01T00:00:00Z',
  })
  @Column()
  expiresAt: Date;

  @ApiProperty({
    description: 'Indicator dacă token-ul a fost utilizat',
    example: false,
  })
  @Column({ default: false })
  used: boolean;

  @ApiProperty({
    description: 'Data creării token-ului',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
