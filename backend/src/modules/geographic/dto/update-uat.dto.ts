import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length, IsUUID, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUATDto } from './create-uat.dto';

export class UpdateUATDto extends PartialType(CreateUATDto) {
  @ApiProperty({
    description: 'Numele UAT-ului',
    example: 'Alba Iulia',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele UAT-ului trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele UAT-ului trebuie să aibă între 2 și 100 de caractere' })
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
    description: 'ID-ul localității',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul localității trebuie să fie un UUID valid' })
  localitateId?: string;

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
}
