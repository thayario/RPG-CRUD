import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { CharacterModule } from './character/character.module';
import { MagicItemsModule } from './magic-items/magic-items.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [CharacterModule, MagicItemsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
