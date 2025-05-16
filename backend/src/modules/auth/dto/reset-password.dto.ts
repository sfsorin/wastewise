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
  @MinLength(10, { message: 'Parola trebuie să aibă cel puțin 10 caractere' })
  @MaxLength(50, { message: 'Parola trebuie să aibă cel mult 50 de caractere' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]{10,}$/,
    {
      message:
        'Parola trebuie să conțină cel puțin o literă mică, o literă mare, o cifră și un caracter special, și să aibă minim 10 caractere',
    },
  )
  @Matches(/^(?!.*(.)\1{2,}).*$/, {
    message: 'Parola nu poate conține același caracter repetat de mai mult de 2 ori consecutiv',
  })
  @Matches(/^(?!.*(password|123456|qwerty|admin)).*$/i, {
    message:
      'Parola nu poate conține cuvinte comune precum "password", "123456", "qwerty" sau "admin"',
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
