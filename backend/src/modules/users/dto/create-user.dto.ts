import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({
    description: 'Prenumele utilizatorului',
    example: 'John',
  })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'Numele de familie al utilizatorului',
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    description: 'Adresa de email a utilizatorului',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Parola utilizatorului (minim 6 caractere)',
    example: 'password123',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiPropertyOptional({
    description: 'Rolul utilizatorului',
    enum: UserRole,
    default: UserRole.USER,
  })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
