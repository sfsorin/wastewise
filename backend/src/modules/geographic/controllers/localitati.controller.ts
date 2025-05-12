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
import { LocalitatiService } from '../services/localitati.service';
import { CreateLocalitateDto } from '../dto/create-localitate.dto';
import { UpdateLocalitateDto } from '../dto/update-localitate.dto';
import { Localitate } from '../entities/localitate.entity';

@ApiTags('localitati')
@Controller('localitati')
@ApiBearerAuth()
export class LocalitatiController {
  constructor(private readonly localitatiService: LocalitatiService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare localitate nouă' })
  @ApiBody({ type: CreateLocalitateDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Localitatea a fost creată cu succes.',
    type: Localitate,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o localitate cu același cod SIRUTA.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  create(@Body() createLocalitateDto: CreateLocalitateDto): Promise<Localitate> {
    return this.localitatiService.create(createLocalitateDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă localități' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de localități a fost obținută cu succes.',
    type: [Localitate],
  })
  findAll(): Promise<Localitate[]> {
    return this.localitatiService.findAll();
  }

  @Get('judet/:judetId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere localități după județul de care aparțin' })
  @ApiParam({ name: 'judetId', description: 'ID-ul județului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de localități a fost obținută cu succes.',
    type: [Localitate],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  findByJudet(@Param('judetId') judetId: string): Promise<Localitate[]> {
    return this.localitatiService.findByJudet(judetId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere localitate după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul localității' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Localitatea a fost găsită.',
    type: Localitate,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Localitatea nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<Localitate> {
    return this.localitatiService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare localitate' })
  @ApiParam({ name: 'id', description: 'ID-ul localității' })
  @ApiBody({ type: UpdateLocalitateDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Localitatea a fost actualizată cu succes.',
    type: Localitate,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Localitatea sau județul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o localitate cu același cod SIRUTA.',
  })
  update(
    @Param('id') id: string,
    @Body() updateLocalitateDto: UpdateLocalitateDto,
  ): Promise<Localitate> {
    return this.localitatiService.update(id, updateLocalitateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere localitate' })
  @ApiParam({ name: 'id', description: 'ID-ul localității' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Localitatea a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Localitatea nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.localitatiService.remove(id);
  }
}
