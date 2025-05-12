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
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { ServiciuService } from '../services/serviciu.service';
import { CreateServiciuDto } from '../dto/create-serviciu.dto';
import { UpdateServiciuDto } from '../dto/update-serviciu.dto';
import { Serviciu } from '../entities/serviciu.entity';

@ApiTags('servicii')
@Controller('servicii')
@ApiBearerAuth()
export class ServiciuController {
  constructor(private readonly serviciuService: ServiciuService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare serviciu nou' })
  @ApiBody({ type: CreateServiciuDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Serviciul a fost creat cu succes.',
    type: Serviciu,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un serviciu cu același nume.',
  })
  create(@Body() createServiciuDto: CreateServiciuDto): Promise<Serviciu> {
    return this.serviciuService.create(createServiciuDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă servicii' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de servicii a fost obținută cu succes.',
    type: [Serviciu],
  })
  findAll(): Promise<Serviciu[]> {
    return this.serviciuService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere serviciu după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviciul a fost găsit.',
    type: Serviciu,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<Serviciu> {
    return this.serviciuService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare serviciu' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului' })
  @ApiBody({ type: UpdateServiciuDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviciul a fost actualizat cu succes.',
    type: Serviciu,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un serviciu cu același nume.',
  })
  update(@Param('id') id: string, @Body() updateServiciuDto: UpdateServiciuDto): Promise<Serviciu> {
    return this.serviciuService.update(id, updateServiciuDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere serviciu' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Serviciul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.serviciuService.remove(id);
  }
}
