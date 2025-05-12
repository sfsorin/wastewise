import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsUUID,
  IsNumber,
  Min,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateContractDto {
  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID-ul clientului este obligatoriu' })
  @IsUUID('4', { message: 'ID-ul clientului trebuie să fie un UUID valid' })
  clientId: string;

  @ApiProperty({
    description: 'Numărul contractului',
    example: 'CTR-2023-001',
  })
  @IsNotEmpty({ message: 'Numărul contractului este obligatoriu' })
  @IsString({ message: 'Numărul contractului trebuie să fie un șir de caractere' })
  @Length(1, 50, { message: 'Numărul contractului trebuie să aibă între 1 și 50 de caractere' })
  numarContract: string;

  @ApiProperty({
    description: 'Data de început a contractului',
    example: '2023-01-01',
  })
  @IsNotEmpty({ message: 'Data de început a contractului este obligatorie' })
  @IsISO8601({}, { message: 'Data de început trebuie să fie în format ISO 8601 (YYYY-MM-DD)' })
  dataInceput: string;

  @ApiProperty({
    description: 'Data de sfârșit a contractului',
    example: '2024-01-01',
    required: false,
  })
  @IsOptional()
  @IsISO8601({}, { message: 'Data de sfârșit trebuie să fie în format ISO 8601 (YYYY-MM-DD)' })
  dataSfarsit?: string;

  @ApiProperty({
    description: 'Valoarea contractului',
    example: 10000.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Valoarea contractului trebuie să fie un număr' })
  @Min(0, { message: 'Valoarea contractului trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  valoare?: number;

  @ApiProperty({
    description: 'Moneda',
    example: 'RON',
    default: 'RON',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Moneda trebuie să fie un șir de caractere' })
  @Length(1, 3, { message: 'Moneda trebuie să aibă între 1 și 3 caractere' })
  moneda?: string;

  @ApiProperty({
    description: 'Statusul contractului',
    example: 'active',
    default: 'active',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Statusul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Statusul trebuie să aibă între 1 și 20 de caractere' })
  status?: string;

  @ApiProperty({
    description: 'Detalii suplimentare',
    example: 'Contract pentru servicii de colectare deșeuri menajere',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Detaliile trebuie să fie un șir de caractere' })
  detalii?: string;
}
