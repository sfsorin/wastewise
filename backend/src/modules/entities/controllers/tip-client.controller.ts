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
import { TipClientService } from '../services/tip-client.service';
import { CreateTipClientDto } from '../dto/create-tip-client.dto';
import { UpdateTipClientDto } from '../dto/update-tip-client.dto';
import { TipClient } from '../entities/tip-client.entity';

@ApiTags('tipuri-client')
@Controller('tipuri-client')
@ApiBearerAuth()
export class TipClientController {
  constructor(private readonly tipClientService: TipClientService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare tip de client nou' })
  @ApiBody({ type: CreateTipClientDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Tipul de client a fost creat cu succes.',
    type: TipClient,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un tip de client cu același nume.',
  })
  create(@Body() createTipClientDto: CreateTipClientDto): Promise<TipClient> {
    return this.tipClientService.create(createTipClientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă tipuri de client' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de tipuri de client a fost obținută cu succes.',
    type: [TipClient],
  })
  findAll(): Promise<TipClient[]> {
    return this.tipClientService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere tip de client după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul tipului de client' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tipul de client a fost găsit.',
    type: TipClient,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tipul de client nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<TipClient> {
    return this.tipClientService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare tip de client' })
  @ApiParam({ name: 'id', description: 'ID-ul tipului de client' })
  @ApiBody({ type: UpdateTipClientDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Tipul de client a fost actualizat cu succes.',
    type: TipClient,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tipul de client nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un tip de client cu același nume.',
  })
  update(
    @Param('id') id: string,
    @Body() updateTipClientDto: UpdateTipClientDto,
  ): Promise<TipClient> {
    return this.tipClientService.update(id, updateTipClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere tip de client' })
  @ApiParam({ name: 'id', description: 'ID-ul tipului de client' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Tipul de client a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tipul de client nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.tipClientService.remove(id);
  }
}
