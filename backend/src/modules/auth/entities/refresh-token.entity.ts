import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';

/**
 * Entitate pentru stocarea token-urilor de refresh
 * Utilizată pentru reînnoirea token-urilor JWT de acces
 */
@Entity('refresh_tokens')
export class RefreshToken {
  @ApiProperty({
    description: 'ID-ul unic al token-ului de refresh',
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

  @ApiHideProperty()
  @Column({ length: 255 })
  @Index()
  token: string;

  @ApiProperty({
    description: 'User agent-ul clientului (browser, dispozitiv)',
    example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  })
  @Column({ type: 'text', nullable: true })
  userAgent: string;

  @ApiProperty({
    description: 'Adresa IP a clientului',
    example: '192.168.1.1',
  })
  @Column({ length: 45, nullable: true })
  ipAddress: string;

  @ApiProperty({
    description: 'Data expirării token-ului',
    example: '2023-01-01T00:00:00Z',
  })
  @Column()
  expiresAt: Date;

  @ApiProperty({
    description: 'Indicator dacă token-ul a fost revocat',
    example: false,
  })
  @Column({ default: false })
  isRevoked: boolean;

  @ApiProperty({
    description: 'Data creării token-ului',
    example: '2023-01-01T00:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;
}
