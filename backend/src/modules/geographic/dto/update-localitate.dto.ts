import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsUUID } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateLocalitateDto } from './create-localitate.dto';

export class UpdateLocalitateDto extends PartialType(CreateLocalitateDto) {
  @ApiProperty({
    description: 'Numele localității',
    example: 'Alba Iulia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele localității trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele localității trebuie să aibă între 2 și 100 de caractere' })
  nume?: string;

  @ApiProperty({
    description: 'ID-ul județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul județului trebuie să fie un UUID valid' })
  judetId?: string;

  @ApiProperty({
    description: 'Codul SIRUTA al localității',
    example: '1001',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul SIRUTA trebuie să fie un șir de caractere' })
  @Length(1, 10, { message: 'Codul SIRUTA trebuie să aibă între 1 și 10 caractere' })
  codSiruta?: string;

  @ApiProperty({
    description: 'Tipul localității',
    example: 'municipiu',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Tipul localității trebuie să fie un șir de caractere' })
  @Length(2, 50, { message: 'Tipul localității trebuie să aibă între 2 și 50 de caractere' })
  tip?: string;

  @ApiProperty({
    description: 'ID-ul UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul UAT-ului trebuie să fie un UUID valid' })
  uatId?: string;
}
