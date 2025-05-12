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
import { JudeteService } from '../services/judete.service';
import { CreateJudetDto } from '../dto/create-judet.dto';
import { UpdateJudetDto } from '../dto/update-judet.dto';
import { Judet } from '../entities/judet.entity';

@ApiTags('judete')
@Controller('judete')
@ApiBearerAuth()
export class JudeteController {
  constructor(private readonly judeteService: JudeteService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare județ nou' })
  @ApiBody({ type: CreateJudetDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Județul a fost creat cu succes.',
    type: Judet,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un județ cu același cod SIRUTA sau cod auto.',
  })
  create(@Body() createJudetDto: CreateJudetDto): Promise<Judet> {
    return this.judeteService.create(createJudetDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă județe' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de județe a fost obținută cu succes.',
    type: [Judet],
  })
  findAll(): Promise<Judet[]> {
    return this.judeteService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere județ după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul județului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Județul a fost găsit.',
    type: Judet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<Judet> {
    return this.judeteService.findOne(id);
  }

  @Get('cod-auto/:codAuto')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere județ după codul auto' })
  @ApiParam({ name: 'codAuto', description: 'Codul auto al județului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Județul a fost găsit.',
    type: Judet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  findByCodAuto(@Param('codAuto') codAuto: string): Promise<Judet> {
    return this.judeteService.findByCodAuto(codAuto);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare județ' })
  @ApiParam({ name: 'id', description: 'ID-ul județului' })
  @ApiBody({ type: UpdateJudetDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Județul a fost actualizat cu succes.',
    type: Judet,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un județ cu același cod SIRUTA sau cod auto.',
  })
  update(@Param('id') id: string, @Body() updateJudetDto: UpdateJudetDto): Promise<Judet> {
    return this.judeteService.update(id, updateJudetDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere județ' })
  @ApiParam({ name: 'id', description: 'ID-ul județului' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Județul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.judeteService.remove(id);
  }
}
