import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsBoolean } from 'class-validator';
import { UserStatus } from '../entities/user.entity';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'Toate câmpurile sunt opționale în cazul actualizării',
    required: false,
  })
  _description?: string;

  @ApiProperty({
    description: 'Indică dacă utilizatorul este activ',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    description: 'Statusul utilizatorului',
    enum: UserStatus,
    required: false,
  })
  @IsOptional()
  status?: UserStatus;
}
