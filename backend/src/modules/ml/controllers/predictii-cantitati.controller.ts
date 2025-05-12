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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { PredictiiCantitatiService } from '../services/predictii-cantitati.service';
import { CreatePredictiiCantitatiDto } from '../dto/create-predictii-cantitati.dto';
import { UpdatePredictiiCantitatiDto } from '../dto/update-predictii-cantitati.dto';
import { PredictiiCantitati } from '../entities/predictii-cantitati.entity';

@ApiTags('predictii-cantitati')
@Controller('predictii-cantitati')
export class PredictiiCantitatiController {
  constructor(private readonly predictiiCantitatiService: PredictiiCantitatiService) {}

  @Post()
  @ApiOperation({ summary: 'Creare predicție cantități nouă' })
  @ApiBody({ type: CreatePredictiiCantitatiDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Predicția de cantități a fost creată cu succes.',
    type: PredictiiCantitati,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul, clientul, punctul de colectare sau categoria de deșeuri nu a fost găsită.',
  })
  create(@Body() createPredictiiCantitatiDto: CreatePredictiiCantitatiDto): Promise<PredictiiCantitati> {
    return this.predictiiCantitatiService.create(createPredictiiCantitatiDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obținere listă predicții cantități' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  findAll(): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findAll();
  }

  @Get('uat/:uatId')
  @ApiOperation({ summary: 'Obținere predicții cantități după UAT-ul de care aparțin' })
  @ApiParam({ name: 'uatId', description: 'ID-ul UAT-ului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul nu a fost găsit.',
  })
  findByUAT(@Param('uatId') uatId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findByUAT(uatId);
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Obținere predicții cantități după clientul de care aparțin' })
  @ApiParam({ name: 'clientId', description: 'ID-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByClient(@Param('clientId') clientId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findByClient(clientId);
  }

  @Get('punct-colectare/:punctColectareId')
  @ApiOperation({ summary: 'Obținere predicții cantități după punctul de colectare de care aparțin' })
  @ApiParam({ name: 'punctColectareId', description: 'ID-ul punctului de colectare' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Punctul de colectare nu a fost găsit.',
  })
  findByPunctColectare(@Param('punctColectareId') punctColectareId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findByPunctColectare(punctColectareId);
  }

  @Get('categorie/:categorieId')
  @ApiOperation({ summary: 'Obținere predicții cantități după categoria de deșeuri' })
  @ApiParam({ name: 'categorieId', description: 'ID-ul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  findByCategorie(@Param('categorieId') categorieId: string): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findByCategorie(categorieId);
  }

  @Get('perioada')
  @ApiOperation({ summary: 'Obținere predicții cantități după perioadă' })
  @ApiQuery({ name: 'startDate', description: 'Data de început a perioadei (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', description: 'Data de sfârșit a perioadei (YYYY-MM-DD)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de predicții cantități a fost obținută cu succes.',
    type: [PredictiiCantitati],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  findByPeriod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<PredictiiCantitati[]> {
    return this.predictiiCantitatiService.findByPeriod(startDate, endDate);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obținere predicție cantități după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul predicției de cantități' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Predicția de cantități a fost găsită.',
    type: PredictiiCantitati,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Predicția de cantități nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<PredictiiCantitati> {
    return this.predictiiCantitatiService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizare predicție cantități' })
  @ApiParam({ name: 'id', description: 'ID-ul predicției de cantități' })
  @ApiBody({ type: UpdatePredictiiCantitatiDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Predicția de cantități a fost actualizată cu succes.',
    type: PredictiiCantitati,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Predicția de cantități, UAT-ul, clientul, punctul de colectare sau categoria de deșeuri nu a fost găsită.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePredictiiCantitatiDto: UpdatePredictiiCantitatiDto,
  ): Promise<PredictiiCantitati> {
    return this.predictiiCantitatiService.update(id, updatePredictiiCantitatiDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Ștergere predicție cantități' })
  @ApiParam({ name: 'id', description: 'ID-ul predicției de cantități' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Predicția de cantități a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Predicția de cantități nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.predictiiCantitatiService.remove(id);
  }
}
