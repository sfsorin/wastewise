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
import { UATService } from '../services/uat.service';
import { CreateUATDto } from '../dto/create-uat.dto';
import { UpdateUATDto } from '../dto/update-uat.dto';
import { UAT } from '../entities/uat.entity';

@ApiTags('uat')
@Controller('uat')
@ApiBearerAuth()
export class UATController {
  constructor(private readonly uatService: UATService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare UAT nou' })
  @ApiBody({ type: CreateUATDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'UAT-ul a fost creat cu succes.',
    type: UAT,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un UAT cu același cod SIRUTA.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  create(@Body() createUATDto: CreateUATDto): Promise<UAT> {
    return this.uatService.create(createUATDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă UAT-uri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de UAT-uri a fost obținută cu succes.',
    type: [UAT],
  })
  findAll(): Promise<UAT[]> {
    return this.uatService.findAll();
  }

  @Get('judet/:judetId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere UAT-uri după județul de care aparțin' })
  @ApiParam({ name: 'judetId', description: 'ID-ul județului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de UAT-uri a fost obținută cu succes.',
    type: [UAT],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  findByJudet(@Param('judetId') judetId: string): Promise<UAT[]> {
    return this.uatService.findByJudet(judetId);
  }

  @Get('localitate/:localitateId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere UAT-uri după localitatea de care aparțin' })
  @ApiParam({ name: 'localitateId', description: 'ID-ul localității' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de UAT-uri a fost obținută cu succes.',
    type: [UAT],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Localitatea nu a fost găsită.',
  })
  findByLocalitate(@Param('localitateId') localitateId: string): Promise<UAT[]> {
    return this.uatService.findByLocalitate(localitateId);
  }

  @Get('zona-adi/:zonaADIId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere UAT-uri după zona ADI' })
  @ApiParam({ name: 'zonaADIId', description: 'ID-ul zonei ADI' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de UAT-uri a fost obținută cu succes.',
    type: [UAT],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona ADI nu a fost găsită.',
  })
  findByZonaADI(@Param('zonaADIId') zonaADIId: string): Promise<UAT[]> {
    return this.uatService.findByZonaADI(zonaADIId);
  }

  @Get('zona-iridex/:zonaIridexId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere UAT-uri după zona Iridex' })
  @ApiParam({ name: 'zonaIridexId', description: 'ID-ul zonei Iridex' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de UAT-uri a fost obținută cu succes.',
    type: [UAT],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Zona Iridex nu a fost găsită.',
  })
  findByZonaIridex(@Param('zonaIridexId') zonaIridexId: string): Promise<UAT[]> {
    return this.uatService.findByZonaIridex(zonaIridexId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere UAT după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul UAT-ului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UAT-ul a fost găsit.',
    type: UAT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<UAT> {
    return this.uatService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare UAT' })
  @ApiParam({ name: 'id', description: 'ID-ul UAT-ului' })
  @ApiBody({ type: UpdateUATDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'UAT-ul a fost actualizat cu succes.',
    type: UAT,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul sau județul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un UAT cu același cod SIRUTA.',
  })
  update(@Param('id') id: string, @Body() updateUATDto: UpdateUATDto): Promise<UAT> {
    return this.uatService.update(id, updateUATDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere UAT' })
  @ApiParam({ name: 'id', description: 'ID-ul UAT-ului' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'UAT-ul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.uatService.remove(id);
  }
}
