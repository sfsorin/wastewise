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
import { CategorieDeseuriService } from '../services/categorie-deseuri.service';
import { CreateCategorieDeseuriDto } from '../dto/create-categorie-deseuri.dto';
import { UpdateCategorieDeseuriDto } from '../dto/update-categorie-deseuri.dto';
import { CategorieDeseuri } from '../entities/categorie-deseuri.entity';

@ApiTags('categorii-deseuri')
@Controller('categorii-deseuri')
@ApiBearerAuth()
export class CategorieDeseuriController {
  constructor(private readonly categorieDeseuriService: CategorieDeseuriService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare categorie de deșeuri nouă' })
  @ApiBody({ type: CreateCategorieDeseuriDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Categoria de deșeuri a fost creată cu succes.',
    type: CategorieDeseuri,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o categorie cu același nume sau cod.',
  })
  create(@Body() createCategorieDeseuriDto: CreateCategorieDeseuriDto): Promise<CategorieDeseuri> {
    return this.categorieDeseuriService.create(createCategorieDeseuriDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă categorii de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de categorii de deșeuri a fost obținută cu succes.',
    type: [CategorieDeseuri],
  })
  findAll(): Promise<CategorieDeseuri[]> {
    return this.categorieDeseuriService.findAll();
  }

  @Get('cod/:cod')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere categorie de deșeuri după cod' })
  @ApiParam({ name: 'cod', description: 'Codul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria de deșeuri a fost găsită.',
    type: CategorieDeseuri,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  findByCod(@Param('cod') cod: string): Promise<CategorieDeseuri> {
    return this.categorieDeseuriService.findByCod(cod);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere categorie de deșeuri după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria de deșeuri a fost găsită.',
    type: CategorieDeseuri,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  findOne(@Param('id') id: string): Promise<CategorieDeseuri> {
    return this.categorieDeseuriService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare categorie de deșeuri' })
  @ApiParam({ name: 'id', description: 'ID-ul categoriei de deșeuri' })
  @ApiBody({ type: UpdateCategorieDeseuriDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Categoria de deșeuri a fost actualizată cu succes.',
    type: CategorieDeseuri,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja o categorie cu același nume sau cod.',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategorieDeseuriDto: UpdateCategorieDeseuriDto,
  ): Promise<CategorieDeseuri> {
    return this.categorieDeseuriService.update(id, updateCategorieDeseuriDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere categorie de deșeuri' })
  @ApiParam({ name: 'id', description: 'ID-ul categoriei de deșeuri' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Categoria de deșeuri a fost ștearsă cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Categoria de deșeuri nu a fost găsită.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.categorieDeseuriService.remove(id);
  }
}
