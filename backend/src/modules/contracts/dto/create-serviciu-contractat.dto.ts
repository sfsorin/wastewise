import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID, IsNumber, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateServiciuContractatDto {
  @ApiProperty({
    description: 'ID-ul contractului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID-ul contractului este obligatoriu' })
  @IsUUID('4', { message: 'ID-ul contractului trebuie să fie un UUID valid' })
  contractId: string;

  @ApiProperty({
    description: 'ID-ul serviciului',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsNotEmpty({ message: 'ID-ul serviciului este obligatoriu' })
  @IsUUID('4', { message: 'ID-ul serviciului trebuie să fie un UUID valid' })
  serviciuId: string;

  @ApiProperty({
    description: 'Cantitatea contractată',
    example: 10.0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Cantitatea trebuie să fie un număr' })
  @Min(0, { message: 'Cantitatea trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  cantitate?: number;

  @ApiProperty({
    description: 'Prețul unitar negociat',
    example: 100.0,
  })
  @IsNotEmpty({ message: 'Prețul unitar este obligatoriu' })
  @IsNumber({}, { message: 'Prețul unitar trebuie să fie un număr' })
  @Min(0, { message: 'Prețul unitar trebuie să fie un număr pozitiv' })
  @Type(() => Number)
  pretUnitar: number;

  @ApiProperty({
    description: 'Discount-ul aplicat',
    example: 10.0,
    default: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'Discount-ul trebuie să fie un număr' })
  @Min(0, { message: 'Discount-ul trebuie să fie un număr pozitiv' })
  @Max(100, { message: 'Discount-ul trebuie să fie maxim 100%' })
  @Type(() => Number)
  discount?: number;
}
