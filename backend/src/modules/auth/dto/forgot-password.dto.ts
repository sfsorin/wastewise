import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Adresa de email a utilizatorului',
    example: 'john.doe@example.com',
  })
  @IsNotEmpty({ message: 'Adresa de email este obligatorie' })
  @IsEmail({}, { message: 'Adresa de email trebuie să fie validă' })
  email: string;
}
