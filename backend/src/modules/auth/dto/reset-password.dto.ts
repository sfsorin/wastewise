import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({
    description: 'Token-ul de resetare a parolei',
    example: 'abcdef123456',
  })
  @IsNotEmpty({ message: 'Token-ul este obligatoriu' })
  @IsString({ message: 'Token-ul trebuie să fie un șir de caractere' })
  token: string;

  @ApiProperty({
    description: 'Noua parolă',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Parola este obligatorie' })
  @IsString({ message: 'Parola trebuie să fie un șir de caractere' })
  @MinLength(8, { message: 'Parola trebuie să aibă cel puțin 8 caractere' })
  @MaxLength(50, { message: 'Parola trebuie să aibă cel mult 50 de caractere' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, {
    message:
      'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și un caracter special',
  })
  password: string;

  @ApiProperty({
    description: 'Confirmarea noii parole',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Confirmarea parolei este obligatorie' })
  @IsString({ message: 'Confirmarea parolei trebuie să fie un șir de caractere' })
  passwordConfirmation: string;
}
