import { Type } from 'class-transformer';
import {
  IsEnum,
  IsString,
  IsInt,
  IsNotEmpty,
  Min,
  Max,
  ValidateNested,
  IsOptional
} from 'class-validator';
import { CreateMagicItemDto } from '../../magic-items/dto/create-magic-item.dto';

// Declare o enum FORA da classe
export enum Class {
  Guerreiro = 'Guerreiro',
  Mago = 'Mago',
  Arqueiro = 'Arqueiro',
  Ladino = 'Ladino',
}

export class CreateCharacterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  characterName: string;

  @IsEnum(Class, { message: 'Classe inválida' })
  @IsNotEmpty()
  class: Class;

  @IsInt()
  @Min(1)
  level: number;

  @IsInt()
  @Min(0)
  @Max(10)
  strength: number;

  @IsInt()
  @Min(0)
  @Max(10)
  defense: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMagicItemDto)
  magicItems?: CreateMagicItemDto[];
}