/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class CharacterService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCharacterDto: CreateCharacterDto) {
    if (createCharacterDto.strength + createCharacterDto.defense > 10 ) {
      throw new BadRequestException('Inválido! A soma de força e defesa deve ser no máximo 10 pontos');
    }
    const character = await this.prisma.character.create({
      data: {
        ...createCharacterDto,
        magicItems: {
          create: createCharacterDto.magicItems ?? []
        }
      }
    });

    return character;
  }

  findAll() {
    return this.prisma.character.findMany({
      include: {
        magicItems: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.character.findUnique({
      where: { id },
        include: {
          magicItems: true,
        },
    });
  }

  async updateName(id: number, dto: UpdateCharacterDto) {
    const updated = this.prisma.character.update({
      where: { id },
      data: { characterName: dto.characterName },
    });

    return updated;
  }

  async addItemToCharacter(characterId: number, itemId: number) {
    const item = await this.prisma.magicItem.findUnique({
      where: { id: itemId },
    });

    if(!item) {
      throw new BadRequestException ("Item mágico não encotrado");
    }

    if (item.type === 'amulet') {
      const character = await this.prisma.character.findUnique({
        where: { id: characterId },
        include: { magicItems: true },
      });

      if (!character) {
        throw new BadRequestException('Personagem não encontrado');
      }

      const hasAmulet = character.magicItems.some(i => i.type === 'amulet');

      if (hasAmulet) {
        throw new BadRequestException ("Personagem já possui amuleto");
      }
    }
    const updatedMagicItem = await this.prisma.character.update({
      where: { id: characterId },
      data: {
        magicItems: {
          connect: { id: itemId },
        },
      },
    });
    return updatedMagicItem;
  }

  async remove(id: number) {
    return await this.prisma.character.delete({
      where: { id },
    });
  }

  async removeItemFromCharacter(characterId: number, itemId: number) {
    return this.prisma.character.update({
      where: { id: characterId },
      data: {
        magicItems: {
          disconnect: { id: itemId },
        },
      },
    });
  }

}
