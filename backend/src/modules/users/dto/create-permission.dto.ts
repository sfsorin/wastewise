import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreatePermissionDto {
  @ApiProperty({
    description: 'Numele permisiunii',
    example: 'create:users',
  })
  @IsNotEmpty({ message: 'Numele permisiunii este obligatoriu' })
  @IsString({ message: 'Numele permisiunii trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele permisiunii trebuie să aibă între 2 și 100 de caractere' })
  name: string;

  @ApiProperty({
    description: 'Descrierea permisiunii',
    example: 'Permite crearea utilizatorilor noi',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea permisiunii trebuie să fie un șir de caractere' })
  description?: string;
}
