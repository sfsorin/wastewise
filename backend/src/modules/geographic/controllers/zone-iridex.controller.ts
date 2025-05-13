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
import { ZoneIridexService } from '../services/zone-iridex.service';
import { CreateZonaIridexDto } from '../dto/create-zona-iridex.dto';
import { UpdateZonaIridexDto } from '../dto/update-zona-iridex.dto';
import { ZonaIridex } from '../entities/zona-iridex.entity';

@ApiTags('zone-iridex')
@Controller('zone-iridex')
@ApiBearerAuth()
export class ZoneIridexController {
  constructor(private readonly zoneIridexService: ZoneIridexService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare zonă Iridex nouă' })
  @ApiBody({ type: CreateZonaIridexDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Zona Iridex a fost creată cu succes.',
    type: ZonaIridex,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o zonă Iridex cu același nume sau cod.',
  })
  create(@Body() createZonaIridexDto: CreateZonaIridexDto): Promise<ZonaIridex> {
    return this.zoneIridexService.create(createZonaIridexDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă zone Iridex' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de zone Iridex a fost obținută cu succes.',
    type: [ZonaIridex],
  })
  findAll(): Promise<ZonaIridex[]> {
    return this.zoneIridexService.findAll();
  }

  @Get('cod/:cod')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere zonă Iridex după cod' })
  @ApiParam({ name: 'cod', description: 'Codul zonei Iridex' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona Iridex a fost găsită.',
    type: ZonaIridex,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona Iridex nu a fost găsită.',
  })
  findByCod(@Param('cod') cod: string): Promise<ZonaIridex> {
    return this.zoneIridexService.findByCod(cod);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere zonă Iridex după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei Iridex' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona Iridex a fost găsită.',
    type: ZonaIridex,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona Iridex nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<ZonaIridex> {
    return this.zoneIridexService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare zonă Iridex' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei Iridex' })
  @ApiBody({ type: UpdateZonaIridexDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Zona Iridex a fost actualizată cu succes.',
    type: ZonaIridex,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona Iridex nu a fost găsită.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o zonă Iridex cu același nume sau cod.',
  })
  update(
    @Param('id') id: string,
    @Body() updateZonaIridexDto: UpdateZonaIridexDto,
  ): Promise<ZonaIridex> {
    return this.zoneIridexService.update(id, updateZonaIridexDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere zonă Iridex' })
  @ApiParam({ name: 'id', description: 'ID-ul zonei Iridex' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Zona Iridex a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona Iridex nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.zoneIridexService.remove(id);
  }
}
