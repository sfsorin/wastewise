import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsISO8601,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateDateIstoriceDto } from './create-date-istorice.dto';

export class UpdateDateIstoriceDto extends PartialType(CreateDateIstoriceDto) {
  @ApiProperty({
    description: 'ID-ul UAT-ului',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul UAT-ului trebuie să fie un UUID valid' })
  uatId?: string;

  @ApiProperty({
    description: 'ID-ul categoriei de deșeuri',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul categoriei de deșeuri trebuie să fie un UUID valid' })
  categorieId?: string;

  @ApiProperty({
    description: 'Data înregistrării',
    example: '2023-01-01',
    required: false,
  })
  @IsOptional()
  @IsISO8601({}, { message: 'Data înregistrării trebuie să fie în format ISO 8601 (YYYY-MM-DD)' })
  data?: string;

  @ApiProperty({
    description: 'Cantitatea de deșeuri',
    example: 100.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Cantitatea de deșeuri trebuie să fie un număr' })
  @Min(0, { message: 'Cantitatea de deșeuri trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  cantitate?: number;

  @ApiProperty({
    description: 'Unitatea de măsură',
    example: 'kg',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Unitatea de măsură trebuie să fie un șir de caractere' })
  unitateMasura?: string;

  @ApiProperty({
    description: 'Temperatura medie în ziua respectivă',
    example: 22.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Temperatura trebuie să fie un număr' })
  @Min(-50, { message: 'Temperatura trebuie să fie mai mare de -50°C' })
  @Max(50, { message: 'Temperatura trebuie să fie mai mică de 50°C' })
  @Type(() => Number)
  temperatura?: number;

  @ApiProperty({
    description: 'Cantitatea de precipitații',
    example: 10.5,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Cantitatea de precipitații trebuie să fie un număr' })
  @Min(0, { message: 'Cantitatea de precipitații trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  precipitatii?: number;

  @ApiProperty({
    description: 'Sezonul',
    example: 'vară',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Sezonul trebuie să fie un șir de caractere' })
  sezon?: string;

  @ApiProperty({
    description: 'Indicator pentru evenimente speciale',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean({
    message: 'Indicatorul pentru evenimente speciale trebuie să fie o valoare booleană',
  })
  @Type(() => Boolean)
  evenimentSpecial?: boolean;

  @ApiProperty({
    description: 'Descrierea evenimentului special',
    example: 'Sărbători de iarnă',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea evenimentului special trebuie să fie un șir de caractere' })
  descriereEveniment?: string;
}
