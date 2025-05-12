import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length } from 'class-validator';

export class CreateCategorieDeseuriDto {
  @ApiProperty({
    description: 'Numele categoriei',
    example: 'Hârtie și carton',
  })
  @IsNotEmpty({ message: 'Numele categoriei este obligatoriu' })
  @IsString({ message: 'Numele categoriei trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele categoriei trebuie să aibă între 2 și 100 de caractere' })
  nume: string;

  @ApiProperty({
    description: 'Descrierea categoriei',
    example: 'Deșeuri de hârtie și carton',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Descrierea trebuie să fie un șir de caractere' })
  descriere?: string;

  @ApiProperty({
    description: 'Codul categoriei',
    example: 'H01',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul trebuie să fie un șir de caractere' })
  @Length(1, 20, { message: 'Codul trebuie să aibă între 1 și 20 de caractere' })
  cod?: string;
}
