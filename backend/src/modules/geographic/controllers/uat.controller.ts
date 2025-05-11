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
import { UATService } from '../services/uat.service';
import { CreateUATDto } from '../dto/create-uat.dto';
import { UpdateUATDto } from '../dto/update-uat.dto';
import { UAT } from '../entities/uat.entity';

@ApiTags('uat')
@Controller('uat')
export class UATController {
  constructor(private readonly uatService: UATService) {}

  @Post()
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

  @Get(':id')
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
  update(
    @Param('id') id: string,
    @Body() updateUATDto: UpdateUATDto,
  ): Promise<UAT> {
    return this.uatService.update(id, updateUATDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
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
