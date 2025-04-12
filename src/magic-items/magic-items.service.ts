import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class MagicItemsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createMagicItemDto: CreateMagicItemDto) {
    if( createMagicItemDto.strength + createMagicItemDto.defense > 10 ) {
      throw new BadRequestException('Inválido! A soma de força e defesade itens deve ser no máximo 10 pontos');
    }

    if( createMagicItemDto.strength === 0 && createMagicItemDto.defense === 0 ) {
      throw new BadRequestException('Inválido! O item mágico não pode ter força e defesa iguais a 0.');
    }

    if( createMagicItemDto.type === 'Arma' && createMagicItemDto.defense !== 0 ) {
      throw new BadRequestException('Inválido! Item do tipo "arma" deve ter defesa igual a 0.');
    }

    if( createMagicItemDto.type === 'Armadura' && createMagicItemDto.strength !== 0 ) {
      throw new BadRequestException('Inválido! Item do tipo "armadura" deve ter força igual a 0.');
    }

    const magicItem = await this.prisma.magicItem.create({
      data: createMagicItemDto,
    });
    return magicItem;
  }

  findAll() {
    return this.prisma.magicItem.findMany();
  }

  findOne(id: number) {
    return this.prisma.magicItem.findUnique({
      where: { id },
    });
  }

  findByCharacter(characterId: number) {
    return this.prisma.magicItem.findMany({
      where: { characterId },
    });
  }

  findAmuletFromCharacter(characterId: number) {
    return this.prisma.magicItem.findMany({
      where: { 
        type: "Amuleto",
        characterId: characterId,
       },
    });
  }

  async remove(id: number) {
    return await this.prisma.magicItem.delete({
      where: { id },
    });
  }
}