import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
  IsUUID,
  IsEmail,
  Matches,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @ApiProperty({
    description: 'Numele clientului',
    example: 'SC Example SRL',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele clientului trebuie să fie un șir de caractere' })
  @Length(2, 200, { message: 'Numele clientului trebuie să aibă între 2 și 200 de caractere' })
  nume?: string;

  @ApiProperty({
    description: 'ID-ul tipului de client',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: false,
  })
  @IsOptional()
  @IsUUID('4', { message: 'ID-ul tipului de client trebuie să fie un UUID valid' })
  tipClientId?: string;

  @ApiProperty({
    description: 'Codul Unic de Identificare (pentru persoane juridice)',
    example: 'RO12345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CUI-ul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'CUI-ul trebuie să aibă între 1 și 20 de caractere' })
  cui?: string;

  @ApiProperty({
    description: 'Codul Numeric Personal (pentru persoane fizice)',
    example: '1234567890123',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'CNP-ul trebuie să fie un șir de caractere' })
  @Length(13, 13, { message: 'CNP-ul trebuie să aibă exact 13 caractere' })
  @Matches(/^[0-9]{13}$/, { message: 'CNP-ul trebuie să conțină doar cifre' })
  cnp?: string;

  @ApiProperty({
    description: 'Adresa clientului',
    example: 'Str. Exemplu, Nr. 123, Bl. A1, Sc. 1, Ap. 10',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Adresa trebuie să fie un șir de caractere' })
  adresa?: string;

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
    description: 'Codul poștal',
    example: '123456',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul poștal trebuie să fie un șir de caractere' })
  @Length(1, 10, { message: 'Codul poștal trebuie să aibă între 1 și 10 caractere' })
  codPostal?: string;

  @ApiProperty({
    description: 'Adresa de email',
    example: 'contact@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Adresa de email trebuie să fie validă' })
  @Length(5, 255, { message: 'Adresa de email trebuie să aibă între 5 și 255 de caractere' })
  email?: string;

  @ApiProperty({
    description: 'Numărul de telefon',
    example: '+40712345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numărul de telefon trebuie să fie un șir de caractere' })
  @Length(5, 20, { message: 'Numărul de telefon trebuie să aibă între 5 și 20 de caractere' })
  telefon?: string;

  @ApiProperty({
    description: 'Persoana de contact',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Persoana de contact trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Persoana de contact trebuie să aibă între 2 și 100 de caractere' })
  persoanaContact?: string;

  @ApiProperty({
    description: 'Telefonul persoanei de contact',
    example: '+40712345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Telefonul persoanei de contact trebuie să fie un șir de caractere' })
  @Length(5, 20, { message: 'Telefonul persoanei de contact trebuie să aibă între 5 și 20 de caractere' })
  telefonContact?: string;

  @ApiProperty({
    description: 'Email-ul persoanei de contact',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'Email-ul persoanei de contact trebuie să fie valid' })
  @Length(5, 255, { message: 'Email-ul persoanei de contact trebuie să aibă între 5 și 255 de caractere' })
  emailContact?: string;

  @ApiProperty({
    description: 'Codul unic al clientului',
    example: 'CL-12345',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul clientului trebuie să fie un șir de caractere' })
  @Length(1, 50, { message: 'Codul clientului trebuie să aibă între 1 și 50 de caractere' })
  codClient?: string;

  @ApiProperty({
    description: 'Statusul clientului',
    example: 'active',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Statusul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Statusul trebuie să aibă între 1 și 20 de caractere' })
  status?: string;
}
