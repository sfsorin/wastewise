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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { PunctColectareService } from '../services/punct-colectare.service';
import { CreatePunctColectareDto } from '../dto/create-punct-colectare.dto';
import { UpdatePunctColectareDto } from '../dto/update-punct-colectare.dto';
import { PunctColectare } from '../entities/punct-colectare.entity';

@ApiTags('puncte-colectare')
@Controller('puncte-colectare')
export class PunctColectareController {
  constructor(private readonly punctColectareService: PunctColectareService) {}

  @Post()
  @ApiOperation({ summary: 'Creare punct de colectare nou' })
  @ApiBody({ type: CreatePunctColectareDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Punctul de colectare a fost creat cu succes.',
    type: PunctColectare,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul, județul sau localitatea nu a fost găsit.',
  })
  create(@Body() createPunctColectareDto: CreatePunctColectareDto): Promise<PunctColectare> {
    return this.punctColectareService.create(createPunctColectareDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obținere listă puncte de colectare' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de puncte de colectare a fost obținută cu succes.',
    type: [PunctColectare],
  })
  findAll(): Promise<PunctColectare[]> {
    return this.punctColectareService.findAll();
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Obținere puncte de colectare după clientul de care aparțin' })
  @ApiParam({ name: 'clientId', description: 'ID-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de puncte de colectare a fost obținută cu succes.',
    type: [PunctColectare],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByClient(@Param('clientId') clientId: string): Promise<PunctColectare[]> {
    return this.punctColectareService.findByClient(clientId);
  }

  @Get('localitate/:localitateId')
  @ApiOperation({ summary: 'Obținere puncte de colectare după localitatea de care aparțin' })
  @ApiParam({ name: 'localitateId', description: 'ID-ul localității' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de puncte de colectare a fost obținută cu succes.',
    type: [PunctColectare],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Localitatea nu a fost găsită.',
  })
  findByLocalitate(@Param('localitateId') localitateId: string): Promise<PunctColectare[]> {
    return this.punctColectareService.findByLocalitate(localitateId);
  }

  @Get('judet/:judetId')
  @ApiOperation({ summary: 'Obținere puncte de colectare după județul de care aparțin' })
  @ApiParam({ name: 'judetId', description: 'ID-ul județului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de puncte de colectare a fost obținută cu succes.',
    type: [PunctColectare],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Județul nu a fost găsit.',
  })
  findByJudet(@Param('judetId') judetId: string): Promise<PunctColectare[]> {
    return this.punctColectareService.findByJudet(judetId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obținere punct de colectare după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul punctului de colectare' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Punctul de colectare a fost găsit.',
    type: PunctColectare,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Punctul de colectare nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<PunctColectare> {
    return this.punctColectareService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizare punct de colectare' })
  @ApiParam({ name: 'id', description: 'ID-ul punctului de colectare' })
  @ApiBody({ type: UpdatePunctColectareDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Punctul de colectare a fost actualizat cu succes.',
    type: PunctColectare,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Punctul de colectare, clientul, județul sau localitatea nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  update(
    @Param('id') id: string,
    @Body() updatePunctColectareDto: UpdatePunctColectareDto,
  ): Promise<PunctColectare> {
    return this.punctColectareService.update(id, updatePunctColectareDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Ștergere punct de colectare' })
  @ApiParam({ name: 'id', description: 'ID-ul punctului de colectare' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Punctul de colectare a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Punctul de colectare nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.punctColectareService.remove(id);
  }
}
