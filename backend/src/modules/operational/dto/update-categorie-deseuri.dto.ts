import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategorieDeseuriDto } from './create-categorie-deseuri.dto';

export class UpdateCategorieDeseuriDto extends PartialType(CreateCategorieDeseuriDto) {
  @ApiProperty({
    description: 'Numele categoriei',
    example: 'Hârtie și carton',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele categoriei trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele categoriei trebuie să aibă între 2 și 100 de caractere' })
  nume?: string;

  @ApiProperty({
    description: 'Descrierea categoriei',
    example: 'Deșeuri de hârtie și carton',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;

  @ApiProperty({
    description: 'Codul categoriei',
    example: 'H01',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Codul trebuie să aibă între 1 și 20 de caractere' })
  cod?: string;
}
