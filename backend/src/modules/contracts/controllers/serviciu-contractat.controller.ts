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
import { ServiciuContractatService } from '../services/serviciu-contractat.service';
import { CreateServiciuContractatDto } from '../dto/create-serviciu-contractat.dto';
import { UpdateServiciuContractatDto } from '../dto/update-serviciu-contractat.dto';
import { ServiciuContractat } from '../entities/serviciu-contractat.entity';

@ApiTags('servicii-contractate')
@Controller('servicii-contractate')
@ApiBearerAuth()
export class ServiciuContractatController {
  constructor(private readonly serviciuContractatService: ServiciuContractatService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare serviciu contractat nou' })
  @ApiBody({ type: CreateServiciuContractatDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Serviciul contractat a fost creat cu succes.',
    type: ServiciuContractat,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul sau serviciul nu a fost găsit.',
  })
  create(
    @Body() createServiciuContractatDto: CreateServiciuContractatDto,
  ): Promise<ServiciuContractat> {
    return this.serviciuContractatService.create(createServiciuContractatDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă servicii contractate' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de servicii contractate a fost obținută cu succes.',
    type: [ServiciuContractat],
  })
  findAll(): Promise<ServiciuContractat[]> {
    return this.serviciuContractatService.findAll();
  }

  @Get('contract/:contractId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere servicii contractate după contractul de care aparțin' })
  @ApiParam({ name: 'contractId', description: 'ID-ul contractului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de servicii contractate a fost obținută cu succes.',
    type: [ServiciuContractat],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul nu a fost găsit.',
  })
  findByContract(@Param('contractId') contractId: string): Promise<ServiciuContractat[]> {
    return this.serviciuContractatService.findByContract(contractId);
  }

  @Get('serviciu/:serviciuId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere servicii contractate după serviciul de care aparțin' })
  @ApiParam({ name: 'serviciuId', description: 'ID-ul serviciului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de servicii contractate a fost obținută cu succes.',
    type: [ServiciuContractat],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul nu a fost găsit.',
  })
  findByServiciu(@Param('serviciuId') serviciuId: string): Promise<ServiciuContractat[]> {
    return this.serviciuContractatService.findByServiciu(serviciuId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere serviciu contractat după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului contractat' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviciul contractat a fost găsit.',
    type: ServiciuContractat,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul contractat nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<ServiciuContractat> {
    return this.serviciuContractatService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare serviciu contractat' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului contractat' })
  @ApiBody({ type: UpdateServiciuContractatDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Serviciul contractat a fost actualizat cu succes.',
    type: ServiciuContractat,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul contractat, contractul sau serviciul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  update(
    @Param('id') id: string,
    @Body() updateServiciuContractatDto: UpdateServiciuContractatDto,
  ): Promise<ServiciuContractat> {
    return this.serviciuContractatService.update(id, updateServiciuContractatDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere serviciu contractat' })
  @ApiParam({ name: 'id', description: 'ID-ul serviciului contractat' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Serviciul contractat a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Serviciul contractat nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.serviciuContractatService.remove(id);
  }
}
