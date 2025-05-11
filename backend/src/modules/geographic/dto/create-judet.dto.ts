import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, Length, Matches } from 'class-validator';

export class CreateJudetDto {
  @ApiProperty({
    description: 'Numele județului',
    example: 'Alba',
  })
  @IsNotEmpty({ message: 'Numele județului este obligatoriu' })
  @IsString({ message: 'Numele județului trebuie să fie un șir de caractere' })
  @Length(2, 100, { message: 'Numele județului trebuie să aibă între 2 și 100 de caractere' })
  nume: string;

  @ApiProperty({
    description: 'Codul SIRUTA al județului',
    example: '1',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul SIRUTA trebuie să fie un șir de caractere' })
  @Length(1, 10, { message: 'Codul SIRUTA trebuie să aibă între 1 și 10 caractere' })
  codSiruta?: string;

  @ApiProperty({
    description: 'Codul auto al județului',
    example: 'AB',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Codul auto trebuie să fie un șir de caractere' })
  @Length(1, 2, { message: 'Codul auto trebuie să aibă între 1 și 2 caractere' })
  @Matches(/^[A-Z]{1,2}$/, { message: 'Codul auto trebuie să conțină doar litere mari' })
  codAuto?: string;
}
