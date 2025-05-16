import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  ValidateIf,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'Confirmarea parolei',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Confirmarea parolei este obligatorie' })
  @IsString({ message: 'Confirmarea parolei trebuie să fie un șir de caractere' })
  passwordConfirmation?: string;
  @ApiProperty({
    description: 'Numele de utilizator',
    example: 'john.doe',
  })
  @IsNotEmpty({ message: 'Numele de utilizator este obligatoriu' })
  @IsString({ message: 'Numele de utilizator trebuie să fie un șir de caractere' })
  @MinLength(3, { message: 'Numele de utilizator trebuie să aibă cel puțin 3 caractere' })
  @MaxLength(50, { message: 'Numele de utilizator trebuie să aibă cel mult 50 de caractere' })
  @Matches(/^[a-zA-Z0-9._-]+$/, {
    message: 'Numele de utilizator poate conține doar litere, cifre, puncte, underscore și liniuțe',
  })
  username: string;

  @ApiProperty({
    description: 'Adresa de email',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Adresa de email este obligatorie' })
  @IsEmail({}, { message: 'Adresa de email trebuie să fie validă' })
  @MaxLength(255, { message: 'Adresa de email trebuie să aibă cel mult 255 de caractere' })
  email: string;

  @ApiProperty({
    description: 'Parola',
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
    description: 'Prenumele utilizatorului',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Prenumele trebuie să fie un șir de caractere' })
  @MaxLength(100, { message: 'Prenumele trebuie să aibă cel mult 100 de caractere' })
  firstName?: string;

  @ApiProperty({
    description: 'Numele de familie al utilizatorului',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele de familie trebuie să fie un șir de caractere' })
  @MaxLength(100, { message: 'Numele de familie trebuie să aibă cel mult 100 de caractere' })
  lastName?: string;

  @ApiProperty({
    description: 'Numele complet al utilizatorului',
    example: 'John Doe',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'Numele complet trebuie să fie un șir de caractere' })
  @MaxLength(100, { message: 'Numele complet trebuie să aibă cel mult 100 de caractere' })
  fullName?: string;

  @ApiProperty({
    description: 'Confirmarea parolei',
    example: 'Password123!',
  })
  @IsNotEmpty({ message: 'Confirmarea parolei este obligatorie' })
  @IsString({ message: 'Confirmarea parolei trebuie să fie un șir de caractere' })
  @ValidateIf(o => o.password !== undefined)
  @Matches(o => o.password, { message: 'Parolele nu coincid' })
  passwordConfirmation: string;
}
