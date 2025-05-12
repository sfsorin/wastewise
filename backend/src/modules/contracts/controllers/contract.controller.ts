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
import { ContractService } from '../services/contract.service';
import { CreateContractDto } from '../dto/create-contract.dto';
import { UpdateContractDto } from '../dto/update-contract.dto';
import { Contract } from '../entities/contract.entity';

@ApiTags('contracte')
@Controller('contracte')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({ summary: 'Creare contract nou' })
  @ApiBody({ type: CreateContractDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Contractul a fost creat cu succes.',
    type: Contract,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un contract cu același număr.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  create(@Body() createContractDto: CreateContractDto): Promise<Contract> {
    return this.contractService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obținere listă contracte' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de contracte a fost obținută cu succes.',
    type: [Contract],
  })
  findAll(): Promise<Contract[]> {
    return this.contractService.findAll();
  }

  @Get('active')
  @ApiOperation({ summary: 'Obținere contracte active' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de contracte active a fost obținută cu succes.',
    type: [Contract],
  })
  findActive(): Promise<Contract[]> {
    return this.contractService.findActive();
  }

  @Get('client/:clientId')
  @ApiOperation({ summary: 'Obținere contracte după clientul de care aparțin' })
  @ApiParam({ name: 'clientId', description: 'ID-ul clientului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de contracte a fost obținută cu succes.',
    type: [Contract],
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Clientul nu a fost găsit.',
  })
  findByClient(@Param('clientId') clientId: string): Promise<Contract[]> {
    return this.contractService.findByClient(clientId);
  }

  @Get('numar/:numarContract')
  @ApiOperation({ summary: 'Obținere contract după număr' })
  @ApiParam({ name: 'numarContract', description: 'Numărul contractului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contractul a fost găsit.',
    type: Contract,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul nu a fost găsit.',
  })
  findByNumber(@Param('numarContract') numarContract: string): Promise<Contract> {
    return this.contractService.findByNumber(numarContract);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obținere contract după ID' })
  @ApiParam({ name: 'id', description: 'ID-ul contractului' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contractul a fost găsit.',
    type: Contract,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul nu a fost găsit.',
  })
  findOne(@Param('id') id: string): Promise<Contract> {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizare contract' })
  @ApiParam({ name: 'id', description: 'ID-ul contractului' })
  @ApiBody({ type: UpdateContractDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Contractul a fost actualizat cu succes.',
    type: Contract,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul sau clientul nu a fost găsit.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Date invalide.',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Există deja un contract cu același număr.',
  })
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ): Promise<Contract> {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Ștergere contract' })
  @ApiParam({ name: 'id', description: 'ID-ul contractului' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Contractul a fost șters cu succes.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Contractul nu a fost găsit.',
  })
  remove(@Param('id') id: string): Promise<void> {
    return this.contractService.remove(id);
  }
}
