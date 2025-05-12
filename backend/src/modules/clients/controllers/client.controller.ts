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
import { ClientService } from '../services/client.service';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';
import { Client } from '../entities/client.entity';

@ApiTags('clienti')
@Controller('clienti')
@ApiBearerAuth()
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Creare client nou' })
  @ApiBody({ type: CreateClientDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Clientul a fost creat cu succes.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un client cu același CUI, CNP sau cod client.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tipul de client, județul sau localitatea nu a fost găsit.',
  })
  create(@Body() createClientDto: CreateClientDto): Promise<Client> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere listă clienți' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de clienți a fost obținută cu succes.',
    type: [Client],
  })
  findAll(): Promise<Client[]> {
    return this.clientService.findAll();
  }

  @Get('tip-client/:tipClientId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere clienți după tipul de client' })
  @ApiParam({ name: 'tipClientId', description: 'ID-ul tipului de client' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de clienți a fost obținută cu succes.',
    type: [Client],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Tipul de client nu a fost găsit.',
  })
  findByTipClient(@Param('tipClientId') tipClientId: string): Promise<Client[]> {
    return this.clientService.findByTipClient(tipClientId);
  }

  @Get('cui/:cui')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere client după CUI' })
  @ApiParam({ name: 'cui', description: 'CUI-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clientul a fost găsit.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByCui(@Param('cui') cui: string): Promise<Client> {
    return this.clientService.findByCui(cui);
  }

  @Get('cnp/:cnp')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere client după CNP' })
  @ApiParam({ name: 'cnp', description: 'CNP-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clientul a fost găsit.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByCnp(@Param('cnp') cnp: string): Promise<Client> {
    return this.clientService.findByCnp(cnp);
  }

  @Get('cod/:codClient')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere client după codul clientului' })
  @ApiParam({ name: 'codClient', description: 'Codul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clientul a fost găsit.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByCodClient(@Param('codClient') codClient: string): Promise<Client> {
    return this.clientService.findByCodClient(codClient);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Obținere client după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clientul a fost găsit.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<Client> {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Actualizare client' })
  @ApiParam({ name: 'id', description: 'ID-ul clientului' })
  @ApiBody({ type: UpdateClientDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Clientul a fost actualizat cu succes.',
    type: Client,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul, tipul de client, județul sau localitatea nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un client cu același CUI, CNP sau cod client.',
  })
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto): Promise<Client> {
    return this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Ștergere client' })
  @ApiParam({ name: 'id', description: 'ID-ul clientului' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Clientul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.clientService.remove(id);
  }
}
