import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsUUID,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePunctColectareDto {
  @ApiProperty({
    description: 'Numele punctului de colectare',
    example: 'Punct Colectare Centru',
  })
  @IsNotEmpty({ message: 'Numele punctului de colectare este obligatoriu' })
  @IsString({ message: 'Numele punctului de colectare trebuie să fie un șir de caractere' })
  @Length(2, 100, {
    message: 'Numele punctului de colectare trebuie să aibă între 2 și 100 de caractere',
  })
  nume: string;

  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul clientului trebuie să fie un UUID valid' })
  clientId?: string;

  @ApiProperty({
    description: 'Adresa punctului de colectare',
    example: 'Str. Exemplu, Nr. 123',
  })
  @IsNotEmpty({ message: 'Adresa punctului de colectare este obligatorie' })
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere' })
  adresa: string;

  @ApiProperty({
    description: 'ID-ul județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul județului trebuie să fie un UUID valid' })
  judetId?: string;

  @ApiProperty({
    description: 'ID-ul localității',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul localității trebuie să fie un UUID valid' })
  localitateId?: string;

  @ApiProperty({
    description: 'Latitudinea geografică',
    example: 46.0688,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Latitudinea trebuie să fie un număr' })
  @Min(-90, { message: 'Latitudinea trebuie să fie între -90 și 90' })
  @Max(90, { message: 'Latitudinea trebuie să fie între -90 și 90' })
  @Type(() => Number)
  latitudine?: number;

  @ApiProperty({
    description: 'Longitudinea geografică',
    example: 23.5702,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Longitudinea trebuie să fie un număr' })
  @Min(-180, { message: 'Longitudinea trebuie să fie între -180 și 180' })
  @Max(180, { message: 'Longitudinea trebuie să fie între -180 și 180' })
  @Type(() => Number)
  longitudine?: number;

  @ApiProperty({
    description: 'Programul de funcționare',
    example: 'Luni-Vineri: 08:00-16:00, Sâmbătă: 09:00-13:00',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Programul trebuie să fie un șir de caractere' })
  program?: string;

  @ApiProperty({
    description: 'Statusul punctului de colectare',
    example: 'active',
    default: 'active',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Statusul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Statusul trebuie să aibă între 1 și 20 de caractere' })
  status?: string;
}
