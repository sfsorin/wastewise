import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Creează un utilizator nou' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Utilizatorul a fost creat cu succes.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide. Verificați datele introduse.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Adresa de email este deja utilizată.',
  })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obține toți utilizatorii' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de utilizatori a fost obținută cu succes.',
    type: [User],
  })
  @ApiBearerAuth('JWT-auth')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obține un utilizator după ID' })
  @ApiParam({
    name: 'id',
    description: 'ID-ul utilizatorului',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilizatorul a fost găsit.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilizatorul nu a fost găsit.',
  })
  @ApiBearerAuth('JWT-auth')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizează un utilizator' })
  @ApiParam({
    name: 'id',
    description: 'ID-ul utilizatorului',
    type: 'string',
    format: 'uuid',
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Utilizatorul a fost actualizat cu succes.',
    type: User,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilizatorul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide. Verificați datele introduse.',
  })
  @ApiBearerAuth('JWT-auth')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Șterge un utilizator' })
  @ApiParam({
    name: 'id',
    description: 'ID-ul utilizatorului',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Utilizatorul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Utilizatorul nu a fost găsit.',
  })
  @ApiBearerAuth('JWT-auth')
  remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
