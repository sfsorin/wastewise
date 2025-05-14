import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  Length,
  IsUUID,
  IsNumber,
  Min,
  IsEmail,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateUATDto {
  @ApiProperty({
    description: 'Numele UAT-ului',
    example: 'Alba Iulia',
  })
  @IsNotEmpty({ message: 'Numele UAT-ului este obligatoriu' })
  @IsString({ message: 'Numele UAT-ului trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele UAT-ului trebuie să aibă între 2 și 100 de caractere' })
  nume: string;

  @ApiProperty({
    description: 'ID-ul județului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID-ul județului este obligatoriu' })
  @IsUUID('4', { message: 'ID-ul județului trebuie să fie un UUID valid' })
  judetId: string;

  // Eliminăm localitateId deoarece acum UAT are mai multe localități

  @ApiProperty({
    description: 'ID-ul zonei ADI',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul zonei ADI trebuie să fie un UUID valid' })
  zonaADIId?: string;

  @ApiProperty({
    description: 'ID-ul zonei Iridex',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul zonei Iridex trebuie să fie un UUID valid' })
  zonaIridexId?: string;

  @ApiProperty({
    description: 'Codul SIRUTA al UAT-ului',
    example: '1001',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul SIRUTA trebuie să fie un șir de caractere' })
  @Length(1, 10, { message: 'Codul SIRUTA trebuie să aibă între 1 și 10 caractere' })
  codSiruta?: string;

  @ApiProperty({
    description: 'Populația UAT-ului',
    example: 74000,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Populația trebuie să fie un număr' })
  @Min(0, { message: 'Populația trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  populatie?: number;

  @ApiProperty({
    description: 'Suprafața UAT-ului (km²)',
    example: 103.65,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Suprafața trebuie să fie un număr' })
  @Min(0, { message: 'Suprafața trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  suprafata?: number;

  @ApiProperty({
    description: 'Strada',
    example: 'Calea Moților',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Strada trebuie să fie un șir de caractere' })
  @Length(2, 200, { message: 'Strada trebuie să aibă între 2 și 200 de caractere' })
  strada?: string;

  @ApiProperty({
    description: 'Număr',
    example: '5A',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numărul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Numărul trebuie să aibă între 1 și 20 de caractere' })
  numar?: string;

  @ApiProperty({
    description: 'Telefon',
    example: '+40258123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefonul trebuie să fie un șir de caractere' })
  @Length(5, 20, { message: 'Telefonul trebuie să aibă între 5 și 20 de caractere' })
  telefon?: string;

  @ApiProperty({
    description: 'Telefon secundar',
    example: '+40258123457',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefonul secundar trebuie să fie un șir de caractere' })
  @Length(5, 20, { message: 'Telefonul secundar trebuie să aibă între 5 și 20 de caractere' })
  telefonSecundar?: string;

  @ApiProperty({
    description: 'Email',
    example: 'contact@primaria-albaiulia.ro',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Adresa de email trebuie să fie validă' })
  @Length(5, 100, { message: 'Email-ul trebuie să aibă între 5 și 100 de caractere' })
  email?: string;

  @ApiProperty({
    description: 'Email secundar',
    example: 'secretariat@primaria-albaiulia.ro',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Adresa de email secundară trebuie să fie validă' })
  @Length(5, 100, { message: 'Email-ul secundar trebuie să aibă între 5 și 100 de caractere' })
  emailSecundar?: string;

  @ApiProperty({
    description: 'Cod fiscal',
    example: '4562983',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul fiscal trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Codul fiscal trebuie să aibă între 1 și 20 de caractere' })
  codFiscal?: string;

  @ApiProperty({
    description: 'Primar',
    example: 'Ion Popescu',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele primarului trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele primarului trebuie să aibă între 2 și 100 de caractere' })
  primar?: string;
}
