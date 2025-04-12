/* eslint-disable prettier/prettier */
import { IsEnum, 
        IsNotEmpty, 
        IsNumber, 
        IsString, 
        Max, 
        Min 
} from 'class-validator';

export enum Type {
  ARMA = 'Arma',
  ARMADURA = 'Armadura',
  AMULETO = 'Amuleto',
}

export class CreateMagicItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Type, { message: 'Tipo inválido. Use: Arma, Armadura ou Amuleto.' })
  type: Type;

  @IsNumber()
  @Min(0)
  @Max(10)
  strength: number;

  @IsNumber()
  @Min(0)
  @Max(10)
  defense: number;
}
