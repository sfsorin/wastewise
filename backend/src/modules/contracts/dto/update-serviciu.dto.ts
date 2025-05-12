import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateServiciuDto } from './create-serviciu.dto';

export class UpdateServiciuDto extends PartialType(CreateServiciuDto) {
  @ApiProperty({
    description: 'Numele serviciului',
    example: 'Colectare deșeuri menajere',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele serviciului trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele serviciului trebuie să aibă între 2 și 100 de caractere' })
  nume?: string;

  @ApiProperty({
    description: 'Descrierea serviciului',
    example: 'Serviciu de colectare a deșeurilor menajere',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;

  @ApiProperty({
    description: 'Prețul unitar',
    example: 100.00,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Prețul unitar trebuie să fie un număr' })
  @Min(0, { message: 'Prețul unitar trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  pretUnitar?: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'tonă',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Unitatea de măsură trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Unitatea de măsură trebuie să aibă între 1 și 20 de caractere' })
  unitateMasura?: string;
}
