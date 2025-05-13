import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePredictiiCantitatiDto {
  @ApiProperty({
    description: 'ID-ul UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul UAT-ului trebuie să fie un UUID valid' })
  uatId?: string;

  @ApiProperty({
    description: 'ID-ul clientului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul clientului trebuie să fie un UUID valid' })
  clientId?: string;

  @ApiProperty({
    description: 'ID-ul punctului de colectare',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul punctului de colectare trebuie să fie un UUID valid' })
  punctColectareId?: string;

  @ApiProperty({
    description: 'ID-ul categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID-ul categoriei de deșeuri este obligatoriu' })
  @IsUUID('4', { message: 'ID-ul categoriei de deșeuri trebuie să fie un UUID valid' })
  categorieId: string;

  @ApiProperty({
    description: 'Data efectuării predicției',
    example: '2023-01-01',
  })
  @IsNotEmpty({ message: 'Data efectuării predicției este obligatorie' })
  @IsISO8601(
    {},
    { message: 'Data efectuării predicției trebuie să fie în format ISO 8601 (YYYY-MM-DD)' },
  )
  dataPredictie: string;

  @ApiProperty({
    description: 'Data de început a perioadei de predicție',
    example: '2023-01-01',
  })
  @IsNotEmpty({ message: 'Data de început a perioadei de predicție este obligatorie' })
  @IsISO8601(
    {},
    {
      message:
        'Data de început a perioadei de predicție trebuie să fie în format ISO 8601 (YYYY-MM-DD)',
    },
  )
  perioadaStart: string;

  @ApiProperty({
    description: 'Data de sfârșit a perioadei de predicție',
    example: '2023-12-31',
  })
  @IsNotEmpty({ message: 'Data de sfârșit a perioadei de predicție este obligatorie' })
  @IsISO8601(
    {},
    {
      message:
        'Data de sfârșit a perioadei de predicție trebuie să fie în format ISO 8601 (YYYY-MM-DD)',
    },
  )
  perioadaEnd: string;

  @ApiProperty({
    description: 'Cantitatea estimată de deșeuri',
    example: 1000.0,
  })
  @IsNotEmpty({ message: 'Cantitatea estimată de deșeuri este obligatorie' })
  @IsNumber({}, { message: 'Cantitatea estimată de deșeuri trebuie să fie un număr' })
  @Min(0, { message: 'Cantitatea estimată de deșeuri trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  cantitateEstimata: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'kg',
    default: 'kg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Unitatea de măsură trebuie să fie un șir de caractere' })
  unitateMasura?: string;

  @ApiProperty({
    description: 'Limita inferioară a intervalului de încredere',
    example: 900.0,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: 'Limita inferioară a intervalului de încredere trebuie să fie un număr' },
  )
  @Min(0, {
    message: 'Limita inferioară a intervalului de încredere trebuie să fie un număr pozitiv',
  })
  @Type(() => Number)
  intervalIncredereMin?: number;

  @ApiProperty({
    description: 'Limita superioară a intervalului de încredere',
    example: 1100.0,
    required: false,
  })
  @IsOptional()
  @IsNumber(
    {},
    { message: 'Limita superioară a intervalului de încredere trebuie să fie un număr' },
  )
  @Min(0, {
    message: 'Limita superioară a intervalului de încredere trebuie să fie un număr pozitiv',
  })
  @Type(() => Number)
  intervalIncredereMax?: number;

  @ApiProperty({
    description: 'Acuratețea predicției (%)',
    example: 85.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Acuratețea predicției trebuie să fie un număr' })
  @Min(0, { message: 'Acuratețea predicției trebuie să fie un număr pozitiv' })
  @Max(100, { message: 'Acuratețea predicției trebuie să fie maxim 100%' })
  @Type(() => Number)
  acuratetePredictie?: number;

  @ApiProperty({
    description: 'Modelul ML utilizat',
    example: 'RandomForest',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Modelul ML utilizat trebuie să fie un șir de caractere' })
  modelUtilizat?: string;

  @ApiProperty({
    description: 'Parametrii modelului',
    example: { n_estimators: 100, max_depth: 10 },
    required: false,
  })
  @IsOptional()
  parametriModel?: Record<string, number | string | boolean | null>;
}
