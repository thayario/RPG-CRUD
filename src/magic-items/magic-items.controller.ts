import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Itens Mágicos')
@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar Item Mágico' })
  @ApiResponse({ status: 201, description: 'Item mágico criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  create(@Body() createMagicItemDto: CreateMagicItemDto) {
    return this.magicItemsService.create(createMagicItemDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Itens Mágicos' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  findAll() {
    return this.magicItemsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Item Mágico por Identificador' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  findOne(@Param('id') id: string) {
    return this.magicItemsService.findOne(+id);
  }


  @Get('by-character/:characterId')
  @ApiOperation({ summary: 'Listar Itens Mágicos por Personagem' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  findByCharacter(
    @Param('characterId') characterId: string) {
    return this.magicItemsService.findByCharacter(+characterId);
  }

  @Get(':characterId/amulet')
  @ApiOperation({ summary: 'Buscar Amuleto do Personagem' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  findAmuletFromCharacter(
    @Param('characterId') characterId: string) {
    return this.magicItemsService.findAmuletFromCharacter(+characterId);
  }

  @Delete(':id')  
  @ApiOperation({ summary: 'Remover Item Mágico' })
  @ApiResponse({ status: 201, description: 'Item Mágico removido com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  remove(@Param('id') id: string) {
    return this.magicItemsService.remove(+id);
  }
}


