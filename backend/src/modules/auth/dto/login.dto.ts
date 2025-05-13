import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Numele de utilizator sau adresa de email',
    example: 'john.doe',
  })
  @IsNotEmpty({ message: 'Numele de utilizator sau adresa de email este obligatorie' })
  @IsString({
    message: 'Numele de utilizator sau adresa de email trebuie să fie un șir de caractere',
  })
  username: string;

  @ApiProperty({
    description: 'Parola',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Parola este obligatorie' })
  @IsString({ message: 'Parola trebuie să fie un șir de caractere' })
  password: string;
}
