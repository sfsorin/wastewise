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
import { DateIstoriceService } from '../services/date-istorice.service';
import { CreateDateIstoriceDto } from '../dto/create-date-istorice.dto';
import { UpdateDateIstoriceDto } from '../dto/update-date-istorice.dto';
import { DateIstorice } from '../entities/date-istorice.entity';

@ApiTags('date-istorice')
@Controller('date-istorice')
export class DateIstoriceController {
  constructor(private readonly dateIstoriceService: DateIstoriceService) {}

  @Post()
  @ApiOperation({ summary: 'Creare înregistrare date istorice nouă' })
  @ApiBody({ type: CreateDateIstoriceDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Înregistrarea de date istorice a fost creată cu succes.',
    type: DateIstorice,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul sau categoria de deșeuri nu a fost găsită.',
  })
  create(@Body() createDateIstoriceDto: CreateDateIstoriceDto): Promise<DateIstorice> {
    return this.dateIstoriceService.create(createDateIstoriceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obținere listă date istorice' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de date istorice a fost obținută cu succes.',
    type: [DateIstorice],
  })
  findAll(): Promise<DateIstorice[]> {
    return this.dateIstoriceService.findAll();
  }

  @Get('uat/:uatId')
  @ApiOperation({ summary: 'Obținere date istorice după UAT-ul de care aparțin' })
  @ApiParam({ name: 'uatId', description: 'ID-ul UAT-ului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de date istorice a fost obținută cu succes.',
    type: [DateIstorice],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul nu a fost găsit.',
  })
  findByUAT(@Param('uatId') uatId: string): Promise<DateIstorice[]> {
    return this.dateIstoriceService.findByUAT(uatId);
  }

  @Get('categorie/:categorieId')
  @ApiOperation({ summary: 'Obținere date istorice după categoria de deșeuri' })
  @ApiParam({ name: 'categorieId', description: 'ID-ul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de date istorice a fost obținută cu succes.',
    type: [DateIstorice],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  findByCategorie(@Param('categorieId') categorieId: string): Promise<DateIstorice[]> {
    return this.dateIstoriceService.findByCategorie(categorieId);
  }

  @Get('perioada')
  @ApiOperation({ summary: 'Obținere date istorice după perioadă' })
  @ApiQuery({ name: 'startDate', description: 'Data de început a perioadei (YYYY-MM-DD)' })
  @ApiQuery({ name: 'endDate', description: 'Data de sfârșit a perioadei (YYYY-MM-DD)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de date istorice a fost obținută cu succes.',
    type: [DateIstorice],
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  findByPeriod(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<DateIstorice[]> {
    return this.dateIstoriceService.findByPeriod(startDate, endDate);
  }

  @Get('uat/:uatId/categorie/:categorieId')
  @ApiOperation({ summary: 'Obținere date istorice după UAT și categorie de deșeuri' })
  @ApiParam({ name: 'uatId', description: 'ID-ul UAT-ului' })
  @ApiParam({ name: 'categorieId', description: 'ID-ul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de date istorice a fost obținută cu succes.',
    type: [DateIstorice],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'UAT-ul sau categoria de deșeuri nu a fost găsită.',
  })
  findByUATAndCategorie(
    @Param('uatId') uatId: string,
    @Param('categorieId') categorieId: string,
  ): Promise<DateIstorice[]> {
    return this.dateIstoriceService.findByUATAndCategorie(uatId, categorieId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obținere înregistrare date istorice după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul înregistrării de date istorice' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Înregistrarea de date istorice a fost găsită.',
    type: DateIstorice,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Înregistrarea de date istorice nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<DateIstorice> {
    return this.dateIstoriceService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizare înregistrare date istorice' })
  @ApiParam({ name: 'id', description: 'ID-ul înregistrării de date istorice' })
  @ApiBody({ type: UpdateDateIstoriceDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Înregistrarea de date istorice a fost actualizată cu succes.',
    type: DateIstorice,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Înregistrarea de date istorice, UAT-ul sau categoria de deșeuri nu a fost găsită.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  update(
    @Param('id') id: string,
    @Body() updateDateIstoriceDto: UpdateDateIstoriceDto,
  ): Promise<DateIstorice> {
    return this.dateIstoriceService.update(id, updateDateIstoriceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Ștergere înregistrare date istorice' })
  @ApiParam({ name: 'id', description: 'ID-ul înregistrării de date istorice' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Înregistrarea de date istorice a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Înregistrarea de date istorice nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.dateIstoriceService.remove(id);
  }
}
