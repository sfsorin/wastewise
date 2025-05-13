import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateZonaIridexDto } from './create-zona-iridex.dto';

export class UpdateZonaIridexDto extends PartialType(CreateZonaIridexDto) {
  @ApiProperty({
    description: 'Numele zonei Iridex',
    example: 'Zona Iridex 1',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele zonei Iridex trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele zonei Iridex trebuie să aibă între 2 și 100 de caractere' })
  nume?: string;

  @ApiProperty({
    description: 'Codul zonei Iridex',
    example: 'IR-01',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul zonei Iridex trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Codul zonei Iridex trebuie să aibă între 1 și 20 de caractere' })
  cod?: string;

  @ApiProperty({
    description: 'Descrierea zonei Iridex',
    example: 'Zona Iridex pentru colectare deșeuri menajere',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;
}
