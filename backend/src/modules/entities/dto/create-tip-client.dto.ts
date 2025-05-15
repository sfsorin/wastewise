import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateTipClientDto {
  @ApiProperty({
    description: 'Numele tipului de client',
    example: 'Persoană Fizică',
  })
  @IsNotEmpty({ message: 'Numele tipului de client este obligatoriu' })
  @IsString({ message: 'Numele tipului de client trebuie să fie un șir de caractere' })
  @Length(2, 100, {
    message: 'Numele tipului de client trebuie să aibă între 2 și 100 de caractere',
  })
  nume: string;

  @ApiProperty({
    description: 'Descrierea tipului de client',
    example: 'Client persoană fizică',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;
}
