import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePermissionDto } from './create-permission.dto';

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {
  @ApiProperty({
    description: 'Numele permisiunii',
    example: 'create:users',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele permisiunii trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele permisiunii trebuie să aibă între 2 și 100 de caractere' })
  name?: string;

  @ApiProperty({
    description: 'Descrierea permisiunii',
    example: 'Permite crearea utilizatorilor noi',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea permisiunii trebuie să fie un șir de caractere' })
  description?: string;
}
