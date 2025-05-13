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
import { ZoneADIService } from '../services/zone-adi.service';
import { CreateZonaADIDto } from '../dto/create-zona-adi.dto';
import { UpdateZonaADIDto } from '../dto/update-zona-adi.dto';
import { ZonaADI } from '../entities/zona-adi.entity';

@ApiTags('zone-adi')
@Controller('zone-adi')
@ApiBearerAuth()
export class ZoneADIController {
  constructor(private readonly zoneADIService: ZoneADIService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare zonă ADI nouă' })
  @ApiBody({ type: CreateZonaADIDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Zona ADI a fost creată cu succes.',
    type: ZonaADI,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o zonă ADI cu același nume sau cod.',
  })
  create(@Body() createZonaADIDto: CreateZonaADIDto): Promise<ZonaADI> {
    return this.zoneADIService.create(createZonaADIDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă zone ADI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de zone ADI a fost obținută cu succes.',
    type: [ZonaADI],
  })
  findAll(): Promise<ZonaADI[]> {
    return this.zoneADIService.findAll();
  }

  @Get('cod/:cod')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere zonă ADI după cod' })
  @ApiParam({ name: 'cod', description: 'Codul zonei ADI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona ADI a fost găsită.',
    type: ZonaADI,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona ADI nu a fost găsită.',
  })
  findByCod(@Param('cod') cod: string): Promise<ZonaADI> {
    return this.zoneADIService.findByCod(cod);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere zonă ADI după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei ADI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona ADI a fost găsită.',
    type: ZonaADI,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona ADI nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<ZonaADI> {
    return this.zoneADIService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare zonă ADI' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei ADI' })
  @ApiBody({ type: UpdateZonaADIDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona ADI a fost actualizată cu succes.',
    type: ZonaADI,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona ADI nu a fost găsită.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o zonă ADI cu același nume sau cod.',
  })
  update(
    @Param('id') id: string,
    @Body() updateZonaADIDto: UpdateZonaADIDto,
  ): Promise<ZonaADI> {
    return this.zoneADIService.update(id, updateZonaADIDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere zonă ADI' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei ADI' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Zona ADI a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona ADI nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.zoneADIService.remove(id);
  }
}
