import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * DTO pentru cererea de reîmprospătare a token-ului JWT
 */
export class RefreshTokenDto {
  @ApiProperty({
    description: 'Token-ul de refresh',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  @IsNotEmpty({ message: 'Token-ul de refresh este obligatoriu' })
  @IsString({ message: 'Token-ul de refresh trebuie să fie un șir de caractere' })
  refreshToken: string;
}
