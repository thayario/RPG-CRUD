import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Personagens')
@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Post()
  @ApiOperation({ summary: 'Cadastrar Personagem' })
  @ApiResponse({ status: 201, description: 'Personagem criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  create(@Body() createCharacterDto: CreateCharacterDto) {
    return this.characterService.create(createCharacterDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar Personagens' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  findAll() {
    return this.characterService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar Personagem por Identificador' })
  @ApiResponse({ status: 201, description: 'Sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  async findOne(@Param('id') id: string) {
    return await this.characterService.findOne(+id);
  }

  @Patch(':id/name')
  @ApiOperation({ summary: 'Atualizar Nome Aventureiro por Identificador' })
  @ApiResponse({ status: 201, description: 'Nome de aventureiro atualizado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  updateName(@Param('id') id: string, @Body() dto: UpdateCharacterDto) {
    return this.characterService.updateName(+id, dto);
  }

  @Patch(':characterId/items/:itemId')
  @ApiOperation({ summary: 'Adicionar Item Mágico ao Personagem' })
  @ApiResponse({ status: 201, description: 'Item mágico adicionado com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  addItemToCharacter(
    @Param('characterId') characterId: string,
    @Param('itemId') itemId: string ) {
    return this.characterService.addItemToCharacter(+characterId, +itemId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover Personagem' })
  @ApiResponse({ status: 201, description: 'Personagem removido com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  remove(@Param('id') id: string) {
    return this.characterService.remove(+id);
  }

  @Delete(':characterId/items/:itemId')
  @ApiOperation({ summary: 'Remover Item Mágico do Personagem' })
  @ApiResponse({ status: 201, description: 'Item mágico removido com sucesso' })
  @ApiResponse({ status: 400, description: 'Erro de validação' })
  removeItemFromCharacter(
    @Param('characterId') characterId: string,
    @Param('itemId') itemId: string)
   {
    return this.characterService.removeItemFromCharacter(+characterId, +itemId);
  }
}
