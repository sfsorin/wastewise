import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateZonaADIDto {
  @ApiProperty({
    description: 'Numele zonei ADI',
    example: 'Zona ADI Alba',
  })
  @IsNotEmpty({ message: 'Numele zonei ADI este obligatoriu' })
  @IsString({ message: 'Numele zonei ADI trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele zonei ADI trebuie să aibă între 2 și 100 de caractere' })
  nume: string;

  @ApiProperty({
    description: 'Codul zonei ADI',
    example: 'ADI-AB',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul zonei ADI trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Codul zonei ADI trebuie să aibă între 1 și 20 de caractere' })
  cod?: string;

  @ApiProperty({
    description: 'Descrierea zonei ADI',
    example: 'Zona ADI pentru județul Alba',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;
}
