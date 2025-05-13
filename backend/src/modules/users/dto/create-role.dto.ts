import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length, IsArray, IsUUID } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    description: 'Numele rolului',
    example: 'admin',
  })
  @IsNotEmpty({ message: 'Numele rolului este obligatoriu' })
  @IsString({ message: 'Numele rolului trebuie să fie un șir de caractere' })
  @Length(2, 50, { message: 'Numele rolului trebuie să aibă între 2 și 50 de caractere' })
  name: string;

  @ApiProperty({
    description: 'Descrierea rolului',
    example: 'Administrator cu acces complet la sistem',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea rolului trebuie să fie un șir de caractere' })
  description?: string;

  @ApiProperty({
    description: 'Lista de ID-uri ale permisiunilor asociate rolului',
    example: ['123e4567-e89b-12d3-a456-426614174000', '123e4567-e89b-12d3-a456-426614174001'],
    required: false,
    type: [String],
  })
  @IsOptional()
  @IsArray({ message: 'Lista de permisiuni trebuie să fie un array' })
  @IsUUID('4', { each: true, message: 'Fiecare ID de permisiune trebuie să fie un UUID valid' })
  permissionIds?: string[];
}
